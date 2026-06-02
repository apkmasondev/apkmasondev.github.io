import { Mail, Code2, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 0 2rem 0', marginTop: '4rem', background: '#050508' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', marginBottom: '3rem' }}>
          
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <img src="/apkmason_logo_premium.png" alt="ApkMason.dev Logo" loading="lazy" style={{ height: '32px', width: '32px', objectFit: 'cover', borderRadius: '50%' }} />
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}><span className="text-gradient">ApkMason</span><span style={{ color: 'white', fontSize: '0.7em', opacity: 0.9 }}>.dev</span></span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {t('footer.subtitle')}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem' }}>
            <div style={{ flex: '1 1 200px' }}>
              <h4 style={{ color: 'white', marginBottom: '1.2rem', fontSize: '1.1rem' }}>{t('footer.contact')}</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li>
                  <a href="mailto:apkmason.dev@gmail.com" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <Mail size={16} aria-hidden="true" /> apkmason.dev@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://github.com/apkmasondev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <Code2 size={16} aria-hidden="true" /> GitHub Profile
                  </a>
                </li>
                <li>
                  <a href="https://play.google.com/store/apps/dev?id=apkmason" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <Smartphone size={16} aria-hidden="true" /> Google Play
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
        
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          marginTop: '3rem', 
          paddingTop: '2rem', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          color: 'var(--text-muted)',
          fontSize: '0.9rem'
        }}>
          <p>&copy; {new Date().getFullYear()} ApkMason.dev. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span>{t('footer.builtWith')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
