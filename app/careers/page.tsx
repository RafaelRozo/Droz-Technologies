import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers at Droz Technologies | Ontario Tech Jobs",
  description:
    "Join an industrial technology company in Burlington, ON. Engineering, software, AI & manufacturing roles across 5 divisions.",
  alternates: {
    canonical: "https://droztechnologies.com/careers",
  },
  openGraph: {
    url: "https://droztechnologies.com/careers",
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
      name: "Careers",
      item: "https://droztechnologies.com/careers",
    },
  ],
};

const jobPostings = [
  {
    title: "Senior Software Engineer",
    description:
      "Full-stack development with React, Node.js, and cloud infrastructure. Architect scalable platforms, lead technical reviews, and mentor junior engineers across enterprise and government projects.",
    skills: ["React", "Node.js", "Cloud Infrastructure", "TypeScript"],
  },
  {
    title: "AI / ML Engineer",
    description:
      "Build predictive models and deploy ML pipelines in production across computer vision, NLP, and time-series forecasting, bridging research and real industrial impact.",
    skills: ["Python", "Machine Learning", "Computer Vision", "NLP", "Time-Series Forecasting"],
  },
  {
    title: "Construction Project Manager",
    description:
      "Lead smart building projects with IoT integration. Coordinate multidisciplinary teams, manage stakeholders, and deliver technology-driven construction upgrades.",
    skills: ["Project Management", "IoT", "Smart Building", "Stakeholder Management"],
  },
  {
    title: "Vibration Analyst",
    description:
      "Predictive maintenance and equipment diagnostics using laser alignment, rotor balancing, and thermography. Reduce downtime for clients like Westinghouse, Holcim, and Unilever.",
    skills: [
      "Vibration Analysis",
      "Laser Alignment",
      "Rotor Balancing",
      "Thermography",
      "Predictive Maintenance",
    ],
  },
  {
    title: "Business Development Manager",
    description:
      "Grow presence across North America, Latin America, and Europe. Identify partnerships, build pipeline, and represent Droz Technologies at the executive level.",
    skills: ["Business Development", "Sales", "Partnership Management", "B2B"],
  },
];

const jobPostingJsonLds = jobPostings.map((job) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  description: job.description,
  datePosted: "2026-01-01",
  employmentType: "FULL_TIME",
  hiringOrganization: {
    "@type": "Organization",
    name: "Droz Technologies",
    sameAs: "https://droztechnologies.com",
    logo: "https://droztechnologies.com/images/logo.png",
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Burlington",
      addressRegion: "ON",
      addressCountry: "CA",
    },
  },
  skills: job.skills.join(", "),
  url: "https://droztechnologies.com/careers",
}));

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {jobPostingJsonLds.map((jsonLd, i) => (
        <JsonLd key={i} data={jsonLd} />
      ))}
      <CareersClient />
    </>
  );
}
