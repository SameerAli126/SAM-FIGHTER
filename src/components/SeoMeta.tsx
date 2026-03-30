import { useEffect } from "react";
import { PROFILE, SITE } from "@/config/site";

type SeoMetaProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
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

const SeoMeta = ({
  title = SITE.defaultTitle,
  description = SITE.defaultDescription,
  path = "/",
  image = SITE.ogImage,
  imageAlt = `${PROFILE.fullName} portfolio preview`,
  type = "website",
  noindex = false,
}: SeoMetaProps) => {
  useEffect(() => {
    const canonicalUrl = toAbsoluteUrl(path);
    const imageUrl = toAbsoluteUrl(image);

    document.title = title;
    setCanonical(canonicalUrl);

    setMetaTag("name", "description", description);
    setMetaTag("name", "author", PROFILE.fullName);
    setMetaTag("name", "theme-color", "#0c111a");
    setMetaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    setMetaTag("property", "og:site_name", SITE.name);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", imageUrl);
    setMetaTag("property", "og:image:secure_url", imageUrl);
    setMetaTag("property", "og:image:alt", imageAlt);
    setMetaTag("property", "og:locale", "en_US");

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:site", SITE.twitterHandle);
    setMetaTag("name", "twitter:creator", SITE.twitterHandle);
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:url", canonicalUrl);
    setMetaTag("name", "twitter:image", imageUrl);
  }, [description, image, imageAlt, noindex, path, title, type]);

  return null;
};

export default SeoMeta;
