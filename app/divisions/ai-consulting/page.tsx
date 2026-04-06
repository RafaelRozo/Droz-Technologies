import { Metadata } from "next";
import AIClient from "./AIClient";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "AI Consulting Ontario | Droz Technologies",
  description: "Computer vision, NLP, predictive models & edge AI for Canadian enterprise. Proof of concept to production in 90 days. IRAP eligible.",
  keywords: ["AI consulting Ontario", "machine learning consulting Toronto", "computer vision company Canada", "edge AI deployment Ontario", "MLOps consulting Canada", "predictive analytics Ontario", "IRAP AI project consulting"],
  openGraph: {
    title: "AI Consulting & Computer Vision | Droz Technologies Ontario",
    description: "Computer vision, NLP, predictive models & edge AI for Canadian enterprise. Proof of concept to production in 90 days.",
    url: "https://droztechnologies.com/divisions/ai-consulting",
    images: [{ url: "/images/divisions/ai-consulting.png" }],
  },
  alternates: { canonical: "https://droztechnologies.com/divisions/ai-consulting" },
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Consulting",
  provider: { "@type": "Organization", name: "Droz Technologies" },
  areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Consulting Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Computer Vision" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "NLP" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Predictive Models" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Edge AI" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "MLOps" } },
    ],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} />
      <AIClient />
    </>
  );
}
