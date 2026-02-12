/**
 * Intercepts clicks on same-page hash links (`<a href="#…">` or `<a href="/#…">`)
 * and smooth-scrolls to the target without updating the URL hash.
 *
 * Uses event delegation so it covers all hash links on the page,
 * including dynamically added ones.
 *
 * @returns A cleanup function that removes the listener.
 */
export function smoothHashLinks(): () => void {
  function handler(e: MouseEvent) {
    const link = (e.target as Element).closest('a[href*="#"]');
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href) return;
    const hash = href.slice(href.indexOf("#"));
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  }

  document.addEventListener("click", handler);
  return () => document.removeEventListener("click", handler);
}
