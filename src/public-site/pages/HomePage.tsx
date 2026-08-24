import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Users, Sparkles, CalendarDays, MapPin, Star, Phone, Clock, ChevronRight } from 'lucide-react';

const eventTypes = [
  { name: 'Weddings', description: 'Your perfect day, beautifully hosted' },
  { name: 'Receptions', description: 'Celebrate with elegance and warmth' },
  { name: 'Engagements', description: 'Mark the beginning in style' },
  { name: 'Nikah', description: 'A sacred ceremony, gracefully arranged' },
  { name: 'Family Celebrations', description: 'Moments that bring everyone together' },
  { name: 'Corporate Events', description: 'Professional gatherings, refined setting' },
];

const venueFeatures = [
  { icon: Sparkles, label: 'Elegant interiors' },
  { icon: Users, label: 'Flexible arrangements' },
  { icon: MapPin, label: 'Convenient location' },
  { icon: CalendarDays, label: 'Event-ready environment' },
];

const galleryImages = [
  { src: '/images/hero-venue.jpg', span: 'col-span-2 row-span-2' },
  { src: '/images/venue-showcase.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/wedding-event.jpg', span: 'col-span-1 row-span-2' },
  { src: '/images/reception-event.jpg', span: 'col-span-2 row-span-1' },
];

const trustPoints = [
  { icon: Star, title: 'Beautiful setting', text: 'A venue designed to make every occasion feel exceptional and memorable.' },
  { icon: Heart, title: 'Personal attention', text: 'Dedicated support to understand your vision and bring it to life.' },
  { icon: CalendarDays, title: 'Flexible arrangements', text: 'Adaptable spaces and services tailored to your event requirements.' },
  { icon: Users, title: 'Dedicated support', text: 'An experienced team to help with planning and coordination.' },
];

export function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-venue.jpg"
            alt="Event venue"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
            <div className="max-w-[680px]">
              {/* Eyebrow */}
              <div className="animate-fade-up stagger-1 flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-accent" />
                <span className="text-accent text-[12px] font-medium tracking-[0.25em] uppercase">
                  Premium Event Venue
                </span>
              </div>

              {/* Headline */}
              <h1 className="animate-fade-up stagger-2 text-white text-[44px] sm:text-[56px] lg:text-[72px] font-light leading-[1.08] tracking-[-0.02em] mb-6">
                Where Your Moments{' '}
                <span className="italic font-light">Become</span>{' '}
                Memories
              </h1>

              {/* Supporting Copy */}
              <p className="animate-fade-up stagger-3 text-white/75 text-[17px] lg:text-[19px] leading-[1.6] font-light max-w-[520px] mb-10">
                An elegant venue for weddings, receptions, and celebrations — 
                designed to make your most important occasions truly unforgettable.
              </p>

              {/* CTAs */}
              <div className="animate-fade-up stagger-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/enquiry')}
                  className="inline-flex items-center justify-center h-[52px] px-8 bg-primary text-white text-[13px] font-semibold tracking-[0.12em] uppercase rounded-full hover:bg-primary-deep transition-all duration-200 border-0 cursor-pointer group"
                >
                  Check Availability
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button
                  onClick={() => {
                    document.querySelector('#venue')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center h-[52px] px-8 bg-transparent text-white text-[13px] font-medium tracking-[0.1em] uppercase rounded-full border border-white/30 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                >
                  Explore the Venue
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in stagger-5">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white/40" />
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 lg:py-8">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {['Weddings', 'Receptions', 'Family Celebrations', 'Flexible Event Arrangements'].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[13px] font-medium tracking-[0.06em] text-text-secondary">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VENUE SHOWCASE ============ */}
      <section id="venue" className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="/images/venue-showcase.jpg"
                  alt="Venue interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating detail */}
              <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white rounded-xl px-6 py-4 shadow-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-soft-rose flex items-center justify-center">
                    <Heart size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-text-primary">Event Ready</p>
                    <p className="text-[12px] text-text-secondary">Every detail considered</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:pl-4">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[1px] bg-accent" />
                <span className="text-accent text-[12px] font-medium tracking-[0.2em] uppercase">The Venue</span>
              </div>
              <h2 className="text-[34px] lg:text-[44px] font-light text-text-primary leading-[1.15] tracking-[-0.01em] mb-6">
                Designed for{' '}
                <span className="italic">memorable</span>{' '}
                occasions
              </h2>
              <p className="text-[17px] text-text-secondary leading-[1.7] mb-8 max-w-[480px]">
                Shaad Function Hall offers an elegant setting where every celebration 
                feels special. From intimate gatherings to grand events, the venue adapts 
                to your vision.
              </p>

              {/* Venue Features */}
              <div className="grid grid-cols-2 gap-4">
                {venueFeatures.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 py-3">
                    <div className="w-9 h-9 rounded-lg bg-soft-rose/70 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <span className="text-[14px] font-medium text-text-primary">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EVENT EXPERIENCES ============ */}
      <section id="events" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14 lg:mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent text-[12px] font-medium tracking-[0.2em] uppercase">Celebrations</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            <h2 className="text-[34px] lg:text-[44px] font-light text-text-primary leading-[1.15] tracking-[-0.01em]">
              Made for every <span className="italic">celebration</span>
            </h2>
          </div>

          {/* Hierarchical Layout — Featured + Grid */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Featured Event */}
            <div className="lg:col-span-7 group cursor-pointer">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5">
                <img
                  src="/images/wedding-event.jpg"
                  alt="Wedding celebration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <span className="text-accent text-[11px] font-medium tracking-[0.2em] uppercase mb-2 block">Featured</span>
                  <h3 className="text-white text-[28px] lg:text-[34px] font-light leading-[1.2]">Weddings</h3>
                  <p className="text-white/70 text-[15px] font-light mt-2 max-w-[400px]">
                    Your perfect day, beautifully hosted in an elegant setting designed for grand celebrations.
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary Events */}
            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4">
              {eventTypes.slice(1, 5).map((event) => (
                <div
                  key={event.name}
                  className="group p-5 lg:p-6 rounded-xl bg-background hover:bg-soft-rose/50 transition-colors duration-200 cursor-pointer"
                >
                  <h3 className="text-[16px] lg:text-[18px] font-medium text-text-primary mb-1.5 group-hover:text-primary transition-colors duration-200">
                    {event.name}
                  </h3>
                  <p className="text-[13px] text-text-secondary leading-[1.5]">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ GALLERY PREVIEW ============ */}
      <section id="gallery" className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[1px] bg-accent" />
                <span className="text-accent text-[12px] font-medium tracking-[0.2em] uppercase">Gallery</span>
              </div>
              <h2 className="text-[34px] lg:text-[44px] font-light text-text-primary leading-[1.15] tracking-[-0.01em]">
                A glimpse of the <span className="italic">experience</span>
              </h2>
            </div>
            <button
              onClick={() => navigate('/gallery')}
              className="hidden lg:inline-flex items-center gap-2 text-[13px] font-medium text-primary tracking-[0.06em] hover:gap-3 transition-all duration-200 bg-transparent border-0 cursor-pointer"
            >
              View Full Gallery <ChevronRight size={16} />
            </button>
          </div>

          {/* Asymmetric Masonry */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[180px] lg:auto-rows-[220px]">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`${img.span} rounded-xl overflow-hidden group cursor-pointer`}
              >
                <img
                  src={img.src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          <div className="lg:hidden mt-8 text-center">
            <button
              onClick={() => navigate('/gallery')}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-primary tracking-[0.06em] bg-transparent border-0 cursor-pointer"
            >
              View Full Gallery <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ============ PACKAGES ============ */}
      <section id="packages" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14 lg:mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent text-[12px] font-medium tracking-[0.2em] uppercase">Packages</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            <h2 className="text-[34px] lg:text-[44px] font-light text-text-primary leading-[1.15] tracking-[-0.01em] mb-4">
              Tailored for your <span className="italic">celebration</span>
            </h2>
            <p className="text-[16px] text-text-secondary max-w-[520px] mx-auto leading-[1.6]">
              Demo packages designed to demonstrate how venue offerings could be presented. 
              Actual packages would be customized for Shaad Function Hall.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-[1100px] mx-auto">
            {/* Essential */}
            <div className="rounded-2xl bg-background p-7 lg:p-8 flex flex-col">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-text-secondary mb-4">Essential</span>
              <h3 className="text-[22px] font-medium text-text-primary mb-3">Simple & Elegant</h3>
              <p className="text-[14px] text-text-secondary leading-[1.6] mb-6">
                Everything you need for an intimate, well-organized celebration.
              </p>
              <div className="space-y-3 mb-8 flex-1">
                {['Venue for up to 150 guests', 'Basic decoration', 'Sound system', 'Event coordination', 'Setup & cleanup'].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-[14px] text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
              <span className="text-[12px] text-muted mb-3">Ideal for family celebrations & birthdays</span>
              <button
                onClick={() => navigate('/enquiry')}
                className="w-full h-[44px] rounded-full border border-border text-[13px] font-medium text-text-primary hover:border-primary hover:text-primary transition-colors duration-200 bg-transparent cursor-pointer"
              >
                Enquire
              </button>
            </div>

            {/* Signature — Featured */}
            <div className="rounded-2xl bg-primary p-7 lg:p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/70 bg-white/10 px-3 py-1 rounded-full">Popular</span>
              </div>
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/60 mb-4">Signature</span>
              <h3 className="text-[22px] font-medium text-white mb-3">Refined & Complete</h3>
              <p className="text-[14px] text-white/70 leading-[1.6] mb-6">
                A curated experience with premium styling and dedicated coordination.
              </p>
              <div className="space-y-3 mb-8 flex-1">
                {['Venue for up to 300 guests', 'Premium decoration', 'Professional sound & lighting', 'Dedicated coordinator', 'VIP room access', 'Catering coordination'].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-[14px] text-white/90">{item}</span>
                  </div>
                ))}
              </div>
              <span className="text-[12px] text-white/50 mb-3">Ideal for engagements, receptions & nikah</span>
              <button
                onClick={() => navigate('/enquiry')}
                className="w-full h-[44px] rounded-full bg-white text-[13px] font-semibold text-primary hover:bg-white/90 transition-colors duration-200 border-0 cursor-pointer"
              >
                Enquire
              </button>
            </div>

            {/* Grand */}
            <div className="rounded-2xl bg-background p-7 lg:p-8 flex flex-col">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-text-secondary mb-4">Grand</span>
              <h3 className="text-[22px] font-medium text-text-primary mb-3">Complete & Luxurious</h3>
              <p className="text-[14px] text-text-secondary leading-[1.6] mb-6">
                The full celebration experience — every detail considered and managed.
              </p>
              <div className="space-y-3 mb-8 flex-1">
                {['Venue for up to 500 guests', 'Luxury decoration & florals', 'Full AV setup', 'Senior event manager', 'Bridal suite & lounges', 'Complete catering management', 'Custom stage design'].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-[14px] text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
              <span className="text-[12px] text-muted mb-3">Ideal for weddings & grand celebrations</span>
              <button
                onClick={() => navigate('/enquiry')}
                className="w-full h-[44px] rounded-full border border-border text-[13px] font-medium text-text-primary hover:border-primary hover:text-primary transition-colors duration-200 bg-transparent cursor-pointer"
              >
                Enquire
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section id="about" className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left — Editorial */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[1px] bg-accent" />
                <span className="text-accent text-[12px] font-medium tracking-[0.2em] uppercase">Why Shaad</span>
              </div>
              <h2 className="text-[34px] lg:text-[44px] font-light text-text-primary leading-[1.15] tracking-[-0.01em] mb-6">
                Every event deserves{' '}
                <span className="italic">exceptional</span> care
              </h2>
              <p className="text-[17px] text-text-secondary leading-[1.7] max-w-[480px]">
                From the first conversation to the final moment of your event, 
                Shaad Function Hall is committed to making your experience seamless 
                and memorable.
              </p>
            </div>

            {/* Right — Trust Points */}
            <div className="space-y-6">
              {trustPoints.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-5">
                  <div className="w-11 h-11 rounded-xl bg-soft-rose/70 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-text-primary mb-1">{title}</h3>
                    <p className="text-[14px] text-text-secondary leading-[1.6]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ AVAILABILITY CTA ============ */}
      <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
        </div>
        <div className="relative z-10 max-w-[700px] mx-auto px-6 lg:px-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-accent text-[12px] font-medium tracking-[0.2em] uppercase">Get Started</span>
            <div className="w-8 h-[1px] bg-accent" />
          </div>
          <h2 className="text-[34px] lg:text-[48px] font-light text-white leading-[1.15] tracking-[-0.01em] mb-5">
            Planning a <span className="italic">celebration</span>?
          </h2>
          <p className="text-[17px] text-white/70 leading-[1.6] mb-10 max-w-[460px] mx-auto">
            Check your preferred date and send us your event details. 
            We'll be in touch to discuss how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/enquiry')}
              className="inline-flex items-center justify-center h-[52px] px-8 bg-white text-primary text-[13px] font-semibold tracking-[0.12em] uppercase rounded-full hover:bg-white/90 transition-all duration-200 border-0 cursor-pointer"
            >
              Check Availability
            </button>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center h-[52px] px-8 bg-transparent text-white text-[13px] font-medium tracking-[0.1em] uppercase rounded-full border border-white/30 hover:bg-white/10 transition-all duration-200 no-underline"
            >
              <Phone size={16} className="mr-2" />
              Speak to Us
            </a>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[1px] bg-accent" />
                <span className="text-accent text-[12px] font-medium tracking-[0.2em] uppercase">Contact</span>
              </div>
              <h2 className="text-[34px] lg:text-[44px] font-light text-text-primary leading-[1.15] tracking-[-0.01em] mb-8">
                We'd love to <span className="italic">hear</span> from you
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-soft-rose/70 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-text-secondary mb-1">Phone / WhatsApp</p>
                    <p className="text-[16px] font-medium text-text-primary">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-soft-rose/70 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-text-secondary mb-1">Address</p>
                    <p className="text-[16px] font-medium text-text-primary">Shaad Function Hall</p>
                    <p className="text-[14px] text-text-secondary">Location details to be updated</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-soft-rose/70 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-text-secondary mb-1">Visiting Hours</p>
                    <p className="text-[16px] font-medium text-text-primary">10:00 AM – 8:00 PM</p>
                    <p className="text-[14px] text-text-secondary">Monday to Saturday</p>
                  </div>
                </div>
              </div>

              <button
                className="mt-8 inline-flex items-center gap-2 h-[44px] px-6 bg-transparent text-primary text-[13px] font-medium tracking-[0.06em] rounded-full border border-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
              >
                <MapPin size={16} />
                Get Directions
              </button>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-2xl bg-background overflow-hidden aspect-[4/3] lg:aspect-auto flex items-center justify-center">
              <div className="text-center px-8">
                <MapPin size={40} className="text-muted mx-auto mb-4" />
                <p className="text-[16px] font-medium text-text-secondary">Map View</p>
                <p className="text-[13px] text-muted mt-1">Location map will be integrated here</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
