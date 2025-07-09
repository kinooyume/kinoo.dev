export function anchorDetection({ query, onVisible, onHidden }) {
  const anchors = document.querySelectorAll(query);

  return () => {
    anchors.forEach((anchor) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      const rect = target.getBoundingClientRect();
      const offset = window.innerHeight / 2;

      if (rect.top <= offset && rect.bottom >= offset) {
        onVisible(anchor);
      } else {
        onHidden(anchor);
      }
    });
  };
}

export function setupAnchorDetection({ name, fn }) {
  Object.defineProperty(fn, "name", { value: name });
  window.addEventListener("scroll", fn);
  window.addEventListener("resize", fn);
  fn();
}
