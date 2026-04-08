import { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import HeroPoster from "@/components/HeroPoster";

const HeroScroller = dynamic(() => import("@/components/HeroScroller"), {
  ssr: false,
  loading: () => <HeroPoster />,
});

const PageContent = dynamic(() => import("@/components/PageContent"), { ssr: true });

export const metadata: Metadata = {
  title: "Industrial Technology & AI Solutions | Droz Technologies — Ontario",
  description: "Predictive maintenance, software, smart buildings, manufacturing & AI consulting. 5 divisions serving Ontario industry. Burlington, ON.",
  openGraph: {
    title: "Industrial Technology & AI Solutions | Droz Technologies — Ontario",
    description: "Predictive maintenance, custom software, smart buildings, industrial instruments, and AI consulting for Ontario industry.",
    url: "https://droztechnologies.com",
    images: [{ url: "/images/og-home.png" }],
  },
  alternates: { canonical: "https://droztechnologies.com" },
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Droz Technologies",
  url: "https://droztechnologies.com",
  logo: "https://droztechnologies.com/images/logo.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Burlington",
    addressRegion: "Ontario",
    addressCountry: "CA",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
  sameAs: [],
};

export default function Home() {
  return (
    <main>
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <HeroScroller />
      <PageContent />
    </main>
  );
}
