import { animate } from "animejs";

const MOBILE_BREAKPOINT = 900;

const observerOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin:
    window.innerWidth < MOBILE_BREAKPOINT
      ? "0px 0px 50px 0px"
      : "0px 0px -100px 0px",
};

/**
 * Observes `[data-animate-section]` elements (excluding `#hero`) and
 * reveals them with a fade + slide-up animation when they enter the viewport.
 *
 * @returns A cleanup function that disconnects the observer.
 */
export function revealSections(): () => void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll(
    "[data-animate-section]:not(#hero)",
  );
  sections.forEach((section) => {
    (section as HTMLElement).style.opacity = "0";
    observer.observe(section);
  });

  return () => observer.disconnect();
}
