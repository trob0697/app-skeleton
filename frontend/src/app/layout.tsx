import React from "react";

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import { AppDescription, AppName, AppTagline } from "@/helpers/data";

import "../styles/index.css";

export const metadata: Metadata = {
  title: AppName + " - " + AppTagline,
  description: AppDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
