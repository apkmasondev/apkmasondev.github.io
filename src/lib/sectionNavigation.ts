/**
 * Przewija do sekcji dopiero po ustabilizowaniu fontów i najbliższych dwóch
 * klatek układu. Zapobiega kończeniu płynnej animacji na starej pozycji celu,
 * gdy fonty lub zamykane menu zmieniają wysokość dokumentu.
 */
export async function navigateToSection(sectionId: string): Promise<void> {
  if ('fonts' in document) {
    await Promise.race([
      document.fonts.ready,
      new Promise<void>((resolve) => window.setTimeout(resolve, 350)),
    ]);
  }

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

  const target = document.getElementById(sectionId);
  if (!target) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });

  const hash = `#${sectionId}`;
  if (window.location.hash === hash) history.replaceState(null, '', hash);
  else history.pushState(null, '', hash);

  // Obrazy i fonty ładowane podczas długiego skoku mogą jeszcze przesunąć cel.
  // Dwa lekkie dociągnięcia utrzymują kotwicę we właściwym miejscu, ale znikają,
  // gdy użytkownik sam przejmie przewijanie.
  let interrupted = false;
  const interrupt = () => {
    interrupted = true;
  };
  const interruptKeys = (event: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
      interrupt();
    }
  };

  window.addEventListener('wheel', interrupt, { passive: true });
  window.addEventListener('touchstart', interrupt, { passive: true });
  window.addEventListener('keydown', interruptKeys);

  const correctPosition = () => {
    if (interrupted) return;

    const scrollPadding = Number.parseFloat(
      getComputedStyle(document.documentElement).scrollPaddingTop,
    );
    const offset = target.getBoundingClientRect().top - (Number.isFinite(scrollPadding) ? scrollPadding : 0);

    if (Math.abs(offset) > 2) window.scrollBy({ top: offset, behavior: 'auto' });
  };

  window.setTimeout(correctPosition, 1200);
  window.setTimeout(() => {
    correctPosition();
    window.removeEventListener('wheel', interrupt);
    window.removeEventListener('touchstart', interrupt);
    window.removeEventListener('keydown', interruptKeys);
  }, 2600);
}
