// Cards spotlight
//

const calcFps = (onFps) => {
  let frames = 0;
  let lastTime;

  return () => {
    frames++;
    const time = performance.now();
    if (!lastTime) {
      lastTime = time;
    }

    if (time > lastTime + 1000) {
      let fps = Math.round((frames * 1000) / (time - lastTime));
      lastTime = time;
      frames = 0;
      onFps(fps);
    }
  };
};

// Example
const printFPS = (fps) => console.info("FPS: ", fps);

const rafEventHandler = (handler) => {
  let timeout;
  const rafHandler = (e) => {
    if (timeout) cancelAnimationFrame(timeout);
    timeout = requestAnimationFrame(() => handler(e));
  };
  return rafHandler;
};

class Spotlight {
  constructor(containerElement) {
    this.container = containerElement;
    this.cards = Array.from(this.container.children);
    this.containerSize = {
      w: 0,
      h: 0,
    };
    this.initContainer = this.initContainer.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.lastTimeout = 0;
    this.frames = 0;
    this.timeout;

    const b = calcFps(printFPS);
    const test = (e) => {
      this.onMouseMove(e);
      b();
    };

    this.rafHandler = rafEventHandler(test);

    containerElement.addEventListener("mouseover", (e) => {
      this.rafHandler(e);
    });
    this.init();
  }

  initContainer() {
    this.containerSize.w = this.container.offsetWidth;
    this.containerSize.h = this.container.offsetHeight;
  }

  onMouseMove(event) {
    const { clientX, clientY } = event;
    const rect = this.container.getBoundingClientRect();
    const { w, h } = this.containerSize;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const inside = x < w && x > 0 && y < h && y > 0;

    if (inside) {
      this.cards.forEach((card) => {
        const cardX = -(card.getBoundingClientRect().left - rect.left) + x;
        const cardY = -(card.getBoundingClientRect().top - rect.top) + y;
        card.style.setProperty("--mouse-x", `${cardX}px`);
        card.style.setProperty("--mouse-y", `${cardY}px`);
      });
    }
  }

  init() {
    this.initContainer();
    window.addEventListener("resize", this.initContainer);
    window.addEventListener("mousemove", this.rafHandler);
  }
}

module.exports = Spotlight;
