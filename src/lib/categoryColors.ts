export type AccentTokens = { color: string; tint: string; bright: string; bg: string };

export const defaultAccent: AccentTokens = {
  color: "var(--orange)",
  tint: "var(--orange-tint)",
  bright: "var(--orange-light)",
  bg: "var(--orange-bg)",
};

// Per-category overrides — add entries here to give a category its own color:
// "front": { color: "var(--blue)", tint: "var(--blue-tint)", bright: "var(--blue-light)", bg: "var(--blue-bg)" },
export const categoryColors: Record<string, AccentTokens> = {};
