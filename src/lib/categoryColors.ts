export type ColorName =
  | "orange"
  | "red"
  | "green"
  | "pink"
  | "purple"
  | "blue"
  | "cyan"
  | "teal"
  | "yellow"
  | "indigo";

export type AccentTokens = {
  color: string;
  tint: string;
  bright: string;
  bg: string;
  coolShift: string;
  readable: string;
};

function accentFromColor(color: ColorName): AccentTokens {
  return {
    color: `var(--${color})`,
    tint: `var(--${color}-tint)`,
    bright: `var(--${color}-light)`,
    bg: `var(--${color}-bg)`,
    coolShift: `var(--${color}-cool-shift)`,
    readable: `var(--${color}-readable)`,
  };
}

const defaultColor: ColorName = "orange";

// Category → palette color. Add entries here per article-category as needed.
const categoryColors: Record<string, ColorName> = {};

export function getAccent(category?: string): AccentTokens {
  return accentFromColor((category && categoryColors[category]) || defaultColor);
}

export function accentInlineStyle(category?: string): string {
  const a = getAccent(category);
  return `--accent-color: ${a.color}; --accent-tint: ${a.tint}; --accent-bright: ${a.bright}; --accent-bg: ${a.bg}; --accent-cool-shift: ${a.coolShift}; --accent-readable: ${a.readable};`;
}
