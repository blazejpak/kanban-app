import "../globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import Navbar from "@/components/shared/Navbar";
import { ProvideStore } from "@/store/provider";
import ProvidersTheme from "@/components/theme/ProvidersTheme";

import LeftBar from "@/components/shared/LeftBar";
import { useState } from "react";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban Task Management",
  description: "A Next.js 13 Kanban Task Management Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.className} h-full w-full overflow-y-hidden   bg-[#F4F7FD] dark:bg-[#20212C]`}
        suppressHydrationWarning={true}
      >
        <ProvideStore>
          <ProvidersTheme>
            <Navbar />
            <main className="relative flex h-full w-full overflow-x-hidden">
              <LeftBar />
              <section className="w-full ">{children}</section>
            </main>
          </ProvidersTheme>
        </ProvideStore>
      </body>
    </html>
  );
}
