import { animate } from "animejs";
import { emit } from "@/lib/emitter";
import { hasPlayed, markPlayed } from "@/lib/animations/sessionTracker";

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
        const key = `section:${section.id}`;

        markPlayed(key);
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

  const sections = document.querySelectorAll<HTMLElement>(
    "[data-animate-section]:not(#hero)",
  );

  sections.forEach((section) => {
    const key = `section:${section.id}`;
    if (hasPlayed(key)) {
      section.style.opacity = "1";
      section.style.transform = "none";
      emit(`reveal:section:${section.id}`);
    } else {
      section.style.opacity = "0";
      observer.observe(section);
    }
  });

  return () => observer.disconnect();
}
