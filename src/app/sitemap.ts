import { MetadataRoute } from "next";
import { getProjects } from "@/lib/store";
import { SITE_CONFIG } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects({ status: "published" });

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_CONFIG.siteUrl}/showcase/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.createdAt),
    changeFrequency: "weekly",
    priority: p.featured ? 0.9 : 0.8,
  }));

  return [
    {
      url: `${SITE_CONFIG.siteUrl}/showcase`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...projectUrls,
  ];
}

