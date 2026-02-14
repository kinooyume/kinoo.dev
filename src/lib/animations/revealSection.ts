import { animate, stagger } from "animejs";

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
        const section = entry.target;
        const h2 = section.querySelector<HTMLElement>(":scope > h2");
        const letterGroups = section.querySelectorAll("[data-reveal-letters]");

        animate(section, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
        });

        letterGroups.forEach((group, i) => {
          const letters = group.querySelectorAll(".reveal-letter");
          if (letters.length) {
            animate(letters, {
              translateY: ["1.1em", 0],
              duration: 750,
              delay: stagger(30, { start: 200 + i * 150 }),
              ease: "outElastic(1, .5)",
            });
          }
        });

        if (h2 && !h2.closest("[data-reveal-letters]") && !h2.querySelector("[data-reveal-letters]")) {
          animate(h2, {
            opacity: [0, 1],
            translateX: [30, 0],
            duration: 600,
            delay: 250,
            ease: "outElastic(1, .5)",
          });
        }

        observer.unobserve(section);
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll(
    "[data-animate-section]:not(#hero)",
  );
  sections.forEach((section) => {
    (section as HTMLElement).style.opacity = "0";
    const h2 = section.querySelector<HTMLElement>(":scope > h2");
    if (h2 && !h2.closest("[data-reveal-letters]") && !h2.querySelector("[data-reveal-letters]")) {
      h2.style.opacity = "0";
      h2.style.transform = "translateX(30px)";
    }
    observer.observe(section);
  });

  return () => observer.disconnect();
}
