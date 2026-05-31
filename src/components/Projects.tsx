import { motion } from 'framer-motion';
import { ExternalLink, Smartphone } from 'lucide-react';

const projects = [
  {
    title: 'ScrollDebt',
    description: 'Aplikacja zamieniająca bezmyślne doomscrolling w brutalne przebudzenie. Śledzi zmarnowany czas, wytyka wady za pomocą "Brutal Truth" i pomaga odzyskać kontrolę nad życiem. Zero zbierania danych, 100% offline.',
    image: '/scrolldebt_mockup.png', // The image we copied
    tags: ['Android', 'Kotlin', 'AntiGravity'],
    link: 'https://apkmasondev.github.io/scrolldebt-site/',
    isApp: true
  },
  // Add space for future projects here
  {
    title: 'Coming Soon',
    description: 'Kolejna innowacyjna aplikacja rozwijana przy pomocy sztucznej inteligencji. Więcej szczegółów wkrótce...',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000',
    tags: ['AI Powered'],
    link: '#',
    isApp: false
  }
];

const Projects = () => {
  return (
    <section className="section" id="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Projekty & Aplikacje</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '2rem' }}>
            {projects.map((project, idx) => (
              <motion.div 
                key={idx}
                className="card"
                whileHover={{ y: -10 }}
                style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
              >
                <div style={{ width: '100%', height: '240px', background: '#151520', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: project.isApp ? 'contain' : 'cover', padding: project.isApp ? '1rem' : '0' }} 
                  />
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent, var(--bg-card))' }}></div>
                </div>

                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent-color)', borderRadius: '20px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>{project.title}</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flexGrow: 1, lineHeight: 1.6 }}>
                    {project.description}
                  </p>

                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ alignSelf: 'flex-start', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                    {project.isApp ? <><Smartphone size={16} /> Strona Aplikacji</> : <><ExternalLink size={16} /> Zobacz szczegóły</>}
                  </a>
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
