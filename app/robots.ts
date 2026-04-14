import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/c/", "/p/", "/sign-in", "/sign-up"],
      },
    ],
    sitemap: "https://nottoai.com/sitemap.xml",
  }
}
