import type { Metadata } from "next";
import Script from "next/script";
import Providers from "@/components/Providers";
import "./globals.css";
import CursorSpotlight from "@/components/CursorSpotlight";
import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/Footer";
import ColorBar from "@/components/shared/ColorBar";
import JsonLd from "@/components/seo/JsonLd";

const BASE_URL = "https://droztechnologies.com";

export const metadata: Metadata = {
  title: {
    default: "Industrial Technology & AI Solutions | Droz Technologies — Ontario",
    template: "%s | Droz Technologies",
  },
  description: "Predictive maintenance, software, smart buildings, manufacturing & AI consulting. 5 divisions serving Ontario. Burlington, ON.",
  metadataBase: new URL(BASE_URL),
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: BASE_URL,
    siteName: "Droz Technologies",
    title: "Industrial Technology & AI Solutions | Droz Technologies",
    description: "5 world-class divisions: predictive maintenance, software, smart construction, manufacturing & AI. Burlington, Ontario.",
    images: [{ url: "/images/team.png", width: 1200, height: 630, alt: "Droz Technologies team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Droz Technologies — Industrial Technology & AI",
    description: "5 divisions. Predictive maintenance, software, construction, manufacturing & AI consulting. Ontario, Canada.",
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Droz Technologies",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.ico`,
  description: "Industrial technology company with 5 specialized divisions: predictive maintenance, software development, intelligent construction, industrial manufacturing, and AI consulting.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Burlington",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Ontario" },
    { "@type": "Country", name: "Canada" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "ricardorozo@droztechnologies.com",
    availableLanguage: ["English", "French", "Spanish"],
  },
  knowsLanguage: ["en", "fr", "es"],
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics — G-G3NER3MPW7 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G3NER3MPW7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G3NER3MPW7');
          `}
        </Script>

        {/* Meta (Facebook) Pixel — 1532229697701487 */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1532229697701487');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1532229697701487&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="antialiased">
        <JsonLd data={ORG_SCHEMA} />
        <Providers>
          <CursorSpotlight />
          <ColorBar accentColor="rgba(255,255,255,0.08)" />
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navbar />
          <div id="main-content">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
