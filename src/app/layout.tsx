import type { Metadata } from "next";
import { Fraunces, Source_Serif_4, Figtree } from "next/font/google";
import { Nav } from "@/components/Nav";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
});

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Fathom — Keep what you read",
    template: "%s · Fathom",
  },
  description:
    "Fathom turns a nonfiction book into a fixed set of load-bearing ideas, then teaches them at the depth you choose.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen antialiased">
        <Nav />
        <main id="main" className="mx-auto w-full max-w-page px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
          {children}
        </main>
      </body>
    </html>
  );
}
