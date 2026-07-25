import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site.config";

/**
 * robots.txt — libera indexação geral e explicitamente os crawlers de IA
 * (GEO/AISO): aparecer nas respostas de ChatGPT, Perplexity, Google AI, Claude.
 */
export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "meta-externalagent",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
