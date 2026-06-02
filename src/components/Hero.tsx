import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  const words = useMemo(() => t('hero.roles', { returnObjects: true }) as string[], [t]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeoutId = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeoutId);
    }

    if (subIndex === 0 && reverse) {
      setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 0);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : 100, Math.random() * 150));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <section className="section" id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex-center mb-4">
            <div className="mono-tag">
              <Terminal size={16} color="var(--accent-color)" />
              <span>{t('hero.hello')}</span>
            </div>
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            {t('hero.hi')} <span style={{ fontSize: '0.8em', opacity: 0.9, fontWeight: 600 }}>{t('hero.iam')}</span> <span className="text-gradient">{t('hero.name')}</span>
          </h1>
          
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-muted)', marginBottom: '2.5rem', minHeight: '3.5rem' }}>
            {`${words[index].substring(0, subIndex)}${subIndex === words[index].length + 1 ? "" : "|"}`}
          </h2>

          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.6 }}>
            {t('hero.description')}
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '3.5rem' }}>
            <a href="#projects" className="btn btn-primary">
              {t('hero.btnProjects')} <ArrowRight size={20} />
            </a>
            <a href="#workflow" className="btn btn-secondary">
              {t('hero.btnWorkflow')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
