import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Calendar, AlertCircle, ArrowRight, CheckCircle2, DollarSign, Sparkles } from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const bookings = useStore((s) => s.bookings);
  const enquiries = useStore((s) => s.enquiries);
  const payments = useStore((s) => s.payments);

  // Filter upcoming & active events
  const upcomingEvents = bookings
    .filter((b) => b.bookingStatus !== 'Completed')
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  const pendingEnquiries = enquiries.filter((e) => e.status === 'New' || e.status === 'Contacted');
  
  const totalOutstanding = bookings.reduce((acc, b) => acc + b.remainingAmount, 0);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Top Banner / Greeting */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent block mb-1">
            Shaad Function Hall Operational Portal
          </span>
          <h1 className="text-[28px] lg:text-[36px] font-light text-text-primary">
            Good evening.
          </h1>
          <p className="text-[15px] text-text-secondary mt-1">
            Here's what's happening across your upcoming events.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/manage/calendar')}
            className="h-[40px] px-4 bg-white border border-border text-[13px] font-medium text-text-primary rounded-xl hover:bg-soft-rose/50 transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <Calendar size={16} className="text-primary" /> View Calendar
          </button>
          <button
            onClick={() => navigate('/manage/bookings/new')}
            className="h-[40px] px-5 bg-primary text-white text-[13px] font-medium rounded-xl hover:bg-primary-deep transition-colors cursor-pointer border-0 shadow-sm"
          >
            + Create Booking
          </button>
        </div>
      </div>

      {/* HERO OF DASHBOARD: UPCOMING EVENTS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <h2 className="text-[18px] lg:text-[22px] font-medium text-text-primary">
              Upcoming Events
            </h2>
          </div>
          <button
            onClick={() => navigate('/manage/bookings')}
            className="text-[13px] font-medium text-primary hover:underline bg-transparent border-0 cursor-pointer flex items-center gap-1"
          >
            All Bookings <ArrowRight size={14} />
          </button>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-border/80">
            <p className="text-[15px] text-text-secondary">No upcoming events scheduled right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingEvents.map((event) => {
              const dateObj = new Date(event.eventDate);
              const dayStr = dateObj.getDate();
              const monthStr = dateObj.toLocaleString('en-IN', { month: 'short' }).toUpperCase();
              
              return (
                <div
                  key={event.id}
                  onClick={() => navigate(`/manage/bookings/${event.id}`)}
                  className="bg-white rounded-2xl p-6 border border-border/80 hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      {/* Date Badge */}
                      <div className="w-[52px] h-[58px] bg-soft-rose rounded-xl flex flex-col items-center justify-center text-primary font-bold flex-shrink-0 border border-primary/10">
                        <span className="text-[18px] leading-none">{dayStr}</span>
                        <span className="text-[10px] tracking-wider uppercase mt-1 leading-none">{monthStr}</span>
                      </div>
                      <div>
                        <h3 className="text-[16px] font-semibold text-text-primary group-hover:text-primary transition-colors">
                          {event.customerName}
                        </h3>
                        <p className="text-[13px] font-medium text-text-secondary">{event.eventType}</p>
                      </div>
                    </div>
                    
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {event.bookingStatus}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-border/50 flex items-center justify-between text-[13px] text-text-secondary">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={14} className="text-accent" /> {event.guestCount} Guests
                    </span>
                    <span className="font-semibold text-text-primary">
                      {event.remainingAmount > 0 ? (
                        <span className="text-amber-700 font-medium">Due: ₹{event.remainingAmount.toLocaleString('en-IN')}</span>
                      ) : (
                        <span className="text-emerald-700 font-medium">Fully Paid</span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* SECONDARY: NEEDS ATTENTION */}
      <section className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-amber-600" />
            <h2 className="text-[18px] font-medium text-text-primary">Needs Attention</h2>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-border/80 space-y-3">
            {pendingEnquiries.length > 0 && (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-[13px] font-bold">
                    {pendingEnquiries.length}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-text-primary">
                      {pendingEnquiries.length} Pending {pendingEnquiries.length === 1 ? 'Enquiry' : 'Enquiries'}
                    </p>
                    <p className="text-[12px] text-text-secondary">Require response or quotation</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/manage/enquiries')}
                  className="px-3 py-1.5 bg-white text-[12px] font-semibold text-amber-900 border border-amber-300 rounded-lg hover:bg-amber-100/50 cursor-pointer"
                >
                  View Pipeline
                </button>
              </div>
            )}

            {totalOutstanding > 0 && (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-soft-rose/40 border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-soft-rose flex items-center justify-center text-primary font-bold">
                    <DollarSign size={16} />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-text-primary">
                      ₹{totalOutstanding.toLocaleString('en-IN')} Outstanding Balance
                    </p>
                    <p className="text-[12px] text-text-secondary">Across active upcoming bookings</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/manage/payments')}
                  className="px-3 py-1.5 bg-white text-[12px] font-semibold text-primary border border-primary/20 rounded-lg hover:bg-soft-rose cursor-pointer"
                >
                  Payments
                </button>
              </div>
            )}

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-text-primary">Venue Prep Checklist</p>
                  <p className="text-[12px] text-text-secondary">Sound & illumination checks for upcoming wedding</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/manage/events')}
                className="px-3 py-1.5 bg-white text-[12px] font-semibold text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                Prep Work
              </button>
            </div>
          </div>
        </div>

        {/* TERTIARY: RESTRAINED METRICS */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-[18px] font-medium text-text-primary">Quick Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-border/80">
              <p className="text-[12px] font-medium text-text-secondary uppercase tracking-wider">Upcoming Events</p>
              <p className="text-[28px] font-light text-primary mt-1">{upcomingEvents.length}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-border/80">
              <p className="text-[12px] font-medium text-text-secondary uppercase tracking-wider">Active Enquiries</p>
              <p className="text-[28px] font-light text-amber-700 mt-1">{enquiries.length}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-border/80">
              <p className="text-[12px] font-medium text-text-secondary uppercase tracking-wider">Total Bookings</p>
              <p className="text-[28px] font-light text-text-primary mt-1">{bookings.length}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-border/80">
              <p className="text-[12px] font-medium text-text-secondary uppercase tracking-wider">Payments Logged</p>
              <p className="text-[28px] font-light text-emerald-700 mt-1">{payments.length}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
