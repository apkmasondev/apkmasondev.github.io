import { motion } from 'framer-motion';
import { Lightbulb, Code2, Cpu, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <Lightbulb size={24} />,
    title: 'Pomysł & Koncept',
    desc: 'Wszystko zaczyna się od problemu. Wymyślam szkielet aplikacji i główne ficzery.'
  },
  {
    icon: <Cpu size={24} />,
    title: 'Prompting LLM',
    desc: 'Używam modeli językowych do szybkiego wygenerowania boilerplate\'u i powtarzalnego kodu.'
  },
  {
    icon: <Code2 size={24} />,
    title: 'AntiGravity Build',
    desc: 'Integruję wygenerowane moduły za pomocą frameworka AntiGravity, skupiając się na logice.'
  },
  {
    icon: <Rocket size={24} />,
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
          
          <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--bg-card)', padding: '3rem', borderRadius: '20px', border: '1px solid var(--border-color)', backdropFilter: 'blur(10px)' }}>
            
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
              Tradycyjny development jest świetny, ale jako hobbysta z ograniczonym czasem, postawiłem na nowoczesny workflow, który pozwala mi dowozić projekty z prędkością światła.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
                >
                  <div style={{ 
                    minWidth: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    background: 'rgba(244, 63, 94, 0.1)', 
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--accent-color)'
                  }}>
                    {step.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>{step.title}</h4>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                <Code2 size={16} /> <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>Przykładowy prompt</span>
              </div>
              <code style={{ color: '#a78bfa', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>
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
