import anime from "animejs/lib/anime.es.js";

document.addEventListener("DOMContentLoaded", function () {
  const init = anime.timeline({ autoplay: false }).add({
    targets: [".subtitle"],
    opacity: 1,
  });

  type Durations = {
    title: number;
    subtitle: number;
    description: number;
    header: number;
    picture: number;
  };

  const durations: Durations = {
    title: 600,
    subtitle: 750,
    description: 1000,
    header: 800,
    picture: 800,
  };

  const subtitle = anime
    .timeline({ autoplay: false })
    .add({
      targets: "h1 span",
      opacity: [0, 1],
      duration: 600,
      scale: [0.8, 1],
      delay: (el, i) => {
        return 70 * i;
      },
    })
    .add({
      targets: ".text-wrapper .letter",
      translateY: ["1.2em", 0],
      translateZ: 0,
      duration: 750,
      delay: (el, i) => {
        return 30 * i;
      },
    });

  const description = anime.timeline({ autoplay: false }).add({
    targets: ["#hero .description p", ".hero-tag"],
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: (el, i) => {
      return 30 * i;
    },
  });

  const header = anime.timeline({ autoplay: false }).add({
    targets: [".header .title-wrapper", ".navbar li", ".header .menu"],
    translateY: ["-1.2em", 0],
    opacity: [0, 1],
    duration: 800,
    delay: (el, i) => {
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

  init.finished.then(() => {
    subtitle.play();
  });

  if (window.scrollY) {
    header.seek(header.duration);
    subtitle.seek(subtitle.duration);
    description.seek(description.duration);
    picture.seek(picture.duration);
  } else {
    init.play();
  }
});
