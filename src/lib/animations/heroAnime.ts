import { createTimeline } from "animejs";
import { emitHeroAnimationComplete } from "@/lib/animations/onHeroAnimationComplete";
import { animateHeader } from "@/lib/animations/headerAnime";

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("hero-animation");

  const init = createTimeline({ autoplay: false }).add([".subtitle"], {
    opacity: 1,
  });

  const subtitle = createTimeline({ autoplay: false })
    .add("h1 span", {
      opacity: [0, 1],
      duration: 600,
      scale: [0.8, 1],
      delay: (_el, i) => 70 * i,
      ease: "outElastic(1, .5)",
    })
    .add(".text-wrapper .letter", {
      translateY: ["1.3em", 0],
      translateZ: 0,
      duration: 750,
      delay: (_el, i) => 30 * i,
      ease: "outElastic(1, .5)",
    });

  const description = createTimeline({ autoplay: false }).add(
    ["#hero .description > *", ".tag-animated"],
    {
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: (_el, i) => 30 * i,
      ease: "outElastic(1, .5)",
    },
  );

  const picture = createTimeline({ autoplay: false }).add([".hero-image"], {
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 800,
    ease: "outElastic(1, .5)",
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
