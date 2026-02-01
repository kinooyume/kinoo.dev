import anime from "animejs/lib/anime.es.js";

const observerOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
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
        anime({
          targets: entry.target,
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
