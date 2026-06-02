import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Zap, Rocket, Code2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Workflow = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('');

  const steps = [
    {
      icon: <Target size={32} color="var(--accent-color)" />,
      title: t('workflow.steps.step1.title'),
      desc: t('workflow.steps.step1.desc')
    },
    {
      icon: <Lightbulb size={32} color="var(--accent-secondary)" />,
      title: t('workflow.steps.step2.title'),
      desc: t('workflow.steps.step2.desc')
    },
    {
      icon: <Zap size={32} color="#8b5cf6" />,
      title: t('workflow.steps.step3.title'),
      desc: t('workflow.steps.step3.desc')
    },
    {
      icon: <Rocket size={32} color="#10b981" />,
      title: t('workflow.steps.step4.title'),
      desc: t('workflow.steps.step4.desc')
    }
  ];

  useEffect(() => {
    const rawPrompts = t('workflow.prompts', { returnObjects: true }) as string[];
    const prompts = rawPrompts.map(p => Array.from(p));

    let promptIndex = 0;
    let currentIndex = 0;
    let currentText = "";
    let isDeleting = false;
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];

    const typeChar = () => {
      const currentSequence = prompts[promptIndex];

      if (isDeleting) {
        currentText = currentText.slice(0, -1);
        setText(currentText);

        if (currentText.length === 0) {
          isDeleting = false;
          currentIndex = 0;
          promptIndex = (promptIndex + 1) % prompts.length;
          timeoutIds.push(setTimeout(typeChar, 800));
          return;
        }

        timeoutIds.push(setTimeout(typeChar, 15));
        return;
      }

      if (currentIndex >= currentSequence.length) {
        isDeleting = true;
        timeoutIds.push(setTimeout(typeChar, 3500));
        return;
      }

      const char = currentSequence[currentIndex];
      if (char === "BACKSPACE") {
        currentText = currentText.slice(0, -1);
      } else {
        currentText += char;
      }
      
      setText(currentText);
      currentIndex++;

      let delay = 30 + Math.random() * 60;
      if (char === "BACKSPACE") delay = 40;
      
      if (currentSequence[currentIndex] === "BACKSPACE" && currentSequence[currentIndex - 1] !== "BACKSPACE") {
        delay += 400; 
      }
      
      if (char === "." || char === ",") delay += 200;

      timeoutIds.push(setTimeout(typeChar, delay));
    };

    timeoutIds.push(setTimeout(typeChar, 1500));

    return () => timeoutIds.forEach(clearTimeout);
  }, [t]);

  return (
    <section className="section" id="workflow">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('workflow.title')}</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 4rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
            {t('workflow.desc')}
          </p>
          
          <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(1rem, 4vw, 4rem)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
                >
                  <div className="flex-center" style={{ 
                    minWidth: '40px', 
                    height: '40px', 
                    borderRadius: '16px', 
                    background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(244, 63, 94, 0.1))',
                    border: '1px solid var(--accent-glow)',
                    color: 'var(--accent-color)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                  }}>
                    {step.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', marginBottom: '0.5rem', color: '#fff', wordBreak: 'break-word' }}>{step.title}</h4>
                    <p className="text-muted" style={{ fontSize: 'clamp(0.95rem, 3vw, 1.05rem)' }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: '3rem', padding: 'clamp(1rem, 3vw, 1.5rem)', background: 'rgba(5, 5, 8, 0.5)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflowX: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <Code2 size={18} color="var(--text-muted)" /> <span className="text-muted" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>Przykładowy prompt</span>
              </div>
              <code style={{ color: '#a78bfa', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.6, display: 'block', whiteSpace: 'pre-wrap', wordBreak: 'break-word', minHeight: '3rem' }}>
                "{text}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span>"
              </code>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Workflow;
