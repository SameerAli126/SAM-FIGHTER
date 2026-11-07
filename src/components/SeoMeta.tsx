import { useEffect } from "react";
import { EDUCATION, EXPERIENCES, PROFILE, PROJECTS, SITE, SKILLS } from "@/config/site";

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

function setMetaTag(attribute: "name" | "property" | "itemprop" | "http-equiv", key: string, content: string) {
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

function setLink(rel: string, href: string, extraAttrs?: Record<string, string>) {
  let selector = `link[rel="${rel}"]`;
  if (extraAttrs?.hreflang) {
    selector += `[hreflang="${extraAttrs.hreflang}"]`;
  }
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    if (extraAttrs) {
      for (const [k, v] of Object.entries(extraAttrs)) {
        element.setAttribute(k, v);
      }
    }
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
  const experienceReqId = `${SITE.url}/#experience-requirements`;
  const projectListId = `${SITE.url}/#project-list`;
  const webpageId = `${canonicalUrl}#webpage`;
  const pageName = title.replace(/\s+\|\s+Muhammad Sameer Ali$/, "");

  const skillNames = SKILLS.map((s) => s.name);

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    name: SITE.name,
    url: `${SITE.url}/`,
    inLanguage: "en-US",
    description: SITE.defaultDescription,
    publisher: { "@id": personId },
  };

  const person = {
    "@type": "Person",
    "@id": personId,
    name: PROFILE.fullName,
    alternateName: ["Sameer Ali", "SameerAli126"],
    url: `${SITE.url}/`,
    image: imageUrl,
    jobTitle: PROFILE.roleLine,
    description: PROFILE.summary,
    email: `mailto:${PROFILE.contactEmail}`,
    telephone: PROFILE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Peshawar",
      addressCountry: "PK",
    },
    worksFor: {
      "@type": "Organization",
      "@id": "https://deepixel.ai/#organization",
      name: EXPERIENCES[0]?.company || "Deepixel",
      url: "https://deepixel.ai",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: EDUCATION.institution,
      url: "https://cusit.edu.pk",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: PROFILE.roleLine,
      occupationLocation: {
        "@type": "AdministrativeArea",
        name: "Remote / Hybrid / Pakistan",
      },
      skills: skillNames.join(", "),
      experienceRequirements: {
        "@id": experienceReqId,
      },
    },
    knowsAbout: [
      ...skillNames,
      "Full-Stack Web Development",
      "Server-Sent Events (SSE)",
      "Playwright Automated Testing",
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
    ],
    sameAs: [PROFILE.githubUrl, PROFILE.linkedinUrl, PROFILE.xUrl],
  };

  const experienceRequirements = {
    "@type": "OccupationalExperienceRequirements",
    "@id": experienceReqId,
    name: "Frontend / Full-Stack Software Engineering Experience",
    description:
      "3+ years commercial software engineering experience spanning enterprise SaaS at Deepixel, reactive frontend architecture in React/Next.js/TypeScript, streaming SSE workflows, and full-stack backend services in Python, Node.js, and Laravel.",
    monthsOfExperience: 36,
  };

  const projectList = {
    "@type": "ItemList",
    "@id": projectListId,
    name: "Featured Software Engineering Projects by Muhammad Sameer Ali",
    description:
      "Curated catalog of production software applications, SaaS platforms, and open-source systems developed by Muhammad Sameer Ali.",
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((proj, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: proj.title,
      item: proj.links[0]?.href.startsWith("http")
        ? proj.links[0].href
        : `${SITE.url}/${proj.links.find((l) => l.kind === "route")?.href.replace(/^\//, "") || ""}`,
    })),
  };

  const page: Record<string, unknown> = {
    "@type": path === "/" ? "ProfilePage" : "WebPage",
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

  if (path === "/") {
    page.mainEntity = { "@id": personId };
  }

  const graph: Record<string, unknown>[] = [website, person, experienceRequirements, projectList, page];

  if (path === "/") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE.url}/#faq`,
      name: "Frequently Asked Questions About Muhammad Sameer Ali",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Muhammad Sameer Ali?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Muhammad Sameer Ali is a frontend-focused full-stack developer with 3+ years of commercial experience building responsive web products with React, Next.js, and TypeScript, delivering enterprise features at Deepixel.",
          },
        },
        {
          "@type": "Question",
          name: "What enterprise features has Muhammad Sameer Ali developed at Deepixel?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "At Deepixel, Sameer engineered core features for Invictus (an AI deal intelligence platform), including Server-Sent Events (SSE) streaming reports, responsive mobile PWA shell, Tiptap document table editing, Windows 125%/150% display scaling, and 21 automated Playwright test suites.",
          },
        },
        {
          "@type": "Question",
          name: "What is Muhammad Sameer Ali's core technology stack?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sameer specializes in React.js, Next.js, TypeScript, Tailwind CSS, Python (FastAPI), Node.js, Express, PHP (Laravel), PostgreSQL, MongoDB Atlas, Prisma ORM, Server-Sent Events (SSE), Docker, Playwright, and Vitest.",
          },
        },
        {
          "@type": "Question",
          name: "What software projects has Muhammad Sameer Ali engineered?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "His featured production projects include Invictus (enterprise AI deal platform), WordWanderer (gamified language learning with SRS), OptiTrade 3.0 (high-frequency stock trading dashboard), InvoiceGen Pro (AI invoicing with Stripe), PhotoStream / SnapCloud (FastAPI media platform), SAMIO (personal finance dashboard), and Peshawar Civic GIS Atlas (Laravel GIS).",
          },
        },
        {
          "@type": "Question",
          name: "How can you contact or hire Muhammad Sameer Ali?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can reach Muhammad Sameer Ali via email at khsameer626@gmail.com, phone at +92 335 8181400, on GitHub at github.com/SameerAli126, LinkedIn at linkedin.com/in/sameerali126, or download his CV at msameerali.dev/muhammad-sameer-ali-cv.pdf.",
          },
        },
      ],
    });
  }

  if (path.startsWith("/projects/")) {
    const projectId = `${canonicalUrl}#softwareapplication`;
    const techArticleId = `${canonicalUrl}#techarticle`;
    const breadcrumbsId = `${canonicalUrl}#breadcrumbs`;
    const faqId = `${canonicalUrl}#faq`;

    page.mainEntity = { "@id": projectId };

    graph.push({
      "@type": "SoftwareApplication",
      "@id": projectId,
      name: pageName,
      description,
      applicationCategory: "SoftwareApplication",
      operatingSystem: "Web Browser",
      url: canonicalUrl,
      author: { "@id": personId },
      creator: { "@id": personId },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    });

    graph.push({
      "@type": "TechArticle",
      "@id": techArticleId,
      headline: `${pageName}: Technical Architecture & Case Study`,
      name: `${pageName} Technical Case Study`,
      description,
      author: { "@id": personId },
      publisher: { "@id": personId },
      mainEntityOfPage: { "@id": webpageId },
      about: { "@id": projectId },
      inLanguage: "en-US",
      proficiencyLevel: "Expert",
    });

    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbsId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE.url}/#projects` },
        { "@type": "ListItem", position: 3, name: pageName, item: canonicalUrl },
      ],
    });

    graph.push({
      "@type": "FAQPage",
      "@id": faqId,
      name: `Frequently Asked Technical Questions About ${pageName}`,
      mainEntity: [
        {
          "@type": "Question",
          name: `What architectural challenges does ${pageName} solve?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${pageName} is engineered to deliver high-performance, resilient user workflows, addressing state synchronization, responsive scaling, and low-latency interaction.`,
          },
        },
        {
          "@type": "Question",
          name: `Who engineered ${pageName}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${pageName} was architected and developed by Muhammad Sameer Ali, a frontend-focused full-stack developer with 3+ years of commercial software engineering experience.`,
          },
        },
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
  imageAlt = `${PROFILE.fullName} | Frontend / Full-Stack Developer Portfolio Preview`,
  keywords = SITE.defaultKeywords,
  type = "website",
  noindex = false,
}: SeoMetaProps) => {
  useEffect(() => {
    const canonicalUrl = toAbsoluteUrl(path);
    const imageUrl = toAbsoluteUrl(image);
    const resolvedKeywords = Array.from(new Set(keywords)).join(", ");

    document.title = title;
    document.documentElement.setAttribute("prefix", "og: http://ogp.me/ns#");
    setCanonical(canonicalUrl);
    setLink("image_src", imageUrl);
    setLink("alternate", canonicalUrl, { hreflang: "en" });
    setLink("alternate", canonicalUrl, { hreflang: "x-default" });

    setMetaTag("name", "title", title);
    setMetaTag("name", "description", description);
    setMetaTag("name", "author", PROFILE.fullName);
    setMetaTag("name", "creator", PROFILE.fullName);
    setMetaTag("name", "publisher", PROFILE.fullName);
    setMetaTag("name", "theme-color", "#030712");
    setMetaTag("name", "keywords", resolvedKeywords);
    setMetaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setMetaTag("name", "language", "English");
    setMetaTag("http-equiv", "content-language", "en-US");

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

    setMetaTag("name", "image", imageUrl);
    setMetaTag("itemprop", "name", title);
    setMetaTag("itemprop", "description", description);
    setMetaTag("itemprop", "image", imageUrl);

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
