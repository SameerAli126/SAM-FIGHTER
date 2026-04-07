import { useEffect } from "react";
import { PROFILE, SITE } from "@/config/site";

type SeoMetaProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  keywords?: readonly string[];
  type?: "website" | "article";
  noindex?: boolean;
};

function toAbsoluteUrl(value: string) {
  return new URL(value, `${SITE.url}/`).toString();
}

function setMetaTag(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function setStructuredData(content: string) {
  let element = document.head.querySelector<HTMLScriptElement>('script[data-seo-schema="route"]');

  if (!element) {
    element = document.createElement("script");
    element.setAttribute("type", "application/ld+json");
    element.setAttribute("data-seo-schema", "route");
    document.head.appendChild(element);
  }

  element.textContent = content;
}

function buildStructuredData({
  canonicalUrl,
  description,
  imageUrl,
  path,
  title,
}: {
  canonicalUrl: string;
  description: string;
  imageUrl: string;
  path: string;
  title: string;
}) {
  const websiteId = `${SITE.url}/#website`;
  const personId = `${SITE.url}/#person`;
  const webpageId = `${canonicalUrl}#webpage`;
  const pageName = title.replace(/\s+\|\s+Muhammad Sameer Ali$/, "");

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    name: SITE.name,
    url: `${SITE.url}/`,
    inLanguage: "en-US",
  };

  const person = {
    "@type": "Person",
    "@id": personId,
    name: PROFILE.fullName,
    url: `${SITE.url}/`,
    jobTitle: PROFILE.roleLine,
    sameAs: [PROFILE.githubUrl, PROFILE.linkedinUrl, PROFILE.xUrl],
  };

  const page: Record<string, unknown> = {
    "@type": path === "/" ? "CollectionPage" : "WebPage",
    "@id": webpageId,
    url: canonicalUrl,
    name: title,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    inLanguage: "en-US",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: imageUrl,
      width: SITE.ogImageWidth,
      height: SITE.ogImageHeight,
    },
  };

  const graph: Record<string, unknown>[] = [website, person, page];

  if (path.startsWith("/projects/")) {
    const projectId = `${canonicalUrl}#project`;
    page.mainEntity = { "@id": projectId };

    graph.push({
      "@type": "CreativeWork",
      "@id": projectId,
      name: pageName,
      description,
      author: { "@id": personId },
      creator: { "@id": personId },
      url: canonicalUrl,
      genre: "Software project",
    });

    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE.url}/#projects` },
        { "@type": "ListItem", position: 3, name: pageName, item: canonicalUrl },
      ],
    });
  }

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  });
}

const SeoMeta = ({
  title = SITE.defaultTitle,
  description = SITE.defaultDescription,
  path = "/",
  image = SITE.ogImage,
  imageAlt = `${PROFILE.fullName} portfolio preview`,
  keywords = SITE.defaultKeywords,
  type = "website",
  noindex = false,
}: SeoMetaProps) => {
  useEffect(() => {
    const canonicalUrl = toAbsoluteUrl(path);
    const imageUrl = toAbsoluteUrl(image);
    const resolvedKeywords = Array.from(new Set(keywords)).join(", ");

    document.title = title;
    setCanonical(canonicalUrl);

    setMetaTag("name", "description", description);
    setMetaTag("name", "author", PROFILE.fullName);
    setMetaTag("name", "creator", PROFILE.fullName);
    setMetaTag("name", "publisher", PROFILE.fullName);
    setMetaTag("name", "theme-color", "#0c111a");
    setMetaTag("name", "keywords", resolvedKeywords);
    setMetaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    setMetaTag("property", "og:site_name", SITE.name);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", imageUrl);
    setMetaTag("property", "og:image:secure_url", imageUrl);
    setMetaTag("property", "og:image:type", SITE.ogImageType);
    setMetaTag("property", "og:image:width", String(SITE.ogImageWidth));
    setMetaTag("property", "og:image:height", String(SITE.ogImageHeight));
    setMetaTag("property", "og:image:alt", imageAlt);
    setMetaTag("property", "og:locale", SITE.locale);

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:site", SITE.twitterHandle);
    setMetaTag("name", "twitter:creator", SITE.twitterHandle);
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:url", canonicalUrl);
    setMetaTag("name", "twitter:image", imageUrl);
    setMetaTag("name", "twitter:image:alt", imageAlt);

    setStructuredData(
      buildStructuredData({
        canonicalUrl,
        description,
        imageUrl,
        path,
        title,
      }),
    );
  }, [description, image, imageAlt, keywords, noindex, path, title, type]);

  return null;
};

export default SeoMeta;
