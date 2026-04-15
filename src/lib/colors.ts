export type AccentColor = {
  name: string;
  base: string;
  bright: string;
  tint: string;
  secondary: string;
  coolShift: string;
};

export const accentColors: AccentColor[] = [
  { name: "Orange", base: "--orange", bright: "--orange-dark", tint: "--orange-tint", secondary: "--orange-light", coolShift: "--orange-cool-shift" },
  { name: "Red", base: "--red", bright: "--red-dark", tint: "--red-tint", secondary: "--red-light", coolShift: "--red-cool-shift" },
  { name: "Green", base: "--green", bright: "--green-dark", tint: "--green-tint", secondary: "--green-light", coolShift: "--green-cool-shift" },
  { name: "Pink", base: "--pink", bright: "--pink-dark", tint: "--pink-tint", secondary: "--pink-light", coolShift: "--pink-cool-shift" },
  { name: "Purple", base: "--purple", bright: "--purple-dark", tint: "--purple-tint", secondary: "--purple-light", coolShift: "--purple-cool-shift" },
  { name: "Blue", base: "--blue", bright: "--blue-dark", tint: "--blue-tint", secondary: "--blue-light", coolShift: "--blue-cool-shift" },
  { name: "Cyan", base: "--cyan", bright: "--cyan-dark", tint: "--cyan-tint", secondary: "--cyan-light", coolShift: "--cyan-cool-shift" },
  { name: "Yellow", base: "--yellow", bright: "--yellow-dark", tint: "--yellow-tint", secondary: "--yellow-light", coolShift: "--yellow-cool-shift" },
  { name: "Indigo", base: "--indigo", bright: "--indigo-dark", tint: "--indigo-tint", secondary: "--indigo-light", coolShift: "--indigo-cool-shift" },
  { name: "Teal", base: "--teal", bright: "--teal-dark", tint: "--teal-tint", secondary: "--teal-light", coolShift: "--teal-cool-shift" },
];

const accentProps = ["--accent-color", "--accent-bright", "--accent-tint", "--secondary-accent-color", "--accent-cool-shift"] as const;
const STORAGE_KEY = "ds-accent-color";

export function applyAccentColor(color: AccentColor, target: HTMLElement = document.documentElement) {
  target.style.setProperty("--accent-color", `var(${color.base})`);
  target.style.setProperty("--accent-bright", `var(${color.bright})`);
  target.style.setProperty("--accent-tint", `var(${color.tint})`);
  target.style.setProperty("--secondary-accent-color", `var(${color.secondary})`);
  target.style.setProperty("--accent-cool-shift", `var(${color.coolShift})`);
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
