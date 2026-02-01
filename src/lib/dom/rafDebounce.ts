/**
 * Wraps an event listener so that consecutive calls within the same animation
 * frame are coalesced into a single invocation via `requestAnimationFrame`.
 *
 * Useful for throttling high-frequency events like `scroll` or `resize` to
 * at most once per frame.
 *
 * @param listener - The event listener to debounce.
 * @returns A debounced event listener.
 */
export function rafDebounce(listener: EventListener): EventListener {
  let rafId = 0;
  return (e: Event) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => listener(e));
  };
}
