import anime from "animejs/lib/anime.es.js";
import { emitHeroAnimationComplete } from "@/lib/animations/onHeroAnimationComplete";
import { animateHeader } from "@/lib/animations/headerAnime";

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("hero-animation");

  const init = anime.timeline({ autoplay: false }).add({
    targets: [".subtitle"],
    opacity: 1,
  });

  const subtitle = anime
    .timeline({ autoplay: false })
    .add({
      targets: "h1 span",
      opacity: [0, 1],
      duration: 600,
      scale: [0.8, 1],
      delay: (_el, i) => 70 * i,
    })
    .add({
      targets: ".text-wrapper .letter",
      translateY: ["1.3em", 0],
      translateZ: 0,
      duration: 750,
      delay: (_el, i) => 30 * i,
    });

  const description = anime.timeline({ autoplay: false }).add({
    targets: ["#hero .description > *", ".hero-tag"],
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: (_el, i) => 30 * i,
  });

  const picture = anime.timeline({ autoplay: false }).add({
    targets: [".hero-image"],
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 800,
  });

  const allTimelines = [init, subtitle, description, picture];

  allTimelines.forEach((tl) => tl.play());
  animateHeader();

  document.body.classList.remove("hero-animation");
  const headerEl = document.querySelector("header");
  if (headerEl) {
    headerEl.style.display = "";
  }
  emitHeroAnimationComplete("completed");

  if (globalThis.location.hash) {
    requestAnimationFrame(() => {
      const target = document.querySelector(globalThis.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "instant" });
      }
    });
  }
});
