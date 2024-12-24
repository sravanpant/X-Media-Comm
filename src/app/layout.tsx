import "./globals.css";
import { Inter } from "next/font/google";
import { AppProvider } from "@/context/AppContext";

import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Communication Tracker",
  description: "Track and manage company communications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <AppProvider>
          <Navbar>{children}</Navbar>
        </AppProvider>
      </body>
    </html>
  );
}
