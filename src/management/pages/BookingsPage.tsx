import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Plus, Calendar, Users, ChevronRight } from 'lucide-react';

export function BookingsPage() {
  const navigate = useNavigate();
  const bookings = useStore((s) => s.bookings);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent block mb-1">
            Confirmed & Active Reservations
          </span>
          <h1 className="text-[28px] lg:text-[36px] font-light text-text-primary">
            Event Bookings
          </h1>
        </div>

        <button
          onClick={() => navigate('/manage/bookings/new')}
          className="h-[42px] px-5 bg-primary text-white text-[13px] font-medium rounded-xl hover:bg-primary-deep transition-colors cursor-pointer border-0 shadow-sm flex items-center gap-2"
        >
          <Plus size={16} /> Create Booking
        </button>
      </div>

      {/* Bookings List Table / Editorial Cards */}
      <div className="bg-white rounded-2xl border border-border/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-border/60 flex items-center justify-between bg-background/40">
          <span className="text-[13px] font-semibold text-text-secondary">
            Showing {bookings.length} Bookings
          </span>
        </div>

        <div className="divide-y divide-border/60">
          {bookings.map((booking) => {
            const dateFormatted = new Date(booking.eventDate).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div
                key={booking.id}
                onClick={() => navigate(`/manage/bookings/${booking.id}`)}
                className="p-5 hover:bg-soft-rose/20 transition-colors duration-150 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-soft-rose flex flex-col items-center justify-center text-primary font-bold flex-shrink-0">
                    <span className="text-[15px]">{booking.customerName.charAt(0)}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-[16px] font-semibold text-text-primary group-hover:text-primary transition-colors">
                        {booking.customerName}
                      </h3>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-soft-rose text-primary border border-primary/10">
                        {booking.eventType}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[13px] text-text-secondary mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} className="text-muted" /> {dateFormatted}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} className="text-muted" /> {booking.guestCount} Guests
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-border/40">
                  <div className="text-right">
                    <p className="text-[14px] font-bold text-text-primary">
                      ₹{booking.totalAmount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[12px] text-text-secondary">
                      {booking.remainingAmount > 0 ? (
                        <span className="text-amber-700 font-medium">Due: ₹{booking.remainingAmount.toLocaleString('en-IN')}</span>
                      ) : (
                        <span className="text-emerald-700 font-medium">Fully Settled</span>
                      )}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                      booking.bookingStatus === 'Completed'
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>

                  <ChevronRight size={18} className="text-muted group-hover:text-primary transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
