import { createTimeline, stagger } from "animejs";
import { hasPlayed, markPlayed } from "@/lib/animations/sessionTracker";

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

function showCardImmediate(card: HTMLElement) {
  card.style.opacity = "1";
  card.style.transform = "none";
  card.querySelectorAll<HTMLElement>("[data-animate-elem]").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
}

function animateCard(card: Element, index: number) {
  markPlayed(`card:${index}`);
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

export function revealCards(): () => void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target as HTMLElement;
        const index = parseInt(card.dataset.cardIndex ?? "0", 10);
        animateCard(card, index);
        observer.unobserve(card);
      }
    });
  }, observerOptions);

  const mobile = isMobile();
  const cards = document.querySelectorAll<HTMLElement>("[data-animate-card]");

  cards.forEach((card, i) => {
    card.dataset.cardIndex = String(i);
    const key = `card:${i}`;

    if (hasPlayed(key)) {
      showCardImmediate(card);
    } else {
      card.style.opacity = "0";
      if (!mobile) card.style.transform = "translateY(50px) scale(0.8)";
      observer.observe(card);
    }
  });

  requestAnimationFrame(() => {
    cards.forEach((card) => {
      if (card.style.opacity === "1") return;
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const index = parseInt(card.dataset.cardIndex ?? "0", 10);
        observer.unobserve(card);
        animateCard(card, index);
      }
    });
  });

  return () => observer.disconnect();
}
