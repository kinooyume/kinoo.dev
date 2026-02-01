import { rafDebounce } from "./rafDebounce";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return outMin + ((clamp(value, inMin, inMax) - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/**
 * Requests gyroscope permission on iOS 13+.
 * Must be called from a user gesture (tap/click) on iOS.
 * Resolves to `true` if granted or not needed, `false` if denied.
 */
export const requestPermission = async (): Promise<boolean> => {
  const DOE = DeviceOrientationEvent as unknown as {
    requestPermission?: () => Promise<string>;
  };
  if (typeof DOE.requestPermission !== "function") return true;
  try {
    return (await DOE.requestPermission()) === "granted";
  } catch {
    return false;
  }
}

/**
 * Tracks device orientation (gyroscope) and maps tilt angles to
 * container-relative coordinates, mirroring the `mouseTracker` API.
 *
 * - `gamma` (left-right tilt) → x position across container width
 * - `beta` (front-back tilt) → y position across container height
 *
 * On iOS, permission is requested on first touch (user gesture required).
 * On Android, the listener is attached immediately.
 *
 * Falls back to a no-op if gyroscope is unavailable or permission denied.
 *
 * @param container - The element whose dimensions define the coordinate space.
 * @param onUpdate - Called with `(x, y)` relative to the container's top-left.
 * @returns A cleanup function that removes the event listener.
 */
export const gyroTracker = (
  container: HTMLElement,
  onUpdate: (x: number, y: number) => void,
): () => void => {
  if (!("DeviceOrientationEvent" in window)) return () => {};

  let listening = false;
  let baseBeta: number | null = null;
  let baseGamma: number | null = null;

  const RANGE = 30; // degrees of tilt from center to edge

  const handler = rafDebounce(((e: Event) => {
    const { beta, gamma } = e as DeviceOrientationEvent;
    if (beta === null || gamma === null) return;

    // Calibrate: first reading becomes the center point
    if (baseBeta === null || baseGamma === null) {
      baseBeta = beta;
      baseGamma = gamma;
    }

    const rect = container.getBoundingClientRect();
    const x = clamp(
      map(gamma - baseGamma, -RANGE, RANGE, 0, rect.width),
      0,
      rect.width,
    );
    const y = clamp(
      map(beta - baseBeta, -RANGE, RANGE, 0, rect.height),
      0,
      rect.height,
    );
    onUpdate(x, y);
  }) as EventListener);

  function startListening() {
    if (listening) return;
    listening = true;
    window.addEventListener("deviceorientation", handler);
  }

  // iOS requires requestPermission from a user gesture
  const needsPermission = typeof (DeviceOrientationEvent as unknown as {
    requestPermission?: () => Promise<string>;
  }).requestPermission === "function";

  if (needsPermission) {
    const onTouch = () => {
      container.removeEventListener("touchstart", onTouch);
      requestPermission().then((granted) => {
        if (granted) startListening();
      });
    };
    container.addEventListener("touchstart", onTouch, { once: true });

    return () => {
      container.removeEventListener("touchstart", onTouch);
      window.removeEventListener("deviceorientation", handler);
    };
  }

  // Android / other — no permission needed, start immediately
  startListening();
  return () => window.removeEventListener("deviceorientation", handler);
}
