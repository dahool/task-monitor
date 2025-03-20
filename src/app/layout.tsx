import type { Metadata } from "next";
import { Trispace } from "next/font/google";
import { NextDevtoolsProvider } from "@next-devtools/core";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import Menu from "./ui/menu"

const font = Trispace({
  subsets: ["latin"],
  weight: "400",
  style: "normal"
});

export const metadata: Metadata = {
  title: "Job Monitor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={`${font.className} antialiased bg-gray-100`}
      >
        <div className="container mx-auto p-6">
        <Menu/>
        <NextDevtoolsProvider>
          {children}
        </NextDevtoolsProvider>
        </div>
      </body>
    </html>
  );
}
