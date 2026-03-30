import { describe, expect, it, vi, afterEach } from "vitest";
import { buildMailtoHref, submitContactForm } from "@/lib/contact";

const payload = {
  name: "Sameer Ali",
  email: "sameer@example.com",
  message: "I would like to discuss a project with you.",
};

describe("contact utilities", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("builds a valid mailto href", () => {
    const href = buildMailtoHref(payload, "owner@example.com");

    expect(href).toContain("mailto:owner@example.com");
    expect(href).toContain("subject=");
    expect(href).toContain("body=");
  });

  it("submits to configured endpoint when provided", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));

    const result = await submitContactForm(payload, {
      endpoint: "https://api.example.com/contact",
    });

    expect(result).toEqual({ mode: "endpoint" });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.example.com/contact",
      expect.objectContaining({
        method: "POST",
      }),
    );
  });

  it("throws when endpoint returns a failed status", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 500 }));

    await expect(
      submitContactForm(payload, {
        endpoint: "https://api.example.com/contact",
      }),
    ).rejects.toThrow("Contact request failed with status 500");
  });

  it("falls back to mailto when default hosted endpoint fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 500 }));

    const result = await submitContactForm(payload);

    expect(result.mode).toBe("mailto");
    if (result.mode === "mailto") {
      expect(result.href).toContain("mailto:khsameer626@gmail.com");
      expect(result.href).toContain("subject=");
      expect(result.href).toContain("body=");
    }
  });
});
