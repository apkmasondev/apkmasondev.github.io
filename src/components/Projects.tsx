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
  isWide?: boolean;
}

const Projects = () => {
  const { t } = useTranslation();

  const projects: Project[] = [
    {
      title: 'Sfera',
      description: t('projects.items.sfera.desc'),
      image: '/sfera_mockup.webp',
      tags: ['Three.js', 'Vanilla JS', 'WebGL'],
      link: 'https://apkmasondev.github.io/sfera/',
      isApp: false
    },
    {
      title: 'Poznaj AI',
      description: t('projects.items.poznajai.desc'),
      image: '/poznaj_ai_mockup.webp',
      tags: ['HTML5', 'CSS3', 'Vanilla JS'],
      link: 'https://apkmasondev.github.io/poznaj_ai/',
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
      title: 'PCVerse',
      description: t('projects.items.pcverse.desc'),
      image: '/pcverse_mockup.webp',
      tags: ['React', 'Three.js', 'React Three Fiber', 'Tailwind'],
      link: 'https://apkmasondev.github.io/pcverse/',
      isApp: false
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
      title: 'Budżet Domowy',
      description: t('projects.items.budzet.desc'),
      image: '/budzet_mockup.webp',
      tags: ['Rust', 'Tauri', 'React', 'SQLite'],
      link: 'https://apkmasondev.github.io/budzet_domowy/',
      isApp: true
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
      title: 'SKINCARE',
      description: t('projects.items.skincare.desc'),
      image: '/skincare_mockup.webp',
      tags: ['Web Design', '3D Animation', 'Premium'],
      link: 'https://apkmasondev.github.io/skincare_demo/',
      isApp: false
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
      title: 'ScrollDebt',
      description: t('projects.items.scrolldebt.desc'),
      image: '/scrolldebt_mockup.webp',
      tags: ['Android', 'Kotlin', 'AntiGravity'],
      link: 'https://apkmasondev.github.io/scrolldebt-site/',
      isApp: true
    },
    {
      title: 'Suno AI Music',
      description: t('projects.items.suno.desc'),
      image: '/suno_mockup.webp',
      tags: ['AI Music', 'Suno', 'Audio'],
      link: 'https://suno.com/@kriss8812',
      isApp: false,
      isWide: true
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
                className={`glass-card project-card ${project.isWide ? 'col-span-2' : ''}`}
                whileHover={{ y: -10 }}
              >
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    className="project-image"
                  />
                  <div className="project-image-overlay"></div>
                </div>

                <div className="project-card-content">
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="mono-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3>{project.title}</h3>
                  <p className="text-muted mb-4">
                    {project.description}
                  </p>

                  {project.link !== '#' ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      {project.isApp ? <><Smartphone size={18} aria-hidden="true" /> {t('projects.btnApp')}</> : <><ExternalLink size={18} aria-hidden="true" /> {t('projects.btnDetails')}</>}
                    </a>
                  ) : (
                    <span className="btn btn-secondary disabled">
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
