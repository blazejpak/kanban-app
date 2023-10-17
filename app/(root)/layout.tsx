import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import Navbar from "@/components/shared/Navbar";
import Providers from "@/components/theme/providers";

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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${jakarta.className} bg-[#F4F7FD] dark:bg-[#20212C]`}
          suppressHydrationWarning={true}
        >
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
