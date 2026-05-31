import { motion } from 'framer-motion';
import { Lightbulb, Code2, Cpu, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <Lightbulb size={28} />,
    title: 'Pomysł & Koncept',
    desc: 'Wszystko zaczyna się od problemu. Wymyślam szkielet aplikacji i główne ficzery.'
  },
  {
    icon: <Cpu size={28} />,
    title: 'Prompting LLM',
    desc: 'Używam modeli językowych do szybkiego wygenerowania boilerplate\'u i powtarzalnego kodu.'
  },
  {
    icon: <Code2 size={28} />,
    title: 'AntiGravity Build',
    desc: 'Integruję wygenerowane moduły za pomocą frameworka AntiGravity, skupiając się na logice.'
  },
  {
    icon: <Rocket size={28} />,
    title: 'Testy & Deploy',
    desc: 'Szybkie testy na urządzeniu, optymalizacja i publikacja gotowej aplikacji.'
  }
];

const Workflow = () => {
  return (
    <section className="section" id="workflow">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Jak buduję z AI?</h2>
          
          <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem)' }}>
            
            <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '4rem', color: 'var(--text-main)', fontWeight: 500 }}>
              Tradycyjny development jest świetny, ale jako hobbysta postawiłem na nowoczesny workflow, który pozwala mi dowozić projekty z prędkością światła.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
                >
                  <div className="flex-center" style={{ 
                    minWidth: '70px', 
                    height: '70px', 
                    borderRadius: '20px', 
                    background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(244, 63, 94, 0.1))',
                    border: '1px solid var(--accent-glow)',
                    color: 'var(--accent-color)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                  }}>
                    {step.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#fff' }}>{step.title}</h4>
                    <p className="text-muted" style={{ fontSize: '1.05rem' }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: '4rem', padding: '2rem', background: 'rgba(5, 5, 8, 0.5)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <Code2 size={20} color="var(--text-muted)" /> <span className="text-muted" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>Przykładowy prompt</span>
              </div>
              <code style={{ color: '#a78bfa', fontFamily: 'var(--font-mono)', fontSize: '1rem', lineHeight: 1.6, display: 'block' }}>
                "Napisz moduł w Kotlinie do śledzenia czasu spędzanego w apkach. Użyj AccessibilityService. Podaj gotowy boilerplate z obsługą uprawnień."
              </code>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Workflow;
