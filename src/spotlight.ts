export function rafDebounce(listener: EventListener): EventListener {
  let rafId = 0;
  return (e: Event) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => listener(e));
  };
}

export function spotlight(container: HTMLElement): () => void {
  const cards = Array.from(
    container.querySelectorAll<HTMLElement>("[data-spotlight-card]"),
  );

  function onMouseMove(e: Event) {
    const { clientX, clientY } = e as MouseEvent;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    for (let i = 0; i < cards.length; i++) {
      const cardRect = cards[i].getBoundingClientRect();
      const cardX = x - (cardRect.left - rect.left);
      const cardY = y - (cardRect.top - rect.top);
      cards[i].style.setProperty("--mouse-x", `${cardX  }px`);
      cards[i].style.setProperty("--mouse-y", `${cardY  }px`);
    }
  }

  const onMouseMoveRaf = rafDebounce(onMouseMove);

  container.addEventListener("mousemove", onMouseMoveRaf);

  return () => {
    container.removeEventListener("mousemove", onMouseMoveRaf);
  };
}
