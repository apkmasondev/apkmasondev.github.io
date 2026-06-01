import { Code2, Mail, Smartphone } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 0 2rem 0', marginTop: '4rem', background: '#050508' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', marginBottom: '3rem' }}>
          
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <img src="/apkmason_logo_premium.png" alt="Logo" style={{ height: '30px', width: '30px', objectFit: 'cover', borderRadius: '50%' }} />
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}><span className="text-gradient">ApkMason</span><span style={{ color: 'white', fontSize: '0.7em', opacity: 0.9 }}>.dev</span></span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Tworzę aplikacje szybciej, mądrzej i z wykorzystaniem AI.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem' }}>
            <div>
              <h4 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1rem' }}>Kontakt</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li>
                  <a href="mailto:apkmason.dev@gmail.com" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <Mail size={16} /> apkmason.dev@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://github.com/apkmasondev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <Code2 size={16} /> GitHub Profile
                  </a>
                </li>
                <li>
                  <a href="https://play.google.com/store/apps/dev?id=apkmason" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <Smartphone size={16} /> Google Play
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} ApkMason.dev — Built with Vite & React.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
