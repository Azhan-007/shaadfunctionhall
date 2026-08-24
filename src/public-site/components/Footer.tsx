import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Venue', href: '#venue' },
  { label: 'Events', href: '#events' },
  { label: 'Packages', href: '#packages' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="bg-text-primary text-white/80">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-5">
              <span className="text-[17px] font-semibold tracking-[0.2em] text-white">SHAAD</span>
              <span className="block text-[9px] font-medium tracking-[0.3em] uppercase text-white/50 -mt-0.5">Function Hall</span>
            </div>
            <p className="text-[14px] text-white/50 leading-[1.6] max-w-[260px]">
              A premium venue for weddings, receptions, and celebrations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">Explore</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block text-[14px] text-white/60 hover:text-white transition-colors duration-200 no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">Contact</h4>
            <div className="space-y-3">
              <p className="text-[14px] text-white/60">+91 98765 43210</p>
              <p className="text-[14px] text-white/60">Shaad Function Hall</p>
              <p className="text-[14px] text-white/60">Location to be updated</p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">Hours</h4>
            <div className="space-y-3">
              <p className="text-[14px] text-white/60">Monday – Saturday</p>
              <p className="text-[14px] text-white/60">10:00 AM – 8:00 PM</p>
              <p className="text-[14px] text-white/40 mt-4">Sunday by appointment</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[13px] text-white/30">
              © {new Date().getFullYear()} Shaad Function Hall. All rights reserved.
            </p>
            <p className="text-[13px] text-white/30">
              Demo product for discovery purposes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
