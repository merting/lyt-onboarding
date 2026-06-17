import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "LYT — Building what comes next",
  description:
    "LYT is building the foundation for what comes next. Explore our mission and live system status.",
};

export default function Home(): React.ReactElement {
  return (
    <section className="flex min-h-[50vh] flex-col justify-center gap-6 pt-4 sm:min-h-[60vh] sm:pt-0">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">LYT</h1>
      <p className="max-w-xl text-lg leading-relaxed text-muted">
        Building the foundation for what comes next — from engineering scaffold
        to shippable product.
      </p>
      <div>
        <Button render={<Link href="/about" />}>Learn about LYT</Button>
      </div>
    </section>
  );
}
