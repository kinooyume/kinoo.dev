import { emitHeroAnimationComplete } from "@/lib/animations/onHeroAnimationComplete";
import { showHeaderImmediate } from "@/lib/animations/headerAnime";

document.addEventListener("DOMContentLoaded", () => {
  const setFinalStyles = (selector: string, styles: Partial<CSSStyleDeclaration>) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      Object.assign(el.style, styles);
    });
  };

  setFinalStyles(".subtitle", { opacity: "1" });
  setFinalStyles("h1 span", { opacity: "1", transform: "scale(1)" });
  setFinalStyles(".text-wrapper .letter", { transform: "translateY(0)" });
  setFinalStyles("#hero .description > *, .hero-tag", { opacity: "1", transform: "translateY(0)" });
  setFinalStyles(".hero-image", { opacity: "1", transform: "scale(1)" });

  showHeaderImmediate();

  document.body.classList.remove("hero-animation");

  const headerEl = document.querySelector<HTMLElement>("header");
  if (headerEl) {
    headerEl.style.display = "";
  }

  emitHeroAnimationComplete("cancelled");

  if (globalThis.location.hash) {
    requestAnimationFrame(() => {
      const target = document.querySelector(globalThis.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "instant" });
      }
    });
  }
});
