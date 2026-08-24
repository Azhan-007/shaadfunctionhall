import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { DollarSign } from 'lucide-react';

export function PaymentsPage() {
  const navigate = useNavigate();
  const bookings = useStore((s) => s.bookings);
  const payments = useStore((s) => s.payments);
  const recordPayment = useStore((s) => s.recordPayment);

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [payAmount, setPayAmount] = useState<number>(50000);
  const [payNote, setPayNote] = useState('');

  const targetBooking = bookings.find((b) => b.id === selectedBookingId);

  const handleRecord = () => {
    if (selectedBookingId && payAmount > 0) {
      recordPayment(selectedBookingId, payAmount, 'Partial', payNote || 'Logged from payments page');
      setSelectedBookingId(null);
    }
  };

  const totalCollected = payments.reduce((acc, p) => acc + p.amount, 0);
  const totalOutstanding = bookings.reduce((acc, b) => acc + b.remainingAmount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent block mb-1">
            Financial Operations
          </span>
          <h1 className="text-[28px] lg:text-[36px] font-light text-text-primary">
            Event Payment Tracking
          </h1>
        </div>

        {/* Top Summary Badges */}
        <div className="flex items-center gap-4">
          <div className="bg-white px-4 py-2 rounded-xl border border-border">
            <span className="text-[11px] text-text-secondary uppercase font-semibold block">Total Advances Received</span>
            <span className="text-[16px] font-bold text-emerald-700">₹{totalCollected.toLocaleString('en-IN')}</span>
          </div>

          <div className="bg-white px-4 py-2 rounded-xl border border-border">
            <span className="text-[11px] text-text-secondary uppercase font-semibold block">Outstanding Receivables</span>
            <span className="text-[16px] font-bold text-amber-700">₹{totalOutstanding.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* PAYMENTS & BOOKINGS LIST */}
      <div className="bg-white rounded-2xl border border-border/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-border/60 bg-background/50 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-text-primary">Active Event Accounts</h2>
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
                className="p-5 hover:bg-soft-rose/20 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-soft-rose flex items-center justify-center text-primary font-bold">
                    <DollarSign size={18} />
                  </div>
                  <div>
                    <h3
                      onClick={() => navigate(`/manage/bookings/${booking.id}`)}
                      className="text-[15px] font-semibold text-text-primary hover:text-primary transition-colors cursor-pointer"
                    >
                      {booking.customerName}
                    </h3>
                    <p className="text-[12.5px] text-text-secondary">
                      {booking.eventType} • {dateFormatted}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 justify-between md:justify-end">
                  <div className="text-right">
                    <span className="text-[12px] text-text-secondary block">Total: ₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                    <span className="text-[14px] font-bold text-primary">
                      Remaining: ₹{booking.remainingAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                      booking.paymentStatus === 'Paid'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : booking.paymentStatus === 'Partially Paid'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>

                  {booking.remainingAmount > 0 && (
                    <button
                      onClick={() => {
                        setSelectedBookingId(booking.id);
                        setPayAmount(booking.remainingAmount);
                      }}
                      className="px-3.5 py-1.5 bg-primary text-white text-[12px] font-semibold rounded-lg hover:bg-primary-deep transition-colors cursor-pointer border-0 shadow-2xs"
                    >
                      + Collect Payment
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECORD PAYMENT MODAL */}
      {selectedBookingId && targetBooking && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 lg:p-8 max-w-[420px] w-full shadow-2xl space-y-5 animate-scale-in">
            <h3 className="text-[20px] font-semibold text-text-primary">Collect Payment</h3>
            <p className="text-[13px] text-text-secondary">
              Recording payment for {targetBooking.customerName} ({targetBooking.eventType})
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-[12px] font-semibold text-text-secondary block mb-1">Payment Amount (₹)</label>
                <input
                  type="number"
                  value={payAmount}
                  max={targetBooking.remainingAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full h-[44px] px-4 rounded-xl border border-border bg-background text-[15px] font-bold text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-text-secondary block mb-1">Note / Reference</label>
                <input
                  type="text"
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  placeholder="e.g. Bank Transfer, Cash"
                  className="w-full h-[44px] px-4 rounded-xl border border-border bg-background text-[13.5px] text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <button
                onClick={() => setSelectedBookingId(null)}
                className="px-4 py-2 text-[13px] font-medium text-text-secondary hover:text-text-primary bg-transparent border-0 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRecord}
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
