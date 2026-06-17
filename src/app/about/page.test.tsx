import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AboutPage, { metadata } from "./page";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("About page", () => {
  it("renders mission content with at least two sentences", () => {
    render(<AboutPage />);

    const paragraphs = screen.getAllByText(/LYT|engineering culture/i);
    expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  });

  it("links to the status page", () => {
    render(<AboutPage />);

    const statusLink = screen.getByRole("link", { name: /view system status/i });
    expect(statusLink).toHaveAttribute("href", "/status");
  });

  it("exports page metadata", () => {
    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
  });
});
