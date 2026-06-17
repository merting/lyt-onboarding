import { AppShell } from "@/components/app-shell";
import { ClientErrorBoundary } from "@/components/ClientErrorBoundary";
import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "LYT",
    template: "%s | LYT",
  },
  description: "LYT — building what comes next.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">
        <ClientErrorBoundary>
          <AppShell>{children}</AppShell>
        </ClientErrorBoundary>
      </body>
    </html>
  );
}
