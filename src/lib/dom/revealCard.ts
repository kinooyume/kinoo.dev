import anime from "animejs/lib/anime.es.js";

const observerOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

function animateCard(card: Element) {
  const elems = card.querySelectorAll("[data-animate-elem]");
  anime
    .timeline()
    .add({
      targets: card,
      opacity: [0, 1],
      translateY: [50, 0],
      scale: [0.8, 1],
      duration: 600,
      delay: (_el: Element, i: number) => i * 200,
    })
    .add({
      targets: elems,
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 800,
      delay: anime.stagger(200),
    });
}

/**
 * Observes `[data-animate-card]` elements and reveals them with a
 * scale + slide-up animation when they enter the viewport.
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

  const cards = document.querySelectorAll("[data-animate-card]");
  cards.forEach((card) => {
    (card as HTMLElement).style.opacity = "0";
    (card as HTMLElement).style.transform = "translateY(50px) scale(0.8)";
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
