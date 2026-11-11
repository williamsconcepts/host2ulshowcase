import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getCategories } from "@/lib/store";
import { ProjectEditor } from "@/components/admin/ProjectEditor";

export const metadata: Metadata = {
  title: "New Project | Host2uls Showcase CMS",
};

export default async function NewProjectPage() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const categories = await getCategories();

  return <ProjectEditor categories={categories} />;
}

