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
}
