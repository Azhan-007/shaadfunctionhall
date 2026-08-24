import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { PartyPopper, CheckSquare, Square, Sparkles } from 'lucide-react';

export function EventsPage() {
  const bookings = useStore((s) => s.bookings);

  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'venue-setup': true,
    'decor-floral': true,
    'sound-lighting': false,
    'catering-prep': false,
    'valet-parking': false,
  });

  const toggleCheck = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeEvents = bookings.filter((b) => b.bookingStatus !== 'Completed');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent block mb-1">
            Operations & Execution
          </span>
          <h1 className="text-[28px] lg:text-[36px] font-light text-text-primary">
            Event Preparation Workspace
          </h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Active Events Overview */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-[18px] font-medium text-text-primary">Upcoming Event Schedules</h2>
          <div className="space-y-4">
            {activeEvents.map((ev) => (
              <div key={ev.id} className="bg-white rounded-2xl p-6 border border-border/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-soft-rose flex items-center justify-center text-primary font-bold">
                      <PartyPopper size={18} />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-semibold text-text-primary">{ev.customerName}</h3>
                      <p className="text-[12.5px] text-text-secondary">{ev.eventType} • {ev.guestCount} Guests</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {ev.bookingStatus}
                  </span>
                </div>

                <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[13px]">
                  <span className="text-text-secondary">Date: {ev.eventDate}</span>
                  <span className="text-primary font-medium">Package: {ev.packageType || 'Standard'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Checklist */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-border/80 shadow-xs space-y-5">
          <h2 className="text-[16px] font-semibold text-text-primary border-b border-border/60 pb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-accent" /> Venue Preparation Checklist
          </h2>

          <div className="space-y-3">
            {[
              { id: 'venue-setup', label: 'Hall Sanitation & Seating Layout' },
              { id: 'decor-floral', label: 'Stage Decoration & Floral Arrangements' },
              { id: 'sound-lighting', label: 'Acoustic Sound Check & Ambient Uplighting' },
              { id: 'catering-prep', label: 'Dining Area & Buffet Counter Setup' },
              { id: 'valet-parking', label: 'Parking & Security Briefing' },
            ].map((item) => {
              const checked = checklist[item.id] || false;
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    checked ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-background border-border text-text-primary hover:bg-soft-rose/30'
                  }`}
                >
                  {checked ? <CheckSquare size={18} className="text-emerald-700" /> : <Square size={18} className="text-muted" />}
                  <span className={`text-[13.5px] font-medium ${checked ? 'line-through opacity-80' : ''}`}>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
