import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getProjectById, getCategories } from "@/lib/store";
import { ProjectEditor } from "@/components/admin/ProjectEditor";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Project | Host2uls Showcase CMS",
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const [project, categories] = await Promise.all([
    getProjectById(id),
    getCategories(),
  ]);

  if (!project) {
    notFound();
  }

  return <ProjectEditor initialProject={project} categories={categories} />;
}

