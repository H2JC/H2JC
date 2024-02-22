import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Welcome to "Startup....."',
  description: 'Landing page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (  
    <>
      <Head><link rel="icon" href="/favicon.ico" sizes="any" /></Head>
      <html lang="en">
        {React.createElement("body", { className: inter.className }, children)}
      </html>
    </>
  );
}
