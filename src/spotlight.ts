type OnFps = (fps: number) => void;

const calcFps = (onFps: OnFps) => {
  let frames = 0;
  let lastTime: number;

  return () => {
    frames++;
    const time = performance.now();
    if (!lastTime) {
      lastTime = time;
    }

    if (time > lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (time - lastTime));
      lastTime = time;
      frames = 0;
      onFps(fps);
    }
  };
};

// Example
const printFPS = (fps: number) => console.info("FPS: ", fps);

const test = (s: string) => console.log(s);

const z = calcFps(printFPS);
const b = (e: string) => {
  test(e);
  z();
};

// identity function that debounce an event listener based on FPS
function fpsDebounceEventListener(listener: EventListener): EventListener {
  let rafId: number;

  // raf wrapper
  const rafListener = (e: Event) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => listener(e));
  };

  return rafListener;
}

// const myDebouncedEventHandler = fpsDebounceEventListener(myEventHandler);

// window.addEventListener("mousemove", myDebouncedEventHandler);

const spotlight = (container: HTMLElement): (() => void) => {
  const cards = Array.from(container.children as HTMLCollectionOf<HTMLElement>);
  let containerSize: [w: number, h: number];

  const updateContainerSize = () => {
    containerSize = [container.offsetWidth, container.offsetHeight];
  };

  updateContainerSize();

  const onMouseMove = (e: Event) => {
    const [w, h] = containerSize;
    const { clientX, clientY } = e as MouseEvent;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const isInside = x < w && x > 0 && y < h && y > 0;

    if (!isInside) return;
    cards.forEach((card) => {
      const cardX = -(card.getBoundingClientRect().left - rect.left) + x;
      const cardY = -(card.getBoundingClientRect().top - rect.top) + y;
      card.style.setProperty("--mouse-x", `${cardX}px`);
      card.style.setProperty("--mouse-y", `${cardY}px`);
    });
  };

  const onMouseMoveRaf = fpsDebounceEventListener(onMouseMove);

  window.addEventListener("resize", updateContainerSize);
  window.addEventListener("mouseover", onMouseMoveRaf);
  window.addEventListener("mousemove", onMouseMoveRaf);

  return () => {
    window.removeEventListener("mouseover", onMouseMoveRaf);
    window.removeEventListener("mousemove", onMouseMoveRaf);
    window.removeEventListener("resize", updateContainerSize);
  };
};
