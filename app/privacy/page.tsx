import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Droz Technologies",
  description:
    "How Droz Technologies collects, uses, and protects your data. PIPEDA compliant privacy policy.",
  alternates: {
    canonical: "https://droztechnologies.com/privacy",
  },
  openGraph: {
    url: "https://droztechnologies.com/privacy",
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
      name: "Privacy Policy",
      item: "https://droztechnologies.com/privacy",
    },
  ],
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <PrivacyClient />
    </>
  );
}
