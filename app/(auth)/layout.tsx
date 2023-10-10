import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "../globals.css";

export const metadata: Metadata = {
  title: "Kanban Task Management",
  description: "A Next.js 13 Kanban Task Management Application",
};
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={jakarta.className} suppressHydrationWarning={true}>
          <div className="w-full flex justify-center items-center min-h-screen ">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
