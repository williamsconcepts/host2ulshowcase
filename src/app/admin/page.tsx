import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getProjects, getCategories } from "@/lib/store";
import { AdminDashboardClient } from "./AdminDashboardClient";

export const metadata: Metadata = {
  title: "Admin Dashboard | Host2uls Showcase CMS",
  description: "Manage showcase projects and categories.",
};

export default async function AdminPage() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [projects, categories] = await Promise.all([
    getProjects({ status: "all" }),
    getCategories(),
  ]);

  return <AdminDashboardClient initialProjects={projects} categories={categories} />;
}

