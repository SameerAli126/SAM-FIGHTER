import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Index from "@/pages/Index";

describe("Index page", () => {
  it("renders core portfolio sections", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /featured projects/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /combat skills/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /ready to build/i })).toBeInTheDocument();
  });
});
