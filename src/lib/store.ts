import fs from "fs";
import path from "path";
import { revalidatePath, revalidateTag } from "next/cache";
import { Project, Category } from "@/types";
import { slugify } from "@/lib/slugify";
import initialData from "../../data/projects.json";

export { slugify };

const DATA_FILE = path.join(process.cwd(), "data", "projects.json");

interface DataStore {
  categories: Category[];
  projects: Project[];
}

let inMemoryData: DataStore | null = null;

function readData(): DataStore {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      inMemoryData = parsed;
      return parsed;
    }
  } catch (err) {
    console.warn("Notice: Reading from disk failed, using bundled data store:", err);
  }

  if (inMemoryData) {
    return inMemoryData;
  }

  return initialData as unknown as DataStore;
}

function writeData(data: DataStore): void {
  inMemoryData = data;
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write to disk (likely serverless environment):", err);
  }
}

/**
 * Ensure slug uniqueness
 */
export function generateUniqueSlug(title: string, currentId?: string): string {
  const baseSlug = slugify(title) || "project";
  const data = readData();
  let slug = baseSlug;
  let counter = 1;

  while (
    data.projects.some((p) => p.slug === slug && p.id !== currentId)
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

/**
 * Get all projects with optional filtering
 */
export async function getProjects(options?: {
  category?: string;
  status?: "published" | "draft" | "all";
  search?: string;
}): Promise<Project[]> {
  const data = readData();
  let list = [...data.projects];

  // Filter by status (default to published for public queries)
  const statusFilter = options?.status || "published";
  if (statusFilter !== "all") {
    list = list.filter((p) => p.status === statusFilter);
  }

  // Filter by category
  if (options?.category && options.category.toLowerCase() !== "all") {
    const catLower = options.category.toLowerCase();
    list = list.filter(
      (p) =>
        p.category.toLowerCase() === catLower ||
        p.category.toLowerCase().includes(catLower)
    );
  }

  // Search filter
  if (options?.search && options.search.trim()) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.clientName.toLowerCase().includes(q) ||
        p.resultMetric.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  // Sort by order asc, then date desc
  list.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return list;
}

/**
 * Get featured project
 */
export async function getFeaturedProject(): Promise<Project | null> {
  const projects = await getProjects({ status: "published" });
  const featured = projects.find((p) => p.featured);
  return featured || projects[0] || null;
}

/**
 * Get project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const data = readData();
  const proj = data.projects.find((p) => p.slug === slug);
  return proj || null;
}

/**
 * Get project by ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const data = readData();
  const proj = data.projects.find((p) => p.id === id);
  return proj || null;
}

/**
 * Get adjacent/next project for navigation on case study pages
 */
export async function getNextProject(currentSlug: string): Promise<Project | null> {
  const projects = await getProjects({ status: "published" });
  if (projects.length <= 1) return null;

  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return projects[0];

  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
}

/**
 * Get categories list
 */
export async function getCategories(): Promise<Category[]> {
  const data = readData();
  // Count projects per category
  return data.categories.map((cat) => ({
    ...cat,
    count: data.projects.filter(
      (p) =>
        p.status === "published" &&
        p.category.toLowerCase() === cat.name.toLowerCase()
    ).length,
  }));
}

/**
 * Create a new project (Admin)
 */
export async function createProject(
  input: Omit<Project, "id" | "createdAt" | "updatedAt">
): Promise<Project> {
  const data = readData();
  const slug = generateUniqueSlug(input.slug || input.title);
  const now = new Date().toISOString();

  const newProject: Project = {
    ...input,
    id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    slug,
    createdAt: now,
    updatedAt: now,
    featured: Boolean(input.featured),
    order: Number(input.order) || data.projects.length + 1,
    gallery: Array.isArray(input.gallery) ? input.gallery : [],
    techUsed: Array.isArray(input.techUsed) ? input.techUsed : [],
  };

  // If set to featured, optionally demote others or keep multiple
  data.projects.unshift(newProject);
  writeData(data);

  // Revalidate public routes instantly
  try {
    revalidatePath("/showcase");
    revalidatePath(`/showcase/${slug}`);
    revalidateTag("projects");
  } catch (e) {
    // ignore outside request context
  }

  return newProject;
}

/**
 * Update project (Admin)
 */
export async function updateProject(
  id: string,
  updates: Partial<Project>
): Promise<Project | null> {
  const data = readData();
  const index = data.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = data.projects[index];
  let newSlug = existing.slug;
  if (updates.slug && updates.slug !== existing.slug) {
    newSlug = generateUniqueSlug(updates.slug, id);
  } else if (updates.title && !updates.slug && updates.title !== existing.title) {
    newSlug = generateUniqueSlug(updates.title, id);
  }

  const updated: Project = {
    ...existing,
    ...updates,
    slug: newSlug,
    updatedAt: new Date().toISOString(),
  };

  data.projects[index] = updated;
  writeData(data);

  try {
    revalidatePath("/showcase");
    revalidatePath(`/showcase/${existing.slug}`);
    revalidatePath(`/showcase/${newSlug}`);
    revalidateTag("projects");
  } catch (e) {
    // ignore
  }

  return updated;
}

/**
 * Delete project (Admin)
 */
export async function deleteProject(id: string): Promise<boolean> {
  const data = readData();
  const project = data.projects.find((p) => p.id === id);
  if (!project) return false;

  data.projects = data.projects.filter((p) => p.id !== id);
  writeData(data);

  try {
    revalidatePath("/showcase");
    revalidatePath(`/showcase/${project.slug}`);
    revalidateTag("projects");
  } catch (e) {
    // ignore
  }

  return true;
}

/**
 * Category management
 */
export async function createCategory(name: string): Promise<Category> {
  const data = readData();
  const slug = slugify(name);
  const existing = data.categories.find(
    (c) => c.slug === slug || c.name.toLowerCase() === name.toLowerCase()
  );
  if (existing) return existing;

  const newCat: Category = {
    id: `cat-${Date.now()}`,
    name,
    slug,
  };
  data.categories.push(newCat);
  writeData(data);

  try {
    revalidatePath("/showcase");
    revalidateTag("projects");
  } catch (e) {
    // ignore
  }

  return newCat;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const data = readData();
  data.categories = data.categories.filter((c) => c.id !== id);
  writeData(data);

  try {
    revalidatePath("/showcase");
    revalidateTag("projects");
  } catch (e) {
    // ignore
  }

  return true;
}

