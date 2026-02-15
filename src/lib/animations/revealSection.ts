import { animate } from "animejs";
import { emit } from "@/lib/emitter";

const MOBILE_BREAKPOINT = 900;

const observerOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin:
    window.innerWidth < MOBILE_BREAKPOINT
      ? "0px 0px 50px 0px"
      : "0px 0px -100px 0px",
};

export function revealSections(): () => void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = entry.target as HTMLElement;

        animate(section, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
        });

        emit(`reveal:section:${section.id}`);
        observer.unobserve(section);
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
