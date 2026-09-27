import { useEffect, useRef } from 'react';
import { useFinePointer, useReducedMotion } from '../lib/hooks';
import './cursor.css';

/**
 * Etykieta przy kursorze nad elementami z `data-cursor` („Uruchom”, „Podgląd”).
 * Systemowy kursor pozostaje na miejscu — etykieta jedynie podpowiada akcję.
 */
export function Cursor() {
  const finePointer = useFinePointer();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !finePointer) return;
    const label = node.querySelector('span')!;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let scrollFrame = 0;
    let visible = false;
    let inside = false;

    const tick = () => {
      x += (tx - x) * (reduced ? 1 : 0.22);
      y += (ty - y) * (reduced ? 1 : 0.22);
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.2 ? requestAnimationFrame(tick) : 0;
    };

    const update = (element: Element | null) => {
      const target = element?.closest?.('[data-cursor]');
      const text = target?.getAttribute('data-cursor');
      if (text) {
        if (label.textContent !== text) label.textContent = text;
        if (!visible) {
          x = tx;
          y = ty;
          visible = true;
          node.dataset.visible = 'true';
        }
      } else if (visible) {
        visible = false;
        node.dataset.visible = 'false';
      }
    };

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      inside = true;
      update(event.target as Element | null);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // Przewijanie kółkiem przesuwa treść pod nieruchomym kursorem —
    // sprawdzamy wtedy, co jest pod nim teraz (raz na klatkę).
    const onScroll = () => {
      if (!inside || scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        update(document.elementFromPoint(tx, ty));
      });
    };

    const onLeave = () => {
      inside = false;
      visible = false;
      node.dataset.visible = 'false';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollFrame);
    };
  }, [finePointer, reduced]);

  if (!finePointer) return null;

  return (
    <div className="cursor" ref={ref} data-visible="false" aria-hidden="true">
      <span className="mono" />
    </div>
  );
}
