type ScrollFrameCallback = (scrollY: number) => void;

const subscribers = new Set<ScrollFrameCallback>();
let frameId: number | null = null;

/**
 * Cała strona korzysta z jednej pętli animacji. Zdarzenia scroll i resize tylko
 * zamawiają klatkę, a odczyt pozycji następuje raz — dzięki temu żaden komponent
 * nie wymusza własnego layoutu i nie ma pracy wykonywanej, gdy nic się nie dzieje.
 */
function flush() {
  frameId = null;
  const scrollY = window.scrollY;
  for (const callback of subscribers) callback(scrollY);
}

function requestFrame() {
  if (frameId === null) frameId = window.requestAnimationFrame(flush);
}

export function onScrollFrame(callback: ScrollFrameCallback): () => void {
  subscribers.add(callback);

  if (subscribers.size === 1) {
    window.addEventListener('scroll', requestFrame, { passive: true });
    window.addEventListener('resize', requestFrame, { passive: true });
  }

  requestFrame();

  return () => {
    subscribers.delete(callback);
    if (subscribers.size > 0) return;

    window.removeEventListener('scroll', requestFrame);
    window.removeEventListener('resize', requestFrame);
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }
  };
}
