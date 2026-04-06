import { Metadata } from "next";
import PMClient from "./PMClient";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Predictive Maintenance Ontario | Droz Technologies",
  description: "Vibration analysis, laser alignment, thermography & rotor balancing for Ontario industry. 20+ years. Burlington, ON. Book a site assessment.",
  keywords: ["predictive maintenance Ontario", "vibration analysis Canada", "laser alignment services Ontario", "infrared thermography Ontario", "rotor balancing GTA", "condition monitoring Southern Ontario", "reliability engineering Burlington"],
  openGraph: {
    title: "Predictive Maintenance Services Ontario | Droz Technologies",
    description: "Vibration analysis, laser alignment & thermography. 20+ years in Ontario heavy industry.",
    url: "https://droztechnologies.com/divisions/predictive-maintenance",
    images: [{ url: "/images/divisions/predictive-maintenance.png" }],
  },
  alternates: { canonical: "https://droztechnologies.com/divisions/predictive-maintenance" },
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Predictive Maintenance",
  provider: { "@type": "Organization", name: "Droz Technologies" },
  areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Predictive Maintenance Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vibration Analysis" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laser Alignment" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Infrared Thermography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rotor Balancing" } },
    ],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={SERVICE_SCHEMA} />
      <PMClient />
    </>
  );
}
