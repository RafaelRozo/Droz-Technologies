import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import SolutionsClient from "./SolutionsClient";

export const metadata: Metadata = {
  title: "Technology Solutions | Droz Technologies Canada",
  description:
    "End-to-end solutions: predictive analytics, enterprise software, IoT, AI integration, digital twins & automation. Ontario, Canada.",
  alternates: {
    canonical: "https://droztechnologies.com/solutions",
  },
  openGraph: {
    url: "https://droztechnologies.com/solutions",
    images: [{ url: "/images/team.png" }],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://droztechnologies.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Solutions",
      item: "https://droztechnologies.com/solutions",
    },
  ],
};

const servicesItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Droz Technologies Industrial Solutions",
  url: "https://droztechnologies.com/solutions",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Predictive Analytics",
      url: "https://droztechnologies.com/solutions",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Enterprise Software",
      url: "https://droztechnologies.com/solutions",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Industrial IoT",
      url: "https://droztechnologies.com/solutions",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "AI Integration",
      url: "https://droztechnologies.com/solutions",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Digital Twins",
      url: "https://droztechnologies.com/solutions",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Automation Systems",
      url: "https://droztechnologies.com/solutions",
    },
  ],
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={servicesItemListJsonLd} />
      <SolutionsClient />
    </>
  );
}
