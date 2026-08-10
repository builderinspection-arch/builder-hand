import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Builder Hand",
    template: "%s | Builder Hand",
  },
  description:
    "Builder Hand is a reverse auction construction marketplace for homeowners and contractors in Melbourne.",
  keywords: [
    "reverse auction construction",
    "hire tradies Melbourne",
    "building inspection",
    "flooring installation",
    "construction marketplace",
  ],
  openGraph: {
    title: "Builder Hand",
    description:
      "Builder Hand helps homeowners hire verified tradies and contractors bid on local construction jobs.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
