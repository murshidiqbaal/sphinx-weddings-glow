import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  keywords?: string;
  structuredData?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_IMAGE = "https://sphinxweddings.com/logo1.webp";
const BASE_URL = "https://sphinxweddings.com";

export const SEOHead = ({
  title,
  description,
  canonicalUrl = BASE_URL,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  keywords,
  structuredData,
}: SEOHeadProps) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to update or create meta tags
    const setMeta = (nameAttr: "name" | "property", key: string, content: string) => {
      let tag = document.querySelector(`meta[${nameAttr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(nameAttr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // 2. Standard Meta Tags
    setMeta("name", "description", description);
    if (keywords) {
      setMeta("name", "keywords", keywords);
    }
    setMeta("name", "author", "Sphinx Wedding");
    setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    // 3. Open Graph Tags
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", "Sphinx Wedding");
    setMeta("property", "og:locale", "en_IN");

    // 4. Twitter Card Tags
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // 6. Structured Data (JSON-LD)
    const scriptId = "dynamic-seo-schema";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (structuredData) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = scriptId;
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Clean up script tag if unmounting
      const tag = document.getElementById(scriptId);
      if (tag) tag.remove();
    };
  }, [title, description, canonicalUrl, ogType, ogImage, keywords, structuredData]);

  return null;
};

export default SEOHead;
