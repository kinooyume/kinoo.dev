export type AccentColor = {
  name: string;
  base: string;
  bright: string;
  tint: string;
  secondary: string;
};

export const accentColors: AccentColor[] = [
  { name: "Orange", base: "--orange", bright: "--orange-dark", tint: "--orange-tint", secondary: "--orange-light" },
  { name: "Red", base: "--red", bright: "--red-dark", tint: "--red-tint", secondary: "--red-light" },
  { name: "Green", base: "--green", bright: "--green-dark", tint: "--green-tint", secondary: "--green-light" },
  { name: "Pink", base: "--pink", bright: "--pink-dark", tint: "--pink-tint", secondary: "--pink-light" },
  { name: "Purple", base: "--purple", bright: "--purple-dark", tint: "--purple-tint", secondary: "--purple-light" },
  { name: "Blue", base: "--blue", bright: "--blue-dark", tint: "--blue-tint", secondary: "--blue-light" },
  { name: "Cyan", base: "--cyan", bright: "--cyan-dark", tint: "--cyan-tint", secondary: "--cyan-light" },
];

const accentProps = ["--accent-color", "--accent-bright", "--accent-tint", "--secondary-accent-color"] as const;
const STORAGE_KEY = "ds-accent-color";

export function applyAccentColor(color: AccentColor, target: HTMLElement = document.documentElement) {
  target.style.setProperty("--accent-color", `var(${color.base})`);
  target.style.setProperty("--accent-bright", `var(${color.bright})`);
  target.style.setProperty("--accent-tint", `var(${color.tint})`);
  target.style.setProperty("--secondary-accent-color", `var(${color.secondary})`);
  try { localStorage.setItem(STORAGE_KEY, color.name); } catch {}
}

export function restoreAccentColor(target: HTMLElement = document.documentElement): AccentColor | null {
  try {
    const name = localStorage.getItem(STORAGE_KEY);
    if (!name) return null;
    const color = accentColors.find((c) => c.name === name);
    if (!color) return null;
    applyAccentColor(color, target);
    return color;
  } catch { return null; }
}

export function resetAccentColor(target: HTMLElement = document.documentElement) {
  accentProps.forEach((p) => target.style.removeProperty(p));
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}
