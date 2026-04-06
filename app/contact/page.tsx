import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Droz Technologies | Burlington, Ontario",
  description:
    "Reach our Burlington, ON team for predictive maintenance, software, smart building, manufacturing, or AI consulting. Response within 24 hours.",
  alternates: {
    canonical: "https://droztechnologies.com/contact",
  },
  openGraph: {
    url: "https://droztechnologies.com/contact",
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
      name: "Contact",
      item: "https://droztechnologies.com/contact",
    },
  ],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Droz Technologies",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Burlington",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.3255,
    longitude: -79.799,
  },
  email: "ricardorozo@droztechnologies.com",
  url: "https://droztechnologies.com/contact",
  areaServed: "Ontario",
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={localBusinessJsonLd} />
      <ContactClient />
    </>
  );
}
