import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, User, Users, Sparkles, X } from 'lucide-react';
import type { CalendarDayStatus } from '../../data/seed';

export function CalendarPage() {
  const calendarDays = useStore((s) => s.calendarDays);
  const bookings = useStore((s) => s.bookings);
  const enquiries = useStore((s) => s.enquiries);
  const blockDate = useStore((s) => s.blockDate);
  const unblockDate = useStore((s) => s.unblockDate);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  // Month navigation helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString('en-IN', { month: 'long', year: 'numeric' });

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  // Generate grid days for the month
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const daysGrid: { dateStr: string; dayNum: number; isCurrentMonth: boolean }[] = [];

  // Previous month trailing days
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthDays - i);
    const dateStr = d.toISOString().split('T')[0];
    daysGrid.push({ dateStr, dayNum: prevMonthDays - i, isCurrentMonth: false });
  }

  // Current month days
  for (let d = 1; d <= totalDaysInMonth; d++) {
    // Adjust timezone offset issue for ISO string
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    daysGrid.push({ dateStr, dayNum: d, isCurrentMonth: true });
  }

  // Next month padding days to fill 35 or 42 grid cells
  const remainingCells = (7 - (daysGrid.length % 7)) % 7;
  for (let d = 1; d <= remainingCells; d++) {
    const dateStr = new Date(year, month + 1, d).toISOString().split('T')[0];
    daysGrid.push({ dateStr, dayNum: d, isCurrentMonth: false });
  }

  // Details for side panel
  const selectedDayInfo = selectedDateStr ? calendarDays[selectedDateStr] : null;
  const selectedBooking = selectedDayInfo?.bookingId
    ? bookings.find((b) => b.id === selectedDayInfo.bookingId)
    : null;
  const selectedEnquiry = selectedDayInfo?.enquiryId
    ? enquiries.find((e) => e.id === selectedDayInfo.enquiryId)
    : null;

  const isToday = (dateStr: string) => {
    const t = new Date().toISOString().split('T')[0];
    return dateStr === t;
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent block mb-1">
            Scheduling & Availability
          </span>
          <h1 className="text-[28px] lg:text-[36px] font-light text-text-primary">
            Venue Calendar
          </h1>
        </div>

        {/* Legend & Month Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 text-[12px] font-medium bg-white px-4 py-2 rounded-xl border border-border">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7A284B]" /> Booked
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C49A45]" /> Enquiry
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Blocked
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-border">
            <button
              onClick={prevMonth}
              className="p-1.5 text-text-secondary hover:text-text-primary rounded-lg hover:bg-soft-rose/50 bg-transparent border-0 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-[14px] font-semibold px-2 min-w-[140px] text-center text-text-primary">
              {monthName}
            </span>
            <button
              onClick={nextMonth}
              className="p-1.5 text-text-secondary hover:text-text-primary rounded-lg hover:bg-soft-rose/50 bg-transparent border-0 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
            <button
              onClick={goToday}
              className="px-3 py-1 bg-soft-rose text-primary text-[12px] font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors border-0 cursor-pointer ml-1"
            >
              Today
            </button>
          </div>
        </div>
      </div>

      {/* CALENDAR GRID */}
      <div className="bg-white rounded-2xl border border-border/80 shadow-xs overflow-hidden">
        {/* Day Header Bar */}
        <div className="grid grid-cols-7 border-b border-border/60 bg-background/50 text-[12px] font-semibold text-text-secondary uppercase tracking-widest text-center py-3">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 auto-rows-[100px] lg:auto-rows-[120px] divide-x divide-y divide-border/50 bg-white">
          {daysGrid.map((item, idx) => {
            const dayData = calendarDays[item.dateStr];
            const status: CalendarDayStatus = dayData?.status || 'Available';
            const todayClass = isToday(item.dateStr) ? 'ring-2 ring-primary ring-offset-2 z-10' : '';
            const selectedClass = selectedDateStr === item.dateStr ? 'bg-soft-rose/30 font-semibold' : '';

            // Color themes per status
            let badgeStyle = 'bg-slate-50 text-slate-500 border-slate-200';
            if (status === 'Booked') {
              badgeStyle = 'bg-[#F5E9EE] text-[#7A284B] border-[#7A284B]/20 font-semibold';
            } else if (status === 'Enquiry') {
              badgeStyle = 'bg-[#F7F0DD] text-[#8C6819] border-[#C49A45]/30 font-medium';
            } else if (status === 'Blocked') {
              badgeStyle = 'bg-slate-100 text-slate-500 border-slate-300 line-through';
            }

            return (
              <div
                key={idx}
                onClick={() => setSelectedDateStr(item.dateStr)}
                className={`p-2 lg:p-3 relative transition-all duration-150 cursor-pointer flex flex-col justify-between hover:bg-soft-rose/20 ${
                  !item.isCurrentMonth ? 'opacity-35 bg-slate-50/40' : ''
                } ${todayClass} ${selectedClass}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[13px] lg:text-[14px] font-medium ${
                      isToday(item.dateStr)
                        ? 'w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[12px]'
                        : 'text-text-primary'
                    }`}
                  >
                    {item.dayNum}
                  </span>
                  {status !== 'Available' && (
                    <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full border ${badgeStyle}`}>
                      {status}
                    </span>
                  )}
                </div>

                {/* Day Content summary */}
                <div className="mt-1 space-y-1">
                  {dayData?.customerName && (
                    <div className="text-[12px] font-semibold text-text-primary truncate">
                      {dayData.customerName}
                    </div>
                  )}
                  {dayData?.eventType && (
                    <div className="text-[11px] text-text-secondary truncate">
                      {dayData.eventType} ({dayData.guestCount} guests)
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CONTEXTUAL SIDE PANEL FOR SELECTED DATE */}
      {selectedDateStr && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end"
          onClick={() => setSelectedDateStr(null)}
        >
          <div
            className="w-full max-w-[420px] bg-white h-full p-6 lg:p-8 flex flex-col justify-between shadow-2xl animate-slide-right overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/80 pb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent block">
                    Date Details
                  </span>
                  <h2 className="text-[20px] font-medium text-text-primary mt-0.5">
                    {new Date(selectedDateStr).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedDateStr(null)}
                  className="p-1.5 text-text-secondary hover:text-text-primary bg-transparent border-0 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Status Banner */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-background">
                <span className="text-[13px] font-medium text-text-secondary">Current Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-[12px] font-semibold uppercase tracking-wider ${
                    selectedDayInfo?.status === 'Booked'
                      ? 'bg-soft-rose text-primary border border-primary/20'
                      : selectedDayInfo?.status === 'Enquiry'
                      ? 'bg-soft-gold text-amber-800 border border-amber-300'
                      : selectedDayInfo?.status === 'Blocked'
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {selectedDayInfo?.status || 'Available'}
                </span>
              </div>

              {/* Booking Info if Booked */}
              {selectedBooking && (
                <div className="bg-white rounded-xl border border-border p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <span className="text-[12px] font-bold tracking-wider text-muted uppercase">Confirmed Event</span>
                    <span className="text-[12px] font-semibold text-primary">{selectedBooking.bookingStatus}</span>
                  </div>

                  <div className="space-y-3 text-[14px]">
                    <div className="flex items-center gap-3">
                      <User size={16} className="text-primary" />
                      <span className="font-semibold text-text-primary">{selectedBooking.customerName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles size={16} className="text-accent" />
                      <span>{selectedBooking.eventType} — {selectedBooking.guestCount} Guests</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CalendarIcon size={16} className="text-text-secondary" />
                      <span>Package: {selectedBooking.packageType || 'Custom'}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/50 flex justify-between items-center text-[13px]">
                    <span className="text-text-secondary">Remaining Payment</span>
                    <span className="font-bold text-text-primary">₹{selectedBooking.remainingAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              {/* Enquiry Info if Enquiry */}
              {selectedEnquiry && !selectedBooking && (
                <div className="bg-white rounded-xl border border-border p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <span className="text-[12px] font-bold tracking-wider text-muted uppercase">Pending Enquiry</span>
                    <span className="text-[12px] font-semibold text-amber-700">{selectedEnquiry.status}</span>
                  </div>

                  <div className="space-y-3 text-[14px]">
                    <div className="flex items-center gap-3">
                      <User size={16} className="text-primary" />
                      <span className="font-semibold text-text-primary">{selectedEnquiry.customerName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={16} className="text-text-secondary" />
                      <span>{selectedEnquiry.eventType} — {selectedEnquiry.guestCount} Guests</span>
                    </div>
                  </div>
                </div>
              )}

              {/* If date is Available */}
              {!selectedDayInfo && (
                <div className="p-5 rounded-xl border border-dashed border-border text-center space-y-3 bg-white">
                  <p className="text-[14px] text-text-secondary">No events recorded for this date.</p>
                  <p className="text-[12px] text-muted">You can mark this date as blocked or create a new booking.</p>
                </div>
              )}
            </div>

            {/* Side Panel Footer Actions */}
            <div className="pt-6 border-t border-border/80 space-y-2">
              {selectedDayInfo?.status === 'Blocked' ? (
                <button
                  onClick={() => unblockDate(selectedDateStr)}
                  className="w-full h-[42px] bg-slate-100 text-slate-800 text-[13px] font-semibold rounded-xl hover:bg-slate-200 cursor-pointer border-0"
                >
                  Unblock Date
                </button>
              ) : (
                !selectedBooking && (
                  <button
                    onClick={() => blockDate(selectedDateStr)}
                    className="w-full h-[42px] bg-white border border-border text-slate-700 text-[13px] font-medium rounded-xl hover:bg-slate-50 cursor-pointer"
                  >
                    Block Date
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
