import { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroPoster from "@/components/HeroPoster";

const HeroScroller = dynamic(() => import("@/components/HeroScroller"), {
  ssr: false,
  loading: () => <HeroPoster />,
});

const PageContent = dynamic(() => import("@/components/PageContent"), { ssr: false });

export const metadata: Metadata = {
  title: "Industrial Technology & AI Solutions | Droz Technologies — Ontario",
  description: "Predictive maintenance, software, smart buildings, manufacturing & AI consulting. 5 divisions serving Ontario industry. Burlington, ON.",
  openGraph: {
    title: "Industrial Technology & AI Solutions | Droz Technologies — Ontario",
    description: "Predictive maintenance, custom software, smart buildings, industrial instruments, and AI consulting for Ontario industry.",
    url: "https://droztechnologies.com",
    images: [{ url: "/images/team.png", width: 1200, height: 896, alt: "Droz Technologies team" }],
  },
  alternates: { canonical: "https://droztechnologies.com" },
};

export default function Home() {
  return (
    <main>
      <HeroScroller />
      <PageContent />
    </main>
  );
}
