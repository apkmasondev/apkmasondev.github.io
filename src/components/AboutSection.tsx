import { copy } from '../content';
import type { Language } from '../data/projects';

export function AboutSection({ language }: { language: Language }) {
  const text = copy[language].about;

  return (
    <section className="about section-shell" id="about" aria-labelledby="about-title">
      <span className="about-wordmark" aria-hidden="true">APKMASON</span>

      <div className="about-portrait-shell">
        <div className="about-portrait">
          <img src="/profile.jpg" alt="Krzysztof — ApkMason" loading="lazy" decoding="async" />
          <span className="about-scanline" aria-hidden="true" />
          <div className="about-portrait-meta" aria-hidden="true">
            <span>SUBJECT / KRZYSZTOF</span>
            <span>FRAME / 01</span>
          </div>
        </div>
        <div className="about-axis" aria-hidden="true">
          <span>Structure</span>
          <i />
          <span>Imagination</span>
        </div>
      </div>

      <div className="about-copy">
        <p className="eyebrow">{text.overline}</p>
        <h2 id="about-title">
          <span>{text.titleLines[0]}</span>
          <span>{text.titleLines[1]}</span>
        </h2>
        <div className="about-narrative">
          <p><span>01 / SCALE</span>{text.p1}</p>
          <p><span>02 / CURIOSITY</span>{text.p2}</p>
        </div>
        <ul aria-label="Capabilities">
          {text.capabilities.map((capability, index) => (
            <li key={capability}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {capability}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
