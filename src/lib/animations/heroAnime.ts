import { createTimeline } from "animejs";
import { emitHeroAnimationComplete } from "@/lib/animations/onHeroAnimationComplete";
import { animateHeader, showHeaderImmediate } from "@/lib/animations/headerAnime";

export function playHeroAnimation(): void {
  document.body.classList.add("hero-animation");

  const subtitle = createTimeline({
    autoplay: false,
    defaults: { ease: "outElastic(1, .5)" },
  })
    .add(".subtitle", {
      opacity: [0, 1],
      duration: 400,
    })
    .add("h1 span", {
      opacity: [0, 1],
      duration: 600,
      scale: [0.8, 1],
      delay: (_el, i) => 70 * i,
    }, 0)
    .add(".text-wrapper .letter", {
      opacity: [0, 1],
      translateY: ["1.3em", 0],
      translateZ: 0,
      duration: 750,
      delay: (_el, i) => 30 * i,
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

  const picture = createTimeline({ autoplay: false })
    .add([".hero-image"], {
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 800,
      ease: "outElastic(1, .5)",
    })
    .add(
      ".hero-socials",
      {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        ease: "outElastic(1, .5)",
      },
      "-=400",
    );

  [subtitle, description, picture].forEach((tl) => tl.play());
  const header = animateHeader();

  document.body.classList.remove("hero-animation");
  const headerEl = document.querySelector("header");
  if (headerEl) headerEl.style.display = "";

  Promise.all([subtitle, description, picture, header])
    .then(() => {
      document.body.setAttribute("data-animations-done", "");
      emitHeroAnimationComplete("completed");
    });

  if (globalThis.location.hash) {
    requestAnimationFrame(() => {
      const target = document.querySelector(globalThis.location.hash);
      if (target) target.scrollIntoView({ behavior: "instant" });
    });
  }
}

export function showHeroImmediate(): void {
  document.querySelectorAll<HTMLElement>("h1 span").forEach((el) => {
    el.style.opacity = "1";
  });
  document.querySelectorAll<HTMLElement>(".subtitle").forEach((el) => {
    el.style.opacity = "1";
  });
  document.querySelectorAll<HTMLElement>(".text-wrapper .letter").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
  document.querySelectorAll<HTMLElement>("#hero .description > *, .tag-animated").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
  document.querySelectorAll<HTMLElement>(".hero-image").forEach((el) => {
    el.style.opacity = "1";
  });
  document.querySelectorAll<HTMLElement>(".hero-socials").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });

  showHeaderImmediate();
  document.body.setAttribute("data-animations-done", "");
  emitHeroAnimationComplete("completed");
}
