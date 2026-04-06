"use client";

import { LocaleProvider } from "@/lib/LocaleContext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}
