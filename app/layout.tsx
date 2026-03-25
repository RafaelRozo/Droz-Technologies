import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Droz Technologies — Engineering, Software, Manufacturing & AI",
  description:
    "Catholic Latino-Owned Canadian company driving innovation across Engineering, Software, Manufacturing, and Construction. Five divisions unified by advanced technology.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
