import { createTimeline, type Timeline } from "animejs";
import { hasPlayed, markPlayed } from "@/lib/animations/sessionTracker";

export interface HeaderAnimationOptions {
  delay?: number;
}

export function animateHeader(options: HeaderAnimationOptions = {}): Timeline {
  markPlayed("header");
  const { delay = 0 } = options;

  const timeline = createTimeline({ autoplay: false }).add(
    [".header .title-wrapper", ".navbar li", ".header-menu"],
    {
      translateY: ["-1.2em", 0],
      opacity: [0, 1],
      duration: 800,
      delay: (_el, i) => delay + 30 * i,
      ease: "outElastic(1, .5)",
    },
  );

  timeline.play();
  return timeline;
}

export function showHeaderImmediate(): void {
  const elements = document.querySelectorAll<HTMLElement>(
    ".header .title-wrapper, .navbar li, .header-menu"
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

export function initHeader(): void {
  // On index first visit, hero sequence handles the header animation (synced)
  const hasHero = !!document.getElementById("hero");
  if (hasHero && !hasPlayed("hero")) return;

  if (hasPlayed("header")) {
    showHeaderImmediate();
  } else {
    animateHeader();
  }
}
