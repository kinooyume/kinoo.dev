import { setForceGyro } from "./spotlight";

/**
 * Debug utility: simulates gyroscope from mouse movement on desktop.
 *
 * - Sets `forceGyro` so spotlight uses gyroTracker instead of mouseTracker
 * - Dispatches synthetic `deviceorientation` events from mouse position
 * - Adds mobile spotlight CSS visibility (since :hover rules won't apply)
 *
 * Must be called **before** spotlight() initializes (before DOMContentLoaded).
 *
 * @returns A cleanup function that stops the simulation.
 */
export const simulateGyro = (): (() => void) => {
  setForceGyro(true);

  // Make spotlight visible without hover (mimics the @media (hover: none) CSS)
  const style = document.createElement("style");
  style.textContent = `
    .spotlight-card::before { opacity: 0.6 !important; }
    .spotlight-card::after { opacity: 0.06 !important; }
  `;
  document.head.appendChild(style);

  const onMouseMove = (e: MouseEvent) => {
    const gamma = ((e.clientX / window.innerWidth) * 90) - 45;
    const beta = (e.clientY / window.innerHeight) * 90;

    window.dispatchEvent(
      new DeviceOrientationEvent("deviceorientation", {
        alpha: 0,
        beta,
        gamma,
        absolute: false,
      }),
    );
  };

  window.addEventListener("mousemove", onMouseMove);
  // eslint-disable-next-line no-console
  console.log("[gyro-sim] started — move your mouse to simulate tilt");

  return () => {
    window.removeEventListener("mousemove", onMouseMove);
    style.remove();
    setForceGyro(false);
  // eslint-disable-next-line no-console
    console.log("[gyro-sim] stopped");
  };
}
