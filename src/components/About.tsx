import { motion } from 'framer-motion';

const skills = [
  { name: 'Środowisko Android Studio', level: 75 },
  { name: 'AI Prompting (Claude / ChatGPT)', level: 95 },
  { name: 'AntiGravity Framework', level: 90 },
  { name: 'MS Excel – zaawansowana obsługa z AI', level: 85 },
  { name: 'Microsoft Copilot Studio', level: 80 },
  { name: 'Google Umiejętności Jutra 2.0', level: 100 }
];

const About = () => {
  return (
    <section className="section" id="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">O Mnie</h2>
          
          <div className="responsive-grid" style={{ alignItems: 'stretch' }}>
            
            {/* Photo Bento Box */}
            <div className="glass-card flex-center" style={{ padding: '1rem', minHeight: '400px' }}>
              <div style={{ 
                width: '100%', 
                height: '100%',
                borderRadius: '16px', 
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img src="/profile.jpg" alt="Krzysztof" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,8,0.8), transparent)' }}></div>
                <h3 style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', fontSize: '1.5rem', fontWeight: 800 }}>Krzysztof</h3>
              </div>
            </div>

            {/* Bio & Skills Bento Boxes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div className="glass-card">
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                  Lider na co dzień, <span className="text-gradient">kreator AI</span> po godzinach.
                </h3>
                <p className="text-muted mb-2">
                  Na co dzień pracuję w prężnie działającej korporacji w branży e-commerce, gdzie jako lider zarządzam dużym zespołem techników. Kiedy zamykam służbowego laptopa, zanurzam się w nieskończonych możliwościach sztucznej inteligencji.
                </p>
                <p className="text-muted">
                  Ogromną inspiracją stało się dla mnie ukończenie programu szkoleniowego <strong>Google Umiejętności Jutra 2.0</strong>. To właśnie ono napędziło mnie do eksperymentów. Dziś, dzięki wsparciu potężnych modeli językowych i asystenta AI AntiGravity, płynnie poruszam się w środowisku Android Studio i błyskawicznie dowożę gotowe projekty.
                </p>
              </div>

              <div className="glass-card">
                <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'white' }}>Mój Stack / Umiejętności</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {skills.map(skill => (
                    <div key={skill.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                        <span style={{ color: '#e2e8f0' }}>{skill.name}</span>
                        <span style={{ color: 'var(--accent-color)' }}>{skill.level}%</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-secondary), var(--accent-color))', borderRadius: '10px' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
