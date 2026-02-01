import anime from "animejs/lib/anime.es.js";
import { emitHeroAnimationComplete } from "@/lib/dom/onHeroAnimationComplete";

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
    targets: ["#hero .description p", ".hero-tag"],
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: (_el, i) => 30 * i,
  });

  const header = anime.timeline({ autoplay: false }).add({
    targets: [".header .title-wrapper", ".navbar li", ".header .menu"],
    translateY: ["-1.2em", 0],
    opacity: [0, 1],
    duration: 800,
    delay: (_el, i) => 30 * i,
  });

  const picture = anime.timeline({ autoplay: false }).add({
    targets: [".hero-image"],
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 800,
  });

  const allTimelines = [init, subtitle, description, header, picture];

  // Seek all animations to their end state
  function finishAll() {
    allTimelines.forEach((tl) => tl.seek(tl.duration));
  }

  // Normal sequence: init → subtitle → description + header + picture
  subtitle.finished.then(() => {
    description.play();
    header.play();
    picture.play();
  });

  let cancelled = false;

  // Cleanup when last animation completes (naturally or via finishAll)
  picture.finished.then(() => {
    document.body.classList.remove("hero-animation");
    const headerEl = document.querySelector("header");
    if (headerEl) {
      (headerEl as HTMLElement).style.display = "";
    }
    emitHeroAnimationComplete(cancelled ? "cancelled" : "completed");
  });

  init.finished.then(() => {
    subtitle.play();
  });

  // If user scrolls during the animation, fast-forward everything
  function onUserScroll() {
    cancelled = true;
    finishAll();
    window.removeEventListener("wheel", onUserScroll);
    window.removeEventListener("touchmove", onUserScroll);
  }

  if (window.scrollY) {
    // Already scrolled (e.g. back-forward navigation) — skip entirely
    cancelled = true;
    finishAll();
  } else {
    window.addEventListener("wheel", onUserScroll, {
      once: true,
      passive: true,
    });
    window.addEventListener("touchmove", onUserScroll, {
      once: true,
      passive: true,
    });
    init.play();
  }
});
