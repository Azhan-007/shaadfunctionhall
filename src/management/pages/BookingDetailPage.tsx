import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  ArrowLeft,
  Calendar,
  Users,
  CheckCircle2,
  DollarSign,
  Sparkles
} from 'lucide-react';
import type { BookingStatus } from '../../data/seed';

export function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const bookings = useStore((s) => s.bookings);
  const updateBookingStatus = useStore((s) => s.updateBookingStatus);
  const recordPayment = useStore((s) => s.recordPayment);

  const booking = bookings.find((b) => b.id === id);

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [payAmount, setPayAmount] = useState<number>(50000);
  const [payNote, setPayNote] = useState('');

  if (!booking) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-text-secondary">Booking not found.</p>
        <button onClick={() => navigate('/manage/bookings')} className="px-4 py-2 bg-primary text-white rounded-xl">
          Back to Bookings
        </button>
      </div>
    );
  }

  const dateFormatted = new Date(booking.eventDate).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleRecordPayment = () => {
    if (payAmount > 0) {
      recordPayment(booking.id, payAmount, 'Partial', payNote || 'Payment recorded from booking detail');
      setPaymentModalOpen(false);
    }
  };

  const stepsList: BookingStatus[] = [
    'Enquiry',
    'Quoted',
    'Advance Paid',
    'Confirmed',
    'Event Preparation',
    'Event Day',
    'Completed',
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Back Navigation & Header */}
      <div>
        <button
          onClick={() => navigate('/manage/bookings')}
          className="inline-flex items-center gap-2 text-[13px] font-medium text-text-secondary hover:text-primary transition-colors mb-4 bg-transparent border-0 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Bookings
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/70">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] lg:text-[36px] font-light text-text-primary">
                {booking.customerName}
              </h1>
              <span className="px-3 py-1 rounded-full text-[12px] font-semibold uppercase bg-soft-rose text-primary border border-primary/20">
                {booking.eventType}
              </span>
            </div>
            <p className="text-[15px] text-text-secondary mt-1 flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar size={16} className="text-primary" /> {dateFormatted}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Users size={16} className="text-accent" /> {booking.guestCount} Guests
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPaymentModalOpen(true)}
              className="h-[42px] px-5 bg-white border border-primary/30 text-primary text-[13px] font-semibold rounded-xl hover:bg-soft-rose/50 cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <DollarSign size={16} /> Record Payment
            </button>
          </div>
        </div>
      </div>

      {/* 2-COLUMN LAYOUT: TIMELINE ON LEFT, PAYMENT & DETAILS ON RIGHT */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: TIMELINE (HERO OF DETAIL VIEW) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 lg:p-8 border border-border/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <h2 className="text-[18px] font-semibold text-text-primary flex items-center gap-2">
              <Sparkles size={18} className="text-accent" /> Event Progress Timeline
            </h2>
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Status: {booking.bookingStatus}
            </span>
          </div>

          {/* Vertical Timeline */}
          <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border/80">
            {stepsList.map((step, idx) => {
              const timelineEntry = booking.timeline.find((t) => t.step === step);
              const isCompleted = timelineEntry?.completed;
              const isCurrent = booking.bookingStatus === step;

              return (
                <div key={step} className="relative flex items-start gap-4 group">
                  {/* Dot icon */}
                  <div
                    className={`absolute -left-[30px] top-0.5 w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] transition-all ${
                      isCompleted
                        ? 'bg-primary text-white ring-4 ring-soft-rose'
                        : isCurrent
                        ? 'bg-accent text-white ring-4 ring-amber-100'
                        : 'bg-white border-2 border-border text-muted'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={13} /> : idx + 1}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-[15px] font-semibold ${
                          isCompleted || isCurrent ? 'text-text-primary' : 'text-muted'
                        }`}
                      >
                        {step}
                      </h3>
                      {timelineEntry?.date && (
                        <span className="text-[12px] text-text-secondary">
                          {new Date(timelineEntry.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      )}
                    </div>
                    {timelineEntry?.description && (
                      <p className="text-[13px] text-text-secondary mt-0.5">{timelineEntry.description}</p>
                    )}

                    {/* Status switcher helper buttons */}
                    {!isCompleted && (
                      <button
                        onClick={() => updateBookingStatus(booking.id, step)}
                        className="mt-2 text-[11px] font-semibold text-primary hover:underline bg-transparent border-0 cursor-pointer"
                      >
                        Mark as Completed →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: FINANCIAL SUMMARY & EVENT SPECIFICS */}
        <div className="lg:col-span-5 space-y-6">
          {/* Payment Card */}
          <div className="bg-white rounded-2xl p-6 border border-border/80 shadow-xs space-y-5">
            <h2 className="text-[16px] font-semibold text-text-primary border-b border-border/60 pb-3">
              Financial Breakdown
            </h2>

            <div className="space-y-3 text-[14px]">
              <div className="flex justify-between">
                <span className="text-text-secondary">Total Package Quote</span>
                <span className="font-semibold text-text-primary">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Advance Paid</span>
                <span>₹{booking.advancePaid.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-3 border-t border-border/60 flex justify-between items-baseline">
                <span className="text-[15px] font-semibold text-text-primary">Remaining Balance</span>
                <span className="text-[22px] font-bold text-primary">
                  ₹{booking.remainingAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-background border border-border text-[12.5px] text-text-secondary flex justify-between items-center">
              <span>Payment Status</span>
              <span className="font-semibold px-2.5 py-0.5 rounded-full uppercase bg-white border border-border text-text-primary">
                {booking.paymentStatus}
              </span>
            </div>

            {booking.remainingAmount > 0 && (
              <button
                onClick={() => setPaymentModalOpen(true)}
                className="w-full h-[42px] bg-primary text-white rounded-xl text-[13px] font-semibold hover:bg-primary-deep transition-colors cursor-pointer border-0 shadow-sm"
              >
                + Record Advance / Remaining
              </button>
            )}
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-2xl p-6 border border-border/80 shadow-xs space-y-4">
            <h2 className="text-[16px] font-semibold text-text-primary border-b border-border/60 pb-3">
              Event Details & Package
            </h2>

            <div className="space-y-3 text-[13.5px]">
              <div className="flex justify-between">
                <span className="text-text-secondary">Package Tier</span>
                <span className="font-semibold text-text-primary">{booking.packageType || 'Custom Package'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Customer Contact</span>
                <span className="font-semibold text-text-primary">{booking.customerName}</span>
              </div>
              {booking.requirements && (
                <div className="pt-3 border-t border-border/50">
                  <span className="text-text-secondary text-[12px] font-semibold block mb-1">Special Requirements</span>
                  <p className="text-[13px] text-text-primary bg-background p-3 rounded-xl border border-border/60">
                    {booking.requirements}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RECORD PAYMENT MODAL */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 lg:p-8 max-w-[420px] w-full shadow-2xl space-y-5 animate-scale-in">
            <h3 className="text-[20px] font-semibold text-text-primary">Record Payment</h3>
            <p className="text-[13px] text-text-secondary">
              Record advance or partial payment for {booking.customerName}.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-[12px] font-semibold text-text-secondary block mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={payAmount}
                  max={booking.remainingAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full h-[44px] px-4 rounded-xl border border-border bg-background text-[15px] font-semibold text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-text-secondary block mb-1">Note (Optional)</label>
                <input
                  type="text"
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  placeholder="e.g. Bank transfer, Cash deposit"
                  className="w-full h-[44px] px-4 rounded-xl border border-border bg-background text-[13.5px] text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="px-4 py-2 text-[13px] font-medium text-text-secondary hover:text-text-primary bg-transparent border-0 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRecordPayment}
                className="px-5 py-2.5 bg-primary text-white text-[13px] font-semibold rounded-xl hover:bg-primary-deep transition-colors cursor-pointer border-0 shadow-sm"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
