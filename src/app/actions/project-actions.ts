"use server";

import { getSession } from "@/lib/auth";
import {
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
  createCategory,
  deleteCategory,
} from "@/lib/store";
import { Project } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";

export async function saveProjectAction(
  data: Partial<Project> & { id?: string }
): Promise<{ success: boolean; project?: Project; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please login." };
  }

  try {
    if (!data.title || !data.title.trim()) {
      return { success: false, error: "Project title is required." };
    }
    if (!data.category || !data.category.trim()) {
      return { success: false, error: "Category is required." };
    }

    const payload = {
      title: data.title.trim(),
      slug: data.slug?.trim() || "",
      category: data.category.trim(),
      clientName: data.clientName?.trim() || "Private Client",
      liveUrl: data.liveUrl?.trim() || "",
      description: data.description?.trim() || "",
      resultMetric: data.resultMetric?.trim() || "Fast & modern web presence delivered",
      problem: data.problem?.trim() || "",
      solution: data.solution?.trim() || "",
      result: data.result?.trim() || "",
      techUsed: Array.isArray(data.techUsed)
        ? data.techUsed
        : typeof data.techUsed === "string"
        ? (data.techUsed as string).split(",").map((s) => s.trim()).filter(Boolean)
        : ["Next.js", "Tailwind CSS"],
      timeline: data.timeline?.trim() || "2 Weeks",
      featured: Boolean(data.featured),
      order: Number(data.order) || 1,
      status: (data.status as "published" | "draft") || "published",
      coverImage: data.coverImage || "/placeholder-fashion.jpg",
      gallery: Array.isArray(data.gallery) && data.gallery.length > 0
        ? data.gallery
        : [data.coverImage || "/placeholder-fashion.jpg"],
      testimonial: data.testimonial && data.testimonial.quote
        ? {
            name: data.testimonial.name || "Client",
            role: data.testimonial.role || "Business Owner",
            quote: data.testimonial.quote,
          }
        : undefined,
      seoTitle: data.seoTitle || `${data.title} | Host2uls Showcase`,
      seoDescription:
        data.seoDescription ||
        data.description ||
        `Case study for ${data.title} built by Host2uls.`,
    };

    let saved: Project | null;
    if (data.id) {
      saved = await updateProject(data.id, payload);
      if (!saved) return { success: false, error: "Project not found to update." };
    } else {
      saved = await createProject(payload);
    }

    revalidatePath("/showcase");
    revalidatePath(`/showcase/${saved.slug}`);
    revalidatePath("/admin");
    revalidateTag("projects");

    return { success: true, project: saved };
  } catch (err: any) {
    console.error("saveProjectAction error:", err);
    return { success: false, error: err.message || "Failed to save project." };
  }
}

export async function deleteProjectAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    const success = await deleteProject(id);
    revalidatePath("/showcase");
    revalidatePath("/admin");
    revalidateTag("projects");
    return { success };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete project." };
  }
}

export async function toggleProjectStatusAction(
  id: string
): Promise<{ success: boolean; newStatus?: "published" | "draft"; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized." };
  }

  const existing = await getProjectById(id);
  if (!existing) {
    return { success: false, error: "Project not found." };
  }

  const newStatus = existing.status === "published" ? "draft" : "published";
  const updated = await updateProject(id, { status: newStatus });

  revalidatePath("/showcase");
  revalidatePath(`/showcase/${existing.slug}`);
  revalidatePath("/admin");
  revalidateTag("projects");

  return { success: true, newStatus };
}

export async function addCategoryAction(
  name: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getSession();
  if (!session) return { success: false, error: "Unauthorized." };

  if (!name.trim()) return { success: false, error: "Category name required." };
  await createCategory(name.trim());
  revalidatePath("/showcase");
  revalidatePath("/admin");
  return { success: true };
}

export async function removeCategoryAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getSession();
  if (!session) return { success: false, error: "Unauthorized." };

  await deleteCategory(id);
  revalidatePath("/showcase");
  revalidatePath("/admin");
  return { success: true };
}

