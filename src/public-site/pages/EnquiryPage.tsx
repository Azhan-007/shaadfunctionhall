import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ArrowLeft, ArrowRight, Check, Calendar, Users, User, Heart, Cake, Star, Briefcase, MessageSquare } from 'lucide-react';
import type { EventType } from '../../data/seed';

const eventOptions: { type: EventType; icon: typeof Heart; label: string }[] = [
  { type: 'Wedding', icon: Heart, label: 'Wedding' },
  { type: 'Reception', icon: Star, label: 'Reception' },
  { type: 'Engagement', icon: Heart, label: 'Engagement' },
  { type: 'Nikah', icon: Star, label: 'Nikah' },
  { type: 'Birthday', icon: Cake, label: 'Birthday' },
  { type: 'Family Celebration', icon: Users, label: 'Family Celebration' },
  { type: 'Corporate Event', icon: Briefcase, label: 'Corporate Event' },
  { type: 'Other', icon: MessageSquare, label: 'Other' },
];

const steps = ['Event Type', 'Date', 'Guests', 'Your Details', 'Requirements'];

export function EnquiryPage() {
  const navigate = useNavigate();
  const addEnquiry = useStore(s => s.addEnquiry);
  const checkAvailability = useStore(s => s.checkAvailability);

  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [eventType, setEventType] = useState<EventType | ''>('');
  const [preferredDate, setPreferredDate] = useState('');
  const [guestCount, setGuestCount] = useState(100);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requirements, setRequirements] = useState('');
  const [dateStatus, setDateStatus] = useState<string | null>(null);

  const canGoNext = () => {
    switch (currentStep) {
      case 0: return eventType !== '';
      case 1: return preferredDate !== '';
      case 2: return guestCount > 0;
      case 3: return name.trim() !== '' && phone.trim() !== '';
      case 4: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && preferredDate) {
      const status = checkAvailability(preferredDate);
      setDateStatus(status);
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (!eventType) return;
    addEnquiry({
      customerId: '',
      customerName: name,
      customerPhone: phone,
      customerEmail: email || undefined,
      eventType: eventType as EventType,
      preferredDate,
      guestCount,
      requirements: requirements || undefined,
      status: 'New',
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-[80px] flex items-center justify-center bg-background">
        <div className="max-w-[520px] mx-auto px-6 text-center animate-fade-up">
          <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-success" />
          </div>
          <h1 className="text-[32px] lg:text-[40px] font-light text-text-primary mb-4">
            Enquiry Received
          </h1>
          <p className="text-[17px] text-text-secondary leading-[1.6] mb-8">
            Thank you for your interest in Shaad Function Hall. 
            We'll contact you shortly to confirm availability and discuss your event details.
          </p>
          <div className="bg-white rounded-xl p-6 border border-border mb-8 text-left">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[14px] text-text-secondary">Event</span>
                <span className="text-[14px] font-medium text-text-primary">{eventType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[14px] text-text-secondary">Date</span>
                <span className="text-[14px] font-medium text-text-primary">
                  {new Date(preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[14px] text-text-secondary">Guests</span>
                <span className="text-[14px] font-medium text-text-primary">{guestCount}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="h-[44px] px-6 bg-transparent text-primary text-[13px] font-medium rounded-full border border-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate('/manage')}
              className="h-[44px] px-6 bg-primary text-white text-[13px] font-medium rounded-full hover:bg-primary-deep transition-all duration-200 border-0 cursor-pointer"
            >
              View in Management →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[80px] bg-background">
      <div className="max-w-[640px] mx-auto px-6 py-12 lg:py-20">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-accent text-[12px] font-medium tracking-[0.2em] uppercase">Enquiry</span>
            <div className="w-8 h-[1px] bg-accent" />
          </div>
          <h1 className="text-[32px] lg:text-[40px] font-light text-text-primary mb-3">
            Tell us about your event
          </h1>
          <p className="text-[16px] text-text-secondary">
            Share your event details and we'll get back to you with availability and options.
          </p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium transition-all duration-200 ${
                i < currentStep ? 'bg-primary text-white' :
                i === currentStep ? 'bg-primary text-white' :
                'bg-border text-muted'
              }`}>
                {i < currentStep ? <Check size={14} /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 h-[1px] transition-colors duration-200 ${
                  i < currentStep ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[320px]">
          {/* Step 1: Event Type */}
          {currentStep === 0 && (
            <div className="animate-fade-up">
              <h2 className="text-[20px] font-medium text-text-primary mb-6 text-center">What are you celebrating?</h2>
              <div className="grid grid-cols-2 gap-3">
                {eventOptions.map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => setEventType(type)}
                    className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer bg-transparent ${
                      eventType === type
                        ? 'border-primary bg-soft-rose text-primary'
                        : 'border-border hover:border-primary/30 text-text-primary'
                    }`}
                  >
                    <Icon size={20} className={eventType === type ? 'text-primary' : 'text-muted'} />
                    <span className="text-[14px] font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date */}
          {currentStep === 1 && (
            <div className="animate-fade-up">
              <h2 className="text-[20px] font-medium text-text-primary mb-6 text-center">When's the big day?</h2>
              <div className="max-w-[360px] mx-auto">
                <div className="relative">
                  <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="date"
                    value={preferredDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => { setPreferredDate(e.target.value); setDateStatus(null); }}
                    className="w-full h-[52px] pl-12 pr-4 rounded-xl border border-border bg-white text-[15px] text-text-primary focus:outline-none focus:border-primary transition-colors duration-200"
                  />
                </div>
                {dateStatus && (
                  <div className={`mt-4 p-4 rounded-xl text-[14px] font-medium ${
                    dateStatus === 'Available' ? 'bg-success-light text-success' :
                    dateStatus === 'Booked' ? 'bg-error-light text-error' :
                    dateStatus === 'Enquiry' ? 'bg-warning-light text-warning' :
                    'bg-background text-muted'
                  }`}>
                    {dateStatus === 'Available' && '✓ This date is available'}
                    {dateStatus === 'Booked' && '✕ This date is already booked'}
                    {dateStatus === 'Enquiry' && '⚠ There is an existing enquiry for this date'}
                    {dateStatus === 'Blocked' && '✕ This date is not available'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Guest Count */}
          {currentStep === 2 && (
            <div className="animate-fade-up">
              <h2 className="text-[20px] font-medium text-text-primary mb-6 text-center">How many guests?</h2>
              <div className="max-w-[360px] mx-auto text-center">
                <div className="relative">
                  <Users size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="number"
                    value={guestCount}
                    min={10}
                    max={1000}
                    onChange={(e) => setGuestCount(parseInt(e.target.value) || 0)}
                    className="w-full h-[52px] pl-12 pr-4 rounded-xl border border-border bg-white text-[15px] text-text-primary focus:outline-none focus:border-primary transition-colors duration-200 text-center"
                  />
                </div>
                <p className="text-[13px] text-muted mt-3">Approximate number of expected guests</p>
              </div>
            </div>
          )}

          {/* Step 4: Customer Details */}
          {currentStep === 3 && (
            <div className="animate-fade-up">
              <h2 className="text-[20px] font-medium text-text-primary mb-6 text-center">Your details</h2>
              <div className="space-y-4 max-w-[400px] mx-auto">
                <div>
                  <label className="text-[13px] font-medium text-text-secondary mb-1.5 block">Name *</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full h-[48px] pl-11 pr-4 rounded-xl border border-border bg-white text-[15px] text-text-primary focus:outline-none focus:border-primary transition-colors duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-medium text-text-secondary mb-1.5 block">Phone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full h-[48px] px-4 rounded-xl border border-border bg-white text-[15px] text-text-primary focus:outline-none focus:border-primary transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-medium text-text-secondary mb-1.5 block">Email <span className="text-muted">(optional)</span></label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full h-[48px] px-4 rounded-xl border border-border bg-white text-[15px] text-text-primary focus:outline-none focus:border-primary transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Requirements */}
          {currentStep === 4 && (
            <div className="animate-fade-up">
              <h2 className="text-[20px] font-medium text-text-primary mb-6 text-center">Any special requirements?</h2>
              <div className="max-w-[480px] mx-auto">
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Tell us about your vision for the event, any specific arrangements, or questions you have..."
                  rows={5}
                  className="w-full p-4 rounded-xl border border-border bg-white text-[15px] text-text-primary focus:outline-none focus:border-primary transition-colors duration-200 resize-none leading-[1.6]"
                />
                <p className="text-[13px] text-muted mt-2">This is optional — you can discuss details with us later.</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-border">
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 h-[44px] px-5 text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 bg-transparent border-0 cursor-pointer ${
              currentStep === 0 ? 'invisible' : ''
            }`}
          >
            <ArrowLeft size={16} /> Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className={`flex items-center gap-2 h-[44px] px-6 text-[13px] font-semibold tracking-[0.06em] rounded-full transition-all duration-200 border-0 cursor-pointer ${
                canGoNext()
                  ? 'bg-primary text-white hover:bg-primary-deep'
                  : 'bg-border text-muted cursor-not-allowed'
              }`}
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 h-[44px] px-8 bg-primary text-white text-[13px] font-semibold tracking-[0.06em] rounded-full hover:bg-primary-deep transition-all duration-200 border-0 cursor-pointer"
            >
              Submit Enquiry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
