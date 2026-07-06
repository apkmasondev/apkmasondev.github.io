import { motion } from 'framer-motion';
import { ExternalLink, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  isApp: boolean;
  isSoon?: boolean;
}

const Projects = () => {
  const { t } = useTranslation();

  const projects: Project[] = [
    {
      title: 'ScrollDebt',
      description: t('projects.items.scrolldebt.desc'),
      image: '/scrolldebt_mockup.webp',
      tags: ['Android', 'Kotlin', 'AntiGravity'],
      link: 'https://apkmasondev.github.io/scrolldebt-site/',
      isApp: true
    },
    {
      title: 'BRIXCORE',
      description: t('projects.items.brixcore.desc'),
      image: '/brixcore_ship.webp',
      tags: ['Web Design', 'AI Generated', 'UI/UX'],
      link: 'https://apkmasondev.github.io/brixcore/',
      isApp: false
    },
    {
      title: 'SKINCARE',
      description: t('projects.items.skincare.desc'),
      image: '/skincare_mockup.webp',
      tags: ['Web Design', '3D Animation', 'Premium'],
      link: 'https://apkmasondev.github.io/skincare_demo/',
      isApp: false
    },
    {
      title: 'Piątunio w Korpo',
      description: t('projects.items.piatunio.desc'),
      image: '/piatunio_mockup.webp',
      tags: ['Android', 'Kotlin Compose', 'Pixel Art'],
      link: 'https://apkmasondev.github.io/piatuniowkorpo/',
      isApp: true
    },
    {
      title: 'Budżet Domowy',
      description: t('projects.items.budzet.desc'),
      image: '/budzet_mockup.webp',
      tags: ['Rust', 'Tauri', 'React', 'SQLite'],
      link: 'https://apkmasondev.github.io/budzet_domowy/',
      isApp: true
    },
    {
      title: 'RecAI',
      description: t('projects.items.recai.desc'),
      image: '/recai_mockup.webp',
      tags: ['Android', 'Kotlin Compose', 'Whisper API', 'GPT-4o', 'Room DB'],
      link: 'https://apkmasondev.github.io/recai_landing_page/',
      isApp: true
    },
    {
      title: 'PCVerse',
      description: t('projects.items.pcverse.desc'),
      image: '/pcverse_mockup.webp',
      tags: ['React', 'Three.js', 'React Three Fiber', 'Tailwind'],
      link: 'https://apkmasondev.github.io/pcverse/',
      isApp: false
    },
    {
      title: 'Top Seven',
      description: t('projects.items.topseven.desc'),
      image: '/top_seven_mockup.webp',
      tags: ['Android', 'Kotlin Compose', 'Material 3'],
      link: 'https://apkmasondev.github.io/topseven/',
      isApp: true
    },
    {
      title: 'Suno AI Music',
      description: t('projects.items.suno.desc'),
      image: '/suno_mockup.webp',
      tags: ['AI Music', 'Suno', 'Audio'],
      link: 'https://suno.com/@kriss8812',
      isApp: false
    },
    {
      title: t('projects.items.soon.title'),
      description: t('projects.items.soon.desc'),
      image: '/coming_soon.webp',
      tags: ['AI Powered'],
      link: '#',
      isApp: false,
      isSoon: true
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
          
          <div className="projects-grid">
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
