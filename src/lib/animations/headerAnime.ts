import anime from "animejs/lib/anime.es.js";

export interface HeaderAnimationOptions {
  delay?: number;
}

/**
 * Animates the header elements with a slide-in effect.
 * Used when hero animation is present to coordinate timing.
 */
export function animateHeader(options: HeaderAnimationOptions = {}): anime.AnimeInstance {
  const { delay = 0 } = options;

  const timeline = anime.timeline({ autoplay: false }).add({
    targets: [".header .title-wrapper", ".navbar li", ".header .menu"],
    translateY: ["-1.2em", 0],
    opacity: [0, 1],
    duration: 800,
    delay: (_el: Element, i: number) => delay + 30 * i,
  });

  timeline.play();
  return timeline;
}

/**
 * Shows header elements immediately without animation.
 * Used on pages without hero where header should be visible from the start.
 */
export function showHeaderImmediate(): void {
  const elements = document.querySelectorAll<HTMLElement>(
    ".header .title-wrapper, .navbar li, .header .menu"
  );

  elements.forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });

  const navbar = document.querySelector<HTMLElement>(".navbar");
  if (navbar) {
    navbar.classList.add("enabled");
  }
}
