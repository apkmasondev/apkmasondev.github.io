import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { EMAIL } from '../i18n/copy';
import { useCopy, useLanguage } from '../i18n/language';
import { useAllowsHeavyMedia, useInView, useReveal } from '../lib/hooks';
import { ArrowUp, ArrowUpRight, Check, Copy, Github, Kicker, Lines, Mark } from './ui';
import './contact.css';

export function Contact() {
  const text = useCopy().contact;
  const { lang, toggle } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heavy = useAllowsHeavyMedia();
  const [mediaRef, near] = useInView<HTMLDivElement>('400px 0px');
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useReveal(sectionRef);

  if (heavy && near && !mounted) setMounted(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (near) void video.play().catch(() => undefined);
    else video.pause();
  }, [near, mounted]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer className="contact" id="contact" ref={sectionRef} aria-labelledby="contact-title">
      <div className="contact__media" ref={mediaRef} aria-hidden="true">
        <picture>
          <source media="(max-aspect-ratio: 6 / 5)" srcSet="/media/hero-poster-mobile.jpg" />
          <img src="/media/hero-poster.jpg" alt="" width="1280" height="720" loading="lazy" decoding="async" />
        </picture>
        {mounted && (
          <video
            ref={videoRef}
            className={ready ? 'is-ready' : undefined}
            muted
            loop
            playsInline
            preload="auto"
            tabIndex={-1}
            onCanPlay={() => setReady(true)}
          >
            <source media="(max-aspect-ratio: 6 / 5)" src="/media/hero-loop-mobile.mp4" type="video/mp4" />
            <source src="/media/hero-loop-desktop.mp4" type="video/mp4" />
          </video>
        )}
        <span className="contact__shade" />
      </div>

      <div className="contact__inner shell">
        <Kicker no="05">{text.kicker}</Kicker>
        <Lines lines={text.title} className="h2 contact__title" id="contact-title" />
        <p className="lede" data-reveal style={{ '--delay': '200ms' } as CSSProperties}>
          {text.lede}
        </p>

        <div className="contact__mail" data-reveal style={{ '--delay': '300ms' } as CSSProperties}>
          <a className="contact__email" href={`mailto:${EMAIL}`} aria-label={`${text.email}: ${EMAIL}`}>
            <span className="contact__email-text">{EMAIL}</span>
            <span className="contact__email-icon" aria-hidden="true">
              <ArrowUpRight size={34} stroke={2} />
            </span>
          </a>
          <div className="contact__actions">
            <button type="button" className="btn btn--ghost" onClick={copyEmail} aria-live="polite">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? text.copied : text.copy}
            </button>
            <a className="btn btn--ghost" href={text.githubUrl} target="_blank" rel="noopener">
              <Github size={16} />
              {text.github}
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>

      <div className="contact__bar shell">
        <p className="contact__brand">
          <Mark size={22} />
          <span>© {new Date().getFullYear()} APKMason.dev</span>
          <span className="contact__legal">{text.legal}</span>
        </p>
        {/* Rozwinięcie nazwy: A·P·K to pierwsze litery AI, Pixels, Kinetics.
            Wersja wizualna jest ukryta przed czytnikami, które dostają pełne zdanie. */}
        <p className="contact__sig mono">
          <span className="sr-only">{text.signatureLabel}</span>
          <span aria-hidden="true">
            {text.signature.map((word, index) => (
              <span key={word}>
                {index > 0 && <span className="contact__sig-dot">·</span>}
                <span className="contact__sig-initial">{word[0]}</span>
                {word.slice(1)}
              </span>
            ))}
          </span>
        </p>
        <div className="contact__end">
          <button type="button" className="contact__lang mono" onClick={toggle} lang={lang === 'pl' ? 'en' : 'pl'}>
            {lang === 'pl' ? 'English' : 'Polski'}
          </button>
          <a className="contact__top mono" href="#top">
            {text.top}
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
