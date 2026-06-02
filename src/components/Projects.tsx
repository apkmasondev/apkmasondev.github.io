import { motion } from 'framer-motion';
import { ExternalLink, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: 'ScrollDebt',
      description: t('projects.items.scrolldebt.desc'),
      image: '/scrolldebt_mockup.png',
      tags: ['Android', 'Kotlin', 'AntiGravity'],
      link: 'https://apkmasondev.github.io/scrolldebt-site/',
      isApp: true
    },
    {
      title: 'BRIXCORE',
      description: t('projects.items.brixcore.desc'),
      image: '/brixcore_ship.png',
      tags: ['Web Design', 'AI Generated', 'UI/UX'],
      link: 'https://apkmasondev.github.io/brixcore/',
      isApp: false
    },
    {
      title: t('projects.items.soon.title'),
      description: t('projects.items.soon.desc'),
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000',
      tags: ['AI Powered'],
      link: '#',
      isApp: false
    }
  ];

  return (
    <section className="section" id="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('projects.title')}</h2>
          
          <div className="responsive-grid">
            {projects.map((project, idx) => (
              <motion.div 
                key={idx}
                className="glass-card"
                whileHover={{ y: -10 }}
                style={{ display: 'flex', flexDirection: 'column', padding: 0 }}
              >
                <div style={{ width: '100%', height: '240px', background: 'rgba(0,0,0,0.5)', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    style={{ 
                      width: '100%', height: '100%', 
                      objectFit: 'cover', 
                      padding: '0',
                      transition: 'transform 0.5s ease'
                    }} 
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, var(--bg-card))' }}></div>
                </div>

                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    {project.tags.map(tag => (
                      <span key={tag} className="mono-tag" style={{ fontSize: '0.75rem', borderColor: 'var(--accent-glow)', color: 'var(--accent-color)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>{project.title}</h3>
                  <p className="text-muted mb-4" style={{ flexGrow: 1 }}>
                    {project.description}
                  </p>

                  {project.link !== '#' ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ alignSelf: 'flex-start', padding: '0.6rem 1.2rem', fontSize: '0.95rem' }}>
                      {project.isApp ? <><Smartphone size={18} aria-hidden="true" /> {t('projects.btnApp')}</> : <><ExternalLink size={18} aria-hidden="true" /> {t('projects.btnDetails')}</>}
                    </a>
                  ) : (
                    <span className="btn btn-secondary" style={{ alignSelf: 'flex-start', padding: '0.6rem 1.2rem', fontSize: '0.95rem', opacity: 0.5, cursor: 'not-allowed' }}>
                      {t('projects.btnSoon')}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
