import { Metadata } from "next";
import SoftwareClient from "./SoftwareClient";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Software Development Ontario | Droz Technologies",
  description: "Enterprise software, government contracts & AI automation. AODA compliant. Senior Ontario developers. Book a consultation.",
  keywords: ["custom software development Ontario", "enterprise software Toronto", "government software contractor Ontario", "AODA compliant development", "software development company Burlington", "AI automation platform Canada"],
  openGraph: {
    title: "Custom Software Development Ontario | Droz Technologies",
    description: "Enterprise software, government contracts & AI automation. Ontario developers who ship production code.",
    url: "https://droztechnologies.com/divisions/software-development",
    images: [{ url: "/images/divisions/software-development.png" }],
  },
  alternates: { canonical: "https://droztechnologies.com/divisions/software-development" },
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Software Development",
  provider: { "@type": "Organization", name: "Droz Technologies" },
  areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Enterprise Platforms" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Government Software" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Products" } },
    ],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} />
      <SoftwareClient />
    </>
  );
}
