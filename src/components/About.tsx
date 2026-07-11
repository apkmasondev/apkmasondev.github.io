import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  
  const skills = [
    { name: t('about.skills.android'), level: 75 },
    { name: t('about.skills.prompting'), level: 95 },
    { name: t('about.skills.antigravity'), level: 90 },
    { name: t('about.skills.webdesign'), level: 85 },
    { name: t('about.skills.codex'), level: 80 },
    { name: t('about.skills.copilot'), level: 80 },
    { name: t('about.skills.excel'), level: 85 },
    { name: t('about.skills.google'), level: 100 }
  ];
  return (
    <section className="section" id="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('about.title')}</h2>
          
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
                <img src="/profile.jpg" alt="Krzysztof" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,8,0.8), transparent)' }}></div>
              </div>
            </div>

            {/* Bio & Skills Bento Boxes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div className="glass-card">
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                  <Trans i18nKey="about.subtitle" components={{ 1: <span className="text-gradient" /> }} />
                </h3>
                <p className="text-muted mb-2">
                  {t('about.p1')}
                </p>
                <p className="text-muted">
                  <Trans i18nKey="about.p2" components={{ 1: <strong /> }} />
                </p>
              </div>

              <div className="glass-card">
                <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'white' }}>{t('about.stackTitle')}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
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
