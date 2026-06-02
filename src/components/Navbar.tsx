import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
  };

  const LanguageSwitcher = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
      <Globe size={16} color="var(--text-muted)" aria-hidden="true" />
      <button 
        onClick={() => changeLanguage('pl')} 
        style={{ background: 'none', border: 'none', color: i18n.language === 'pl' ? 'var(--accent-color)' : 'var(--text-muted)', fontWeight: i18n.language === 'pl' ? 'bold' : 'normal', cursor: 'pointer', padding: 0 }}
      >
        PL
      </button>
      <span style={{ color: 'var(--text-muted)' }}>|</span>
      <button 
        onClick={() => changeLanguage('en')} 
        style={{ background: 'none', border: 'none', color: i18n.language.startsWith('en') ? 'var(--accent-color)' : 'var(--text-muted)', fontWeight: i18n.language.startsWith('en') ? 'bold' : 'normal', cursor: 'pointer', padding: 0 }}
      >
        EN
      </button>
    </div>
  );

  const navStyle = {
    background: (isScrolled || mobileMenuOpen) ? 'rgba(5, 5, 8, 0.95)' : 'transparent',
    backdropFilter: (isScrolled || mobileMenuOpen) ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: (isScrolled || mobileMenuOpen) ? 'blur(20px)' : 'none',
    boxShadow: (isScrolled || mobileMenuOpen) ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none',
    transition: 'all 0.3s ease'
  };

  return (
    <nav className="navbar" style={navStyle}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <a href="#" className="logo" aria-label="Strona główna" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/apkmason_logo_premium.png" alt="ApkMason.dev Logo" style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: '50%' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}><span className="text-gradient">ApkMason</span><span style={{ color: 'white', fontSize: '0.7em', opacity: 0.9 }}>.dev</span></span>
        </a>

        {/* Desktop Menu & Switcher */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <a href="#about">{t('navbar.about')}</a>
          <a href="#projects">{t('navbar.projects')}</a>
          <a href="#workflow">{t('navbar.workflow')}</a>
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Toggle & Switcher */}
        <div className="mobile-menu-btn-container" style={{ display: 'none', alignItems: 'center', gap: '1rem' }}>
          <LanguageSwitcher />
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? "Zamknij menu" : "Otwórz menu"} style={{ display: 'block' }}>
            {mobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0' }}>{t('navbar.about')}</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0' }}>{t('navbar.projects')}</a>
            <a href="#workflow" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0' }}>{t('navbar.workflow')}</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
