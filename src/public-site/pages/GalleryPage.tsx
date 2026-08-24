import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const galleryItems = [
  { src: '/images/hero-venue.jpg', title: 'Grand Ballroom', subtitle: 'Main Event Space', span: 'col-span-2 row-span-2' },
  { src: '/images/venue-showcase.jpg', title: 'Stage Setup', subtitle: 'Floral & Draping', span: 'col-span-1 row-span-1' },
  { src: '/images/wedding-event.jpg', title: 'Wedding Reception', subtitle: 'Table Arrangement', span: 'col-span-1 row-span-2' },
  { src: '/images/reception-event.jpg', title: 'Dinner Setup', subtitle: 'Ambient Lighting', span: 'col-span-2 row-span-1' },
];

export function GalleryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-[100px] pb-20 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-[13px] font-medium text-text-secondary hover:text-primary transition-colors mb-8 bg-transparent border-0 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-accent text-[12px] font-medium tracking-[0.2em] uppercase">Gallery</span>
          </div>
          <h1 className="text-[36px] lg:text-[48px] font-light text-text-primary leading-[1.15]">
            The Shaad <span className="italic">Visual Experience</span>
          </h1>
          <p className="text-[16px] text-text-secondary mt-3 max-w-[540px]">
            Explore our versatile spaces, custom stage setups, and dining arrangements for memorable occasions.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[240px]">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className={`${item.span} relative rounded-2xl overflow-hidden group cursor-pointer border border-border/40 shadow-sm`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-medium text-[18px]">{item.title}</p>
                <p className="text-white/70 text-[13px]">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
