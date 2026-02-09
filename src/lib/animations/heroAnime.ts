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
    targets: ["#hero .description p", ".hero-tag"],
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

  let headerAnimation: anime.AnimeInstance | null = null;

  const allTimelines = [init, subtitle, description, picture];

  const finishAll = () => {
    allTimelines.forEach((tl) => tl.seek(tl.duration));
    if (headerAnimation) {
      headerAnimation.seek(headerAnimation.duration);
    }
  };

  // Normal sequence: init → subtitle → description + header + picture
  subtitle.finished.then(() => {
    description.play();
    headerAnimation = animateHeader();
    picture.play();
  });

  let cancelled = false;

  // Cleanup when last animation completes (naturally or via finishAll)
  picture.finished.then(() => {
    document.body.classList.remove("hero-animation");
    const headerEl = document.querySelector("header");
    if (headerEl) {
      headerEl.style.display = "";
    }
    emitHeroAnimationComplete(cancelled ? "cancelled" : "completed");
  });

  init.finished.then(() => {
    subtitle.play();
  });

  const onUserScroll = () => {
    cancelled = true;
    finishAll();
    globalThis.removeEventListener("wheel", onUserScroll);
    globalThis.removeEventListener("touchmove", onUserScroll);
  }

  // Skip animation if page is scrolled or URL has a hash (coming from anchor link)
  if (globalThis.scrollY || window.location.hash) {
    cancelled = true;
    finishAll();

    // When coming from anchor link, scroll to target after elements are visible
    if (window.location.hash) {
      requestAnimationFrame(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: "instant" });
        }
      });
    }
  } else {
    globalThis.addEventListener("wheel", onUserScroll, {
      once: true,
      passive: true,
    });
    globalThis.addEventListener("touchmove", onUserScroll, {
      once: true,
      passive: true,
    });
    init.play();
  }
});
