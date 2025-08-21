import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
<<<<<<< Updated upstream
import Navbar from "./components/Navbar";
import { Toaster } from "@/app/components/ui/sonner";
=======
<<<<<<< HEAD
=======
import Navbar from "./components/Navbar";
import { Toaster } from "@/app/components/ui/sonner";
>>>>>>> fc256ede7d2973251dd4af7b904716f7df9cf7a1
>>>>>>> Stashed changes

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LockedIn",
  description: "A platform for managing your learning and tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
<<<<<<< HEAD
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<<<<<<< Updated upstream
        <Navbar />
=======
=======
        className={`${inter.variable} antialiased`}
      >
        <Navbar />
>>>>>>> fc256ede7d2973251dd4af7b904716f7df9cf7a1
>>>>>>> Stashed changes
        {children}
        <Toaster />
      </body>
    </html>
  );
}
