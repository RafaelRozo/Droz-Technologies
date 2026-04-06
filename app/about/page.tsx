import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Droz Technologies | Burlington, Ontario",
  description:
    "Ontario-based industrial technology with 5 specialized divisions. From vibration analysis to AI — built for Canadian industry since 2004.",
  alternates: {
    canonical: "https://droztechnologies.com/about",
  },
  openGraph: {
    url: "https://droztechnologies.com/about",
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
      name: "About",
      item: "https://droztechnologies.com/about",
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <AboutClient />
    </>
  );
}
