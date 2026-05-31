import { motion } from 'framer-motion';

const skills = [
  { name: 'Android Studio / Kotlin', level: 85 },
  { name: 'AI Prompting (Claude / ChatGPT)', level: 95 },
  { name: 'AntiGravity Framework', level: 90 },
  { name: 'Git & GitHub', level: 80 }
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
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            
            <div style={{ position: 'relative' }}>
              <div style={{ 
                width: '100%', 
                aspectRatio: '1/1', 
                borderRadius: '20px', 
                background: 'linear-gradient(45deg, var(--bg-card), rgba(244, 63, 94, 0.1))',
                border: '2px dashed var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>[ Miejsce na Twoje zdjęcie ]</span>
              </div>
              {/* Decorative elements behind photo */}
              <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100px', height: '100px', borderTop: '4px solid var(--accent-color)', borderLeft: '4px solid var(--accent-color)', borderRadius: '20px 0 0 0', zIndex: -1 }}></div>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '100px', height: '100px', borderBottom: '4px solid var(--accent-color)', borderRight: '4px solid var(--accent-color)', borderRadius: '0 0 20px 0', zIndex: -1 }}></div>
            </div>

            <div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>Hobbysta, który ulepsza rzeczywistość kodem.</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                Programowanie na Androida to moja pasja, którą rozwijam po godzinach etatowej pracy. Nie jestem tradycyjnym programistą klepiącym kod od zera przez miesiące – wykorzystuję nowoczesne narzędzia sztucznej inteligencji i framework AntiGravity.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: 1.8 }}>
                Dzięki AI jestem w stanie przekształcić każdy szalony pomysł w działającą, pełnoprawną aplikację w niezwykle krótkim czasie. Skupiam się na architekturze i logice biznesowej, podczas gdy LLM pomaga mi w pisaniu boilerplate'u.
              </p>

              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#fff' }}>Mój Stack / Umiejętności</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 500 }}>{skill.name}</span>
                        <span style={{ color: 'var(--accent-color)' }}>{skill.level}%</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-color), #ff8a65)', borderRadius: '4px' }}
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
