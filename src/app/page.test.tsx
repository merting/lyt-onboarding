import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home, { metadata } from "./page";

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

describe("Home page", () => {
  it("renders company name and value proposition", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "LYT" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/building the foundation for what comes next/i),
    ).toBeInTheDocument();
  });

  it("renders primary CTA linking to About", () => {
    render(<Home />);

    const cta = screen.getByRole("link", { name: /learn about lyt/i });
    expect(cta).toHaveAttribute("href", "/about");
  });

  it("exports page metadata with title and description", () => {
    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
  });
});
