import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DNB Constructions – Civil Construction ERP & Portfolio",
  description: "ISO 9001:2015 Certified Civil Construction Contractor – Project Management, Labour, Materials, Finance & ERP.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </StoreProvider>
      </body>
    </html>
  );
}
