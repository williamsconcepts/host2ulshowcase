import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/showcase", "/showcase/*"],
        disallow: ["/admin", "/admin/*", "/studio", "/studio/*", "/api/*"],
      },
    ],
    sitemap: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
  };
}

