import type { Metadata } from "next";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "BitHaven",
  description: "Multi E-commerce Vendors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Simple favicon using your single logo */}
        <link rel="icon" href="/bithaven.png" />
        </head>
      <body className="antialiased">
        <NuqsAdapter>
          <TRPCReactProvider>
            {children}
            <Toaster />
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
