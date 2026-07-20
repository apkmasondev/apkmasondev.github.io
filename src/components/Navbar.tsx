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

  const LanguageSwitcher = () => {
    const isPl = i18n.language && i18n.language.startsWith('pl');
    return (
      <button 
        onClick={() => changeLanguage(isPl ? 'en' : 'pl')}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.9rem',
          background: 'none',
          border: 'none',
          color: 'var(--text-main)',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <Globe size={16} color="var(--accent-color)" aria-hidden="true" />
        <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>{isPl ? 'EN' : 'PL'}</span>
      </button>
    );
  };

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
        <a href="#" className="logo" aria-label={t('navbar.ariaHome')} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.svg" alt="ApkMason.dev Logo" style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: '50%' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}><span className="text-gradient">ApkMason</span><span style={{ color: 'white', fontSize: '0.7em', opacity: 0.9 }}>.dev</span></span>
        </a>

        {/* Desktop Menu & Switcher */}
        <div className="nav-links">
          <a href="#about">{t('navbar.about')}</a>
          <a href="#projects">{t('navbar.projects')}</a>
          <a href="#workflow">{t('navbar.workflow')}</a>
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-btn-container" style={{ display: 'none' }}>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? t('navbar.ariaMenuClose') : t('navbar.ariaMenuOpen')} style={{ display: 'block' }}>
            {mobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0' }}>{t('navbar.about')}</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0' }}>{t('navbar.projects')}</a>
            <a href="#workflow" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0' }}>{t('navbar.workflow')}</a>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
