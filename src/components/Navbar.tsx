import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <a href="#" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/apkmason_logo_premium.png" alt="ApkMason.dev Logo" style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: '50%' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>ApkMason.dev</span>
        </a>

        {/* Desktop Menu */}
        <div className="nav-links">
          <a href="#about">O mnie</a>
          <a href="#projects">Projekty</a>
          <a href="#workflow">Mój Proces (AI)</a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0' }}>O mnie</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0' }}>Projekty</a>
            <a href="#workflow" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0' }}>Mój Proces (AI)</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
