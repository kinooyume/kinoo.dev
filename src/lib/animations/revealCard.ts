import { createTimeline, stagger } from "animejs";

const MOBILE_BREAKPOINT = 900;
const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

const observerOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

function clearTransforms(card: Element) {
  requestAnimationFrame(() => {
    (card as HTMLElement).style.transform = "";
    card.querySelectorAll<HTMLElement>("[data-animate-elem]").forEach((child) => {
      child.style.transform = "";
    });
  });
}

function animateCard(card: Element) {
  card.querySelectorAll<HTMLElement>("[data-animate-elem]").forEach(
    (el) => (el.style.opacity = "0"),
  );

  const onComplete = () => clearTransforms(card);

  if (isMobile()) {
    const elems = card.querySelectorAll("[data-animate-elem]");
    createTimeline({ onComplete })
      .add(card, {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: 1,
        duration: 500,
        ease: "outCubic",
      })
      .add(
        elems,
        {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 400,
          delay: stagger(80),
          ease: "outCubic",
        },
        "-=200",
      );
    return;
  }

  const elems = card.querySelectorAll("[data-animate-elem]");
  createTimeline({ onComplete })
    .add(card, {
      opacity: [0, 1],
      translateY: [50, 0],
      scale: [0.8, 1],
      duration: 600,
      delay: (_el, i) => i * 200,
      ease: "outElastic(1, .5)",
    })
    .add(elems, {
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 800,
      delay: stagger(200),
      ease: "outElastic(1, .5)",
    });
}

/**
 * Observes `[data-animate-card]` elements and reveals them
 *
 * Cards already visible on init are triggered immediately to handle
 * tall elements that may not meet the 10% intersection threshold.
 *
 * @returns A cleanup function that disconnects the observer.
 */
export function revealCards(): () => void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCard(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const mobile = isMobile();
  const cards = document.querySelectorAll("[data-animate-card]");
  cards.forEach((card) => {
    (card as HTMLElement).style.opacity = "0";
    if (!mobile) {
      (card as HTMLElement).style.transform = "translateY(50px) scale(0.8)";
    }
    observer.observe(card);
  });

  // Cards already in viewport may not meet the 10% threshold yet
  // (e.g. tall cards spanning multiple grid rows), trigger them directly
  requestAnimationFrame(() => {
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        observer.unobserve(card);
        animateCard(card);
      }
    });
  });

  return () => observer.disconnect();
}
