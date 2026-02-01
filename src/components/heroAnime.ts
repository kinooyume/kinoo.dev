import anime from "animejs/lib/anime.es.js";
import { emitHeroAnimationComplete } from "@/lib/dom/onHeroAnimationComplete";

document.addEventListener("DOMContentLoaded", () => {
  // Appliquer les styles pour centrer le Hero et cacher le reste
  
  document.body.classList.add('hero-animation');
  
  // Désactiver le scroll au début
  document.body.style.overflow = "hidden";
  const init = anime.timeline({ autoplay: false }).add({
    targets: [".subtitle"],
    opacity: 1,
  });

  type Durations = {
    title: number;
    subtitle: number;
    // description: number;
    // header: number;
    // picture: number;
  };

  const durations: Durations = {
    title: 600,
    subtitle: 750,
    // description: 1000,
    // header: 800,
    // picture: 800,
  };

  const subtitle = anime
    .timeline({ autoplay: false })
    .add({
      targets: "h1 span",
      opacity: [0, 1],
      duration: 600,
      scale: [0.8, 1],
      delay: (_el, i) => {
        return 70 * i;
      },
    })
    .add({
      targets: ".text-wrapper .letter",
      translateY: ["1.3em", 0],
      translateZ: 0,
      duration: 750,
      delay: (_el, i) => {
        return 30 * i;
      },
    });

  const description = anime.timeline({ autoplay: false }).add({
    targets: ["#hero .description p", ".hero-tag"],
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: (_el, i) => {
      return 30 * i;
    },
  });

  const header = anime.timeline({ autoplay: false }).add({
    targets: [".header .title-wrapper", ".navbar li", ".header .menu"],
    translateY: ["-1.2em", 0],
    opacity: [0, 1],
    duration: 800,
    delay: (_el, i) => {
      return 30 * i;
    },
  });

  const picture = anime.timeline({ autoplay: false }).add({
    targets: [".hero-image"],
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 800,
  });

  subtitle.finished.then(() => {
    description.play();
    header.play();
    picture.play();
  });

  // Quand toutes les animations sont terminées
  picture.finished.then(() => {
    // Supprimer les styles d'animation Hero
    document.body.classList.remove('hero-animation');
    
    // Réafficher le header
    const header = document.querySelector('header');
    if (header) {
      (header as HTMLElement).style.display = '';
    }
    
    // Réactiver le scroll
    document.body.style.overflow = "auto";
    emitHeroAnimationComplete();
  });

  init.finished.then(() => {
    subtitle.play();
  });

  if (window.scrollY) {
    init.seek(init.duration);
    header.seek(header.duration);
    subtitle.seek(durations.subtitle + durations.title);
    description.seek(description.duration);
    picture.seek(picture.duration);
    // Si on a déjà scrollé, supprimer immédiatement les styles d'animation
    document.body.classList.remove('hero-animation');
    const headerEl = document.querySelector('header');
    if (headerEl) {
      (headerEl as HTMLElement).style.display = '';
    }
    // Si on a déjà scrollé, réactiver immédiatement
    document.body.style.overflow = "auto";
    emitHeroAnimationComplete();
  } else {
    init.play();
  }

});
