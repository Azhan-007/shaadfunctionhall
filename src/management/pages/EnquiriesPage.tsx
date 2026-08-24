import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Calendar, Users, CheckCircle2, X } from 'lucide-react';
import type { EnquiryStatus, Enquiry } from '../../data/seed';

const pipelineStatuses: EnquiryStatus[] = ['New', 'Contacted', 'Quoted', 'Negotiating', 'Confirmed', 'Lost'];

export function EnquiriesPage() {
  const navigate = useNavigate();
  const enquiries = useStore((s) => s.enquiries);
  const updateEnquiryStatus = useStore((s) => s.updateEnquiryStatus);
  const createBookingFromEnquiry = useStore((s) => s.createBookingFromEnquiry);

  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent block mb-1">
            Sales & Inquiries
          </span>
          <h1 className="text-[28px] lg:text-[36px] font-light text-text-primary">
            Enquiry Pipeline
          </h1>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {pipelineStatuses.map((status) => {
          const colEnquiries = enquiries.filter((e) => e.status === status);

          let headerColor = 'text-text-primary bg-white';
          if (status === 'New') headerColor = 'text-amber-800 bg-amber-50 border-amber-200';
          if (status === 'Confirmed') headerColor = 'text-emerald-800 bg-emerald-50 border-emerald-200';
          if (status === 'Lost') headerColor = 'text-slate-500 bg-slate-100 border-slate-200';

          return (
            <div key={status} className="bg-background rounded-2xl p-3 border border-border/70 flex flex-col min-w-[220px]">
              {/* Column Header */}
              <div className={`p-3 rounded-xl border flex items-center justify-between mb-3 ${headerColor}`}>
                <span className="text-[12px] font-semibold uppercase tracking-wider">{status}</span>
                <span className="w-5 h-5 rounded-full bg-white/80 text-[11px] font-bold flex items-center justify-center text-text-primary shadow-2xs">
                  {colEnquiries.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-3 flex-1">
                {colEnquiries.length === 0 ? (
                  <div className="p-4 text-center text-[12px] text-muted border border-dashed border-border/60 rounded-xl">
                    No enquiries
                  </div>
                ) : (
                  colEnquiries.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedEnquiry(item)}
                      className="bg-white rounded-xl p-4 border border-border/80 hover:border-primary/40 hover:shadow-xs transition-all cursor-pointer space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[14px] font-semibold text-text-primary">{item.customerName}</span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-soft-rose text-primary flex-shrink-0">
                          {item.eventType}
                        </span>
                      </div>

                      <div className="text-[12px] text-text-secondary space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-muted" />
                          <span>{new Date(item.preferredDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users size={13} className="text-muted" />
                          <span>{item.guestCount} Guests</span>
                        </div>
                      </div>

                      {item.estimatedValue && (
                        <div className="pt-2 border-t border-border/40 text-[12px] font-semibold text-text-primary flex justify-between">
                          <span className="text-text-secondary font-normal">Est. Value</span>
                          <span>₹{item.estimatedValue.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ENQUIRY DETAIL MODAL / DRAWER */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="w-full max-w-[480px] bg-white h-full p-6 lg:p-8 flex flex-col justify-between shadow-2xl animate-slide-right overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/80 pb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent block">
                    Enquiry Overview
                  </span>
                  <h2 className="text-[22px] font-semibold text-text-primary mt-0.5">
                    {selectedEnquiry.customerName}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-1.5 text-text-secondary hover:text-text-primary bg-transparent border-0 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Status selector */}
              <div>
                <label className="text-[12px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">
                  Update Pipeline Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {pipelineStatuses.map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        updateEnquiryStatus(selectedEnquiry.id, st);
                        setSelectedEnquiry({ ...selectedEnquiry, status: st });
                      }}
                      className={`py-2 text-[12px] font-semibold rounded-xl border transition-all cursor-pointer ${
                        selectedEnquiry.status === st
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-text-secondary border-border hover:bg-soft-rose/40'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Details List */}
              <div className="bg-background rounded-xl p-5 space-y-3.5 text-[14px] border border-border">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Event Type</span>
                  <span className="font-semibold text-text-primary">{selectedEnquiry.eventType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Preferred Date</span>
                  <span className="font-semibold text-text-primary">
                    {new Date(selectedEnquiry.preferredDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Guest Count</span>
                  <span className="font-semibold text-text-primary">{selectedEnquiry.guestCount} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Phone</span>
                  <span className="font-semibold text-text-primary">{selectedEnquiry.customerPhone}</span>
                </div>
                {selectedEnquiry.customerEmail && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Email</span>
                    <span className="font-semibold text-text-primary">{selectedEnquiry.customerEmail}</span>
                  </div>
                )}
                {selectedEnquiry.requirements && (
                  <div className="pt-3 border-t border-border/60">
                    <span className="text-text-secondary block mb-1 text-[12px] font-semibold">Special Requirements</span>
                    <p className="text-[13px] text-text-primary leading-relaxed bg-white p-3 rounded-lg border border-border/50">
                      {selectedEnquiry.requirements}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-6 border-t border-border/80 space-y-3">
              <button
                onClick={() => {
                  const bId = createBookingFromEnquiry(selectedEnquiry.id, 'Signature', 250000, 50000);
                  setSelectedEnquiry(null);
                  if (bId) navigate(`/manage/bookings/${bId}`);
                }}
                className="w-full h-[46px] bg-primary text-white text-[13.5px] font-semibold rounded-xl hover:bg-primary-deep transition-colors cursor-pointer border-0 flex items-center justify-center gap-2 shadow-sm"
              >
                <CheckCircle2 size={16} /> Convert to Confirmed Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
