import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { EventType, PackageType } from '../../data/seed';

const eventTypes: EventType[] = [
  'Wedding',
  'Reception',
  'Engagement',
  'Nikah',
  'Birthday',
  'Family Celebration',
  'Corporate Event',
  'Other',
];

const packages: PackageType[] = ['Essential', 'Signature', 'Grand'];

export function BookingCreatePage() {
  const navigate = useNavigate();
  const createDirectBooking = useStore((s) => s.createDirectBooking);
  const checkAvailability = useStore((s) => s.checkAvailability);

  const [step, setStep] = useState(0);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [eventType, setEventType] = useState<EventType>('Wedding');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState(200);
  const [packageType, setPackageType] = useState<PackageType>('Signature');
  const [totalAmount, setTotalAmount] = useState(250000);
  const [advancePaid, setAdvancePaid] = useState(50000);
  const [requirements, setRequirements] = useState('');

  const [availabilityStatus, setAvailabilityStatus] = useState<string | null>(null);

  const stepsList = ['Customer Info', 'Event Details', 'Package & Pricing', 'Review & Confirm'];

  const handleCheckDate = (d: string) => {
    setEventDate(d);
    if (d) {
      const res = checkAvailability(d);
      setAvailabilityStatus(res);
    }
  };

  const handleSubmit = () => {
    const bookingId = createDirectBooking({
      customerName,
      customerPhone,
      customerEmail: customerEmail || undefined,
      eventType,
      eventDate,
      guestCount,
      packageType,
      totalAmount,
      advancePaid,
      requirements: requirements || undefined,
    });

    if (bookingId) {
      navigate(`/manage/bookings/${bookingId}`);
    }
  };

  return (
    <div className="max-w-[720px] mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/manage/bookings')}
          className="inline-flex items-center gap-2 text-[13px] font-medium text-text-secondary hover:text-primary transition-colors mb-4 bg-transparent border-0 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Bookings
        </button>

        <h1 className="text-[28px] lg:text-[34px] font-light text-text-primary">
          Create New Event Booking
        </h1>
        <p className="text-[15px] text-text-secondary mt-1">
          Guided reservation setup for Shaad Function Hall.
        </p>
      </div>

      {/* Stepper Progress */}
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        {stepsList.map((stLabel, idx) => (
          <div key={stLabel} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold ${
                step === idx
                  ? 'bg-primary text-white'
                  : step > idx
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {step > idx ? <Check size={14} /> : idx + 1}
            </div>
            <span
              className={`text-[13px] font-medium hidden sm:inline ${
                step === idx ? 'text-primary font-semibold' : 'text-text-secondary'
              }`}
            >
              {stLabel}
            </span>
          </div>
        ))}
      </div>

      {/* STEP CONTENT */}
      <div className="bg-white rounded-2xl p-6 lg:p-8 border border-border/80 shadow-xs space-y-6">
        {/* STEP 0: CUSTOMER */}
        {step === 0 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-[18px] font-semibold text-text-primary">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[13px] font-medium text-text-secondary block mb-1">Customer / Couple Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ayesha & Rahman"
                  className="w-full h-[46px] px-4 rounded-xl border border-border bg-background text-[14px] text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-text-secondary block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full h-[46px] px-4 rounded-xl border border-border bg-background text-[14px] text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-text-secondary block mb-1">Email (Optional)</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full h-[46px] px-4 rounded-xl border border-border bg-background text-[14px] text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: EVENT DETAILS & AVAILABILITY */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-[18px] font-semibold text-text-primary">Event & Date Selection</h2>

            <div className="space-y-4">
              <div>
                <label className="text-[13px] font-medium text-text-secondary block mb-1">Event Type</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                  className="w-full h-[46px] px-4 rounded-xl border border-border bg-background text-[14px] text-text-primary focus:outline-none focus:border-primary"
                >
                  {eventTypes.map((et) => (
                    <option key={et} value={et}>
                      {et}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[13px] font-medium text-text-secondary block mb-1">Event Date *</label>
                <input
                  type="date"
                  value={eventDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => handleCheckDate(e.target.value)}
                  className="w-full h-[46px] px-4 rounded-xl border border-border bg-background text-[14px] text-text-primary focus:outline-none focus:border-primary"
                />

                {availabilityStatus && (
                  <div
                    className={`mt-2 p-3 rounded-xl text-[13px] font-medium ${
                      availabilityStatus === 'Available'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-900 border border-amber-200'
                    }`}
                  >
                    {availabilityStatus === 'Available' ? '✓ Date is Available' : `Notice: Current status is ${availabilityStatus}`}
                  </div>
                )}
              </div>

              <div>
                <label className="text-[13px] font-medium text-text-secondary block mb-1">Expected Guest Count</label>
                <input
                  type="number"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-[46px] px-4 rounded-xl border border-border bg-background text-[14px] text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PACKAGE & PRICING */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-[18px] font-semibold text-text-primary">Package & Financial Setup</h2>

            <div className="space-y-4">
              <div>
                <label className="text-[13px] font-medium text-text-secondary block mb-2">Package Tier</label>
                <div className="grid grid-cols-3 gap-3">
                  {packages.map((pkg) => (
                    <button
                      key={pkg}
                      type="button"
                      onClick={() => setPackageType(pkg)}
                      className={`p-3.5 rounded-xl border text-[13.5px] font-semibold transition-all cursor-pointer ${
                        packageType === pkg
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'bg-background text-text-primary border-border hover:border-primary/40'
                      }`}
                    >
                      {pkg}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[13px] font-medium text-text-secondary block mb-1">Total Agreed Quote (₹)</label>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(Number(e.target.value))}
                  className="w-full h-[46px] px-4 rounded-xl border border-border bg-background text-[15px] font-bold text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-text-secondary block mb-1">Advance Amount Collected (₹)</label>
                <input
                  type="number"
                  value={advancePaid}
                  max={totalAmount}
                  onChange={(e) => setAdvancePaid(Number(e.target.value))}
                  className="w-full h-[46px] px-4 rounded-xl border border-border bg-background text-[15px] font-bold text-emerald-700 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-text-secondary block mb-1">Special Requirements / Notes</label>
                <textarea
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Decoration choices, dietary preferences..."
                  className="w-full p-3 rounded-xl border border-border bg-background text-[13.5px] text-text-primary focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW & CONFIRM */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-[18px] font-semibold text-text-primary">Summary & Confirmation</h2>

            <div className="bg-background rounded-xl p-5 border border-border space-y-3 text-[14px]">
              <div className="flex justify-between">
                <span className="text-text-secondary">Customer</span>
                <span className="font-semibold text-text-primary">{customerName} ({customerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Event & Guests</span>
                <span className="font-semibold text-text-primary">{eventType} — {guestCount} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Date</span>
                <span className="font-semibold text-text-primary">{eventDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Package</span>
                <span className="font-semibold text-text-primary">{packageType}</span>
              </div>
              <div className="pt-3 border-t border-border/60 flex justify-between">
                <span className="text-text-secondary">Total Amount</span>
                <span className="font-bold text-text-primary">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Advance Paid</span>
                <span>₹{advancePaid.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-amber-700 font-semibold">
                <span>Remaining Due</span>
                <span>₹{(totalAmount - advancePaid).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-border/80">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className={`px-4 py-2 text-[13px] font-medium rounded-xl border border-border bg-white cursor-pointer ${
              step === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50'
            }`}
          >
            Previous
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => Math.min(3, s + 1))}
              disabled={step === 0 && (!customerName || !customerPhone)}
              className="px-5 py-2.5 bg-primary text-white text-[13px] font-semibold rounded-xl hover:bg-primary-deep transition-colors cursor-pointer border-0 shadow-sm flex items-center gap-2"
            >
              Next <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-primary text-white text-[13.5px] font-semibold rounded-xl hover:bg-primary-deep transition-colors cursor-pointer border-0 shadow-sm flex items-center gap-2"
            >
              <Check size={16} /> Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
