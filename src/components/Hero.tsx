import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';

const words = ["Android Developer.", "AI Enthusiast.", "ApkMason."];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : 100, Math.random() * 150));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <section className="section" id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '30px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Terminal size={16} color="#f43f5e" />
            <span style={{ fontSize: '0.9rem', color: '#e2e8f0', fontFamily: 'var(--font-mono)' }}>Hello World_</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            Cześć, jestem <span className="text-gradient">ApkMason</span>
          </h1>
          
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-muted)', marginBottom: '3rem', minHeight: '3rem' }}>
            {`${words[index].substring(0, subIndex)}${subIndex === words[index].length + 1 ? "" : "|"}`}
          </h2>

          <p style={{ maxWidth: '600px', margin: '0 auto 3rem auto', fontSize: '1.2rem', color: '#94a3b8', lineHeight: 1.8 }}>
            Hobbystyczny programista Android zafascynowany możliwościami AI. Tworzę aplikacje z pomocą AntiGravity i dużych modeli językowych, zamieniając pomysły w kod w rekordowym tempie po godzinach.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Zobacz portfolio <ArrowRight size={20} />
            </a>
            <a href="#workflow" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Mój Workflow z AI
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
