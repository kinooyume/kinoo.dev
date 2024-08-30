export function anchorDetection({ query, onVisible, onHidden }) {
  let anchors = document.querySelectorAll(query);

  function handleAnchor() {
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
  }
  window.addEventListener("scroll", handleAnchor);
  window.addEventListener("resize", handleAnchor);
  handleAnchor();
}
