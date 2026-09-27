/**
 * Jedna pętla dla całej strony. Zdarzenia `scroll` i `resize` jedynie zamawiają
 * klatkę; subskrybenci dostają gotowe wartości i zapisują wynik jako zmienne CSS.
 * Gdy nikt nie subskrybuje, nasłuchy są odpinane.
 */
type FrameListener = (scrollY: number, viewportHeight: number) => void;

const listeners = new Set<FrameListener>();
let frame = 0;

function run() {
  frame = 0;
  const y = window.scrollY;
  const vh = window.innerHeight;
  listeners.forEach((listener) => listener(y, vh));
}

function request() {
  if (!frame) frame = requestAnimationFrame(run);
}

export function onFrame(listener: FrameListener) {
  if (listeners.size === 0) {
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
  }
  listeners.add(listener);
  request();

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
