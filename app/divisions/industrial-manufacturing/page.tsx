import { Metadata } from "next";
import ManufacturingClient from "./ManufacturingClient";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Canadian Vibration Equipment | Droz Manufacturing",
  description: "Vibration analyzers, laser alignment & thermography instruments built in Burlington, ON. Canadian alternative to SKF & Fluke. Get a quote.",
  keywords: ["vibration monitoring equipment Canada", "Canadian industrial equipment manufacturer", "laser alignment equipment Ontario", "thermography instruments Canada", "made in Canada industrial equipment", "vibration sensor manufacturer Burlington"],
  openGraph: {
    title: "Canadian Vibration & Alignment Equipment | Droz Manufacturing",
    description: "Vibration analyzers, laser alignment systems & thermography instruments designed and built in Burlington, Ontario.",
    url: "https://droztechnologies.com/divisions/industrial-manufacturing",
    images: [{ url: "/images/divisions/industrial-manufacturing.png" }],
  },
  alternates: { canonical: "https://droztechnologies.com/divisions/industrial-manufacturing" },
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Industrial Instrument Manufacturing",
  provider: { "@type": "Organization", name: "Droz Technologies" },
  areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Industrial Manufacturing Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vibration Analyzers" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laser Alignment Systems" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Thermography Instruments" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rotor Balancing Machines" } },
    ],
  },
};

const PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Industrial Precision Instruments",
  description: "Vibration analyzers, laser alignment systems, and thermography cameras designed and manufactured in Burlington, Ontario for heavy industry applications.",
  brand: {
    "@type": "Brand",
    name: "Droz Technologies",
  },
  manufacturer: {
    "@type": "Organization",
    name: "Droz Technologies",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Burlington",
      addressRegion: "Ontario",
      addressCountry: "CA",
    },
  },
  offers: {
    "@type": "Offer",
    areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
    availability: "https://schema.org/InStock",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} />
      <JsonLd data={PRODUCT_SCHEMA} />
      <ManufacturingClient />
    </>
  );
}
