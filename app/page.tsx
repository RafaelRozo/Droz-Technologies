import Navbar from "@/components/Navbar";
import DivisionHero from "@/components/DivisionHero";

const divisions = [
  {
    id: "predictive-maintenance",
    title: ["Predictive", "Maintenance", "Reinvented"],
    subtitle:
      "AI-powered fault detection, reduced downtime, and optimized asset performance through advanced predictive software solutions.",
    buttons: [
      { label: "Get Started", href: "#contact", primary: true },
      { label: "Case Studies", href: "#cases" },
    ],
    videoSrc: "", // → /videos/division-1-pm.mp4
    objectLabel: "",
  },
  {
    id: "software-development",
    title: ["Software", "Development", "Perfected"],
    subtitle:
      "Pioneering high-performance, scalable enterprise software solutions. Our expert engineering and agile methodologies deliver robust, secure applications tailored to drive your business innovation and growth.",
    buttons: [
      { label: "Get Started", href: "#contact", primary: true },
      { label: "Our Process", href: "#process" },
    ],
    videoSrc: "", // → /videos/division-2-software.mp4
    objectLabel: "GOOGLE WILLOW PROCESSOR",
  },
  {
    id: "intelligent-construction",
    title: ["Intelligent", "Construction", "Engineered"],
    subtitle:
      "Smart building upgrades, modern façade systems, and advanced materials. Transforming construction with technology-driven precision and sustainable innovation.",
    buttons: [
      { label: "Get Started", href: "#contact", primary: true },
      { label: "Projects", href: "#projects" },
    ],
    videoSrc: "", // → /videos/division-3-construction.mp4
    objectLabel: "",
  },
  {
    id: "industrial-manufacturing",
    title: ["Industrial", "Manufacturing", "Elevated"],
    subtitle:
      "Precision vibration equipment, laser alignment systems, and thermography technology. Industrial-grade manufacturing solutions built for mission-critical operations.",
    buttons: [
      { label: "Get Started", href: "#contact", primary: true },
      { label: "Equipment", href: "#equipment" },
    ],
    videoSrc: "", // → /videos/division-4-manufacturing.mp4
    objectLabel: "",
  },
  {
    id: "ai-consulting",
    title: ["AI", "Consulting", "Redefined"],
    subtitle:
      "Strategic AI implementation for enterprise transformation. From proof-of-concept to production deployment, we architect intelligent systems that deliver measurable impact.",
    buttons: [
      { label: "Get Started", href: "#contact", primary: true },
      { label: "Capabilities", href: "#capabilities" },
    ],
    videoSrc: "", // → /videos/division-5-ai.mp4
    objectLabel: "",
  },
];

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Division Hero Sections */}
      {divisions.map((div) => (
        <DivisionHero
          key={div.id}
          id={div.id}
          title={div.title}
          subtitle={div.subtitle}
          buttons={div.buttons}
          videoSrc={div.videoSrc || undefined}
          objectLabel={div.objectLabel || undefined}
        />
      ))}

      {/* Footer placeholder */}
      <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-16 px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div>
            <h2 className="font-serif text-3xl text-droz-white mb-2">Droz</h2>
            <p className="text-sm text-droz-muted max-w-md">
              Catholic Latino-Owned Canadian company driving innovation across
              Engineering, Software, Manufacturing, and Construction.
            </p>
          </div>
          <div className="text-sm text-droz-muted">
            <p>Droz Technologies Inc.</p>
            <p>Burlington, Ontario, Canada</p>
            <p className="mt-2">
              <a
                href="mailto:ricardorozo@droztechnologies.com"
                className="hover:text-white transition-colors"
              >
                ricardorozo@droztechnologies.com
              </a>
            </p>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-10 pt-6 border-t border-[#1a1a1a] text-xs text-droz-muted">
          © {new Date().getFullYear()} Droz Technologies Inc. All rights
          reserved.
        </div>
      </footer>
    </main>
  );
}
