type Theme = "dark" | "light";

const STORAGE_KEY = "theme";
const DARK_META = "#181927";
const LIGHT_META = "#f5f7fc";

function getSystemTheme(): Theme {
  return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function getTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return getSystemTheme();
}

export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);

  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = theme === "light" ? LIGHT_META : DARK_META;
}

export function toggleTheme(): void {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

export function initTheme(): void {
  setTheme(getTheme());
}
