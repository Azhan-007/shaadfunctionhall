import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Venue', href: '#venue' },
  { label: 'Events', href: '#events' },
  { label: 'Packages', href: '#packages' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_var(--color-border)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px] lg:h-[80px]">
            {/* Brand */}
            <Link to="/" className="flex flex-col">
              <span
                className={`text-[15px] lg:text-[17px] font-semibold tracking-[0.2em] transition-colors duration-300 ${
                  scrolled ? 'text-text-primary' : 'text-white'
                }`}
              >
                SHAAD
              </span>
              <span
                className={`text-[9px] lg:text-[10px] font-medium tracking-[0.3em] uppercase -mt-0.5 transition-colors duration-300 ${
                  scrolled ? 'text-text-secondary' : 'text-white/70'
                }`}
              >
                Function Hall
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-200 bg-transparent border-0 cursor-pointer ${
                    scrolled
                      ? 'text-text-secondary hover:text-primary'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-6">
              <Link
                to="/manage"
                className={`hidden md:inline-flex items-center text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-200 cursor-pointer no-underline ${
                  scrolled
                    ? 'text-text-secondary hover:text-primary'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Staff Portal
              </Link>
              <button
                onClick={() => navigate('/enquiry')}
                className={`hidden sm:inline-flex items-center h-[40px] px-6 text-[12px] font-semibold tracking-[0.1em] uppercase rounded-full transition-all duration-200 cursor-pointer border-0 ${
                  scrolled
                    ? 'bg-primary text-white hover:bg-primary-deep'
                    : 'bg-white/15 text-white backdrop-blur-sm border border-white/30 hover:bg-white/25'
                }`}
              >
                Check Availability
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className={`lg:hidden p-2 transition-colors bg-transparent border-0 cursor-pointer ${
                  scrolled ? 'text-text-primary' : 'text-white'
                }`}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100]" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="absolute right-0 top-0 bottom-0 w-[320px] bg-white animate-slide-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold tracking-[0.2em] text-text-primary">SHAAD</span>
                <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-text-secondary -mt-0.5">Function Hall</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-text-secondary bg-transparent border-0 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-[15px] font-medium text-text-primary py-3 px-4 rounded-lg hover:bg-soft-rose transition-colors duration-150 bg-transparent border-0 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-6 pt-6 border-t border-border flex flex-col gap-3">
                <button
                  onClick={() => { setMobileOpen(false); navigate('/enquiry'); }}
                  className="w-full h-[48px] bg-primary text-white text-[13px] font-semibold tracking-[0.1em] uppercase rounded-full hover:bg-primary-deep transition-colors duration-200 border-0 cursor-pointer"
                >
                  Check Availability
                </button>
                <button
                  onClick={() => { setMobileOpen(false); navigate('/manage'); }}
                  className="w-full h-[48px] bg-transparent text-text-secondary hover:text-primary text-[13px] font-semibold tracking-[0.1em] uppercase rounded-full border border-border hover:border-primary transition-colors duration-200 cursor-pointer"
                >
                  Staff Portal
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
