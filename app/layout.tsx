import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Cosmic Code Lab | Full-Stack Web Development",
  description: "Cosmic Code Lab - Building cutting-edge web applications and e-commerce solutions. Founded by experienced developer Peter Arevalo.",
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
