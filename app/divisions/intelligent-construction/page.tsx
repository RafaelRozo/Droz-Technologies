import { Metadata } from "next";
import ConstructionClient from "./ConstructionClient";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Smart Building & IoT Ontario | Droz",
  description: "Smart building retrofits, IoT monitoring, façade systems & building automation for Ontario commercial properties. Energy savings verified. Book a demo.",
  keywords: ["smart building technology Ontario", "IoT building retrofit Ontario", "building automation systems Toronto", "façade engineering Ontario", "smart building IoT Canada", "building envelope monitoring GTA"],
  openGraph: {
    title: "Smart Building Technology & IoT | Droz Technologies Ontario",
    description: "Smart building retrofits with IoT monitoring, façade systems & building automation for Ontario properties.",
    url: "https://droztechnologies.com/divisions/intelligent-construction",
    images: [{ url: "/images/divisions/intelligent-construction.png" }],
  },
  alternates: { canonical: "https://droztechnologies.com/divisions/intelligent-construction" },
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Smart Building Technology",
  provider: { "@type": "Organization", name: "Droz Technologies" },
  areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Intelligent Construction Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Smart Building Upgrades" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Façade Systems" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IoT Instrumentation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Energy Optimization" } },
    ],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} />
      <ConstructionClient />
    </>
  );
}
