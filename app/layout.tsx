import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Cosmic Code | Full-Stack Web Development",
  description: "Cosmic Code - Building cutting-edge web applications and e-commerce solutions. Founded by experienced developer Peter Arevalo.",
  openGraph: {
    title: "Cosmic Code | Full-Stack Web Development",
    description: "Cosmic Code - Building cutting-edge web applications and e-commerce solutions. Founded by experienced developer Peter Arevalo.",
    images: [
      {
        url: "/logo-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Cosmic Code Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmic Code | Full-Stack Web Development",
    description: "Cosmic Code - Building cutting-edge web applications and e-commerce solutions. Founded by experienced developer Peter Arevalo.",
    images: ["/logo-thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
        <SpeedInsights/>
      </body>
    </html>
  );
}
