/**
 * Registers a detection function on `scroll` and `resize` events, and
 * invokes it once immediately so the UI is correct on first render.
 *
 * @param fn - The detection callback (typically returned by {@link createAnchorDetector}).
 * @param debugName - Optional debug-friendly name assigned to the function via `Object.defineProperty`.
 * @returns A cleanup function that removes the event listeners.
 */
export function onScrollAndResize(fn: () => void, debugName?: string) {
  if (debugName) Object.defineProperty(fn, "name", { value: debugName });

  window.addEventListener("scroll", fn);
  window.addEventListener("resize", fn);

  fn(); // runs the detection once immediately so the UI is correct on page load

  return () => {
    window.removeEventListener("scroll", fn);
    window.removeEventListener("resize", fn);
  };
}
