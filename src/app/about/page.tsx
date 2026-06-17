import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about LYT's mission to ship verifiable software milestones with clarity and speed.",
};

export default function AboutPage(): React.ReactElement {
  return (
    <article className="flex max-w-prose flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">About LYT</h1>
      <div className="flex flex-col gap-4 text-lg leading-relaxed text-foreground">
        <p>
          LYT exists to turn ambitious ideas into shippable software with clarity
          and speed. We believe the fastest path to product-market fit is a
          series of small, verifiable releases—not big-bang launches.
        </p>
        <p>
          Our engineering culture favors observability, convention over novelty,
          and two-way-door decisions so we can iterate without accumulating
          hidden debt.
        </p>
      </div>
      <Button
        variant="link"
        className="h-auto p-0"
        render={<Link href="/status" />}
      >
        View system status →
      </Button>
    </article>
  );
}
