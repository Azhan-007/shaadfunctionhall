export type EventType = 'Wedding' | 'Reception' | 'Engagement' | 'Nikah' | 'Birthday' | 'Family Celebration' | 'Corporate Event' | 'Community Event' | 'Other';

export type EnquiryStatus = 'New' | 'Contacted' | 'Quoted' | 'Negotiating' | 'Confirmed' | 'Lost';

export type BookingStatus = 'Enquiry' | 'Quoted' | 'Advance Paid' | 'Confirmed' | 'Event Preparation' | 'Event Day' | 'Completed';

export type PaymentStatus = 'Paid' | 'Partially Paid' | 'Due' | 'Overdue';

export type CalendarDayStatus = 'Available' | 'Booked' | 'Enquiry' | 'Blocked';

export type PackageType = 'Essential' | 'Signature' | 'Grand';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  eventType: EventType;
  preferredDate: string;
  guestCount: number;
  requirements?: string;
  status: EnquiryStatus;
  estimatedValue?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  enquiryId?: string;
  customerId: string;
  customerName: string;
  eventType: EventType;
  eventDate: string;
  guestCount: number;
  packageType?: PackageType;
  totalAmount: number;
  advancePaid: number;
  remainingAmount: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  requirements?: string;
  timeline: TimelineEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEntry {
  step: BookingStatus;
  date?: string;
  completed: boolean;
  description?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  customerName: string;
  eventType: EventType;
  amount: number;
  type: 'Advance' | 'Partial' | 'Final' | 'Refund';
  date: string;
  note?: string;
}

export interface CalendarDay {
  date: string;
  status: CalendarDayStatus;
  bookingId?: string;
  enquiryId?: string;
  eventType?: EventType;
  customerName?: string;
  guestCount?: number;
}

export interface Package {
  id: string;
  name: PackageType;
  description: string;
  included: string[];
  idealFor: string;
  status: 'Active' | 'Draft';
}

// Seed Data
const today = new Date();
const formatDate = (d: Date) => d.toISOString().split('T')[0];
const addDays = (d: Date, n: number) => {
  const result = new Date(d);
  result.setDate(result.getDate() + n);
  return result;
};
const subDays = (d: Date, n: number) => addDays(d, -n);

export const seedCustomers: Customer[] = [
  { id: 'c1', name: 'Ayesha & Rahman', phone: '+91 98765 43210', email: 'ayesha.r@email.com', createdAt: formatDate(subDays(today, 30)) },
  { id: 'c2', name: 'Sarah & Ali', phone: '+91 87654 32109', email: 'sarah.ali@email.com', createdAt: formatDate(subDays(today, 25)) },
  { id: 'c3', name: 'Priya Sharma', phone: '+91 76543 21098', createdAt: formatDate(subDays(today, 20)) },
  { id: 'c4', name: 'Fatima Khan', phone: '+91 65432 10987', email: 'fatima.k@email.com', createdAt: formatDate(subDays(today, 15)) },
  { id: 'c5', name: 'Ravi & Meera', phone: '+91 54321 09876', createdAt: formatDate(subDays(today, 10)) },
  { id: 'c6', name: 'Zainab & Irfan', phone: '+91 43210 98765', email: 'zainab.i@email.com', createdAt: formatDate(subDays(today, 5)) },
];

export const seedEnquiries: Enquiry[] = [
  {
    id: 'e1', customerId: 'c4', customerName: 'Fatima Khan', customerPhone: '+91 65432 10987', customerEmail: 'fatima.k@email.com',
    eventType: 'Birthday', preferredDate: formatDate(addDays(today, 25)), guestCount: 80,
    requirements: 'Looking for a themed birthday celebration with catering', status: 'New',
    estimatedValue: 85000, createdAt: formatDate(subDays(today, 2)), updatedAt: formatDate(subDays(today, 2))
  },
  {
    id: 'e2', customerId: 'c5', customerName: 'Ravi & Meera', customerPhone: '+91 54321 09876',
    eventType: 'Engagement', preferredDate: formatDate(addDays(today, 18)), guestCount: 150,
    requirements: 'Intimate engagement ceremony with family dinner', status: 'Contacted',
    estimatedValue: 150000, createdAt: formatDate(subDays(today, 5)), updatedAt: formatDate(subDays(today, 3))
  },
  {
    id: 'e3', customerId: 'c6', customerName: 'Zainab & Irfan', customerPhone: '+91 43210 98765', customerEmail: 'zainab.i@email.com',
    eventType: 'Nikah', preferredDate: formatDate(addDays(today, 40)), guestCount: 200,
    requirements: 'Traditional nikah ceremony with separate arrangements', status: 'Quoted',
    estimatedValue: 250000, createdAt: formatDate(subDays(today, 7)), updatedAt: formatDate(subDays(today, 1))
  },
];

export const seedBookings: Booking[] = [
  {
    id: 'b1', enquiryId: 'e-old1', customerId: 'c1', customerName: 'Ayesha & Rahman',
    eventType: 'Wedding', eventDate: formatDate(addDays(today, 5)), guestCount: 250,
    packageType: 'Grand', totalAmount: 350000, advancePaid: 200000, remainingAmount: 150000,
    paymentStatus: 'Partially Paid', bookingStatus: 'Confirmed',
    requirements: 'Grand wedding with full decoration, catering for 250, live music',
    timeline: [
      { step: 'Enquiry', date: formatDate(subDays(today, 45)), completed: true, description: 'Initial enquiry received' },
      { step: 'Quoted', date: formatDate(subDays(today, 40)), completed: true, description: 'Grand package quoted' },
      { step: 'Advance Paid', date: formatDate(subDays(today, 35)), completed: true, description: '₹2,00,000 advance received' },
      { step: 'Confirmed', date: formatDate(subDays(today, 35)), completed: true, description: 'Booking confirmed' },
      { step: 'Event Preparation', date: formatDate(addDays(today, 3)), completed: false, description: 'Venue setup begins' },
      { step: 'Event Day', date: formatDate(addDays(today, 5)), completed: false },
      { step: 'Completed', completed: false },
    ],
    createdAt: formatDate(subDays(today, 45)), updatedAt: formatDate(subDays(today, 2))
  },
  {
    id: 'b2', enquiryId: 'e-old2', customerId: 'c2', customerName: 'Sarah & Ali',
    eventType: 'Engagement', eventDate: formatDate(addDays(today, 12)), guestCount: 180,
    packageType: 'Signature', totalAmount: 180000, advancePaid: 90000, remainingAmount: 90000,
    paymentStatus: 'Partially Paid', bookingStatus: 'Confirmed',
    timeline: [
      { step: 'Enquiry', date: formatDate(subDays(today, 30)), completed: true },
      { step: 'Quoted', date: formatDate(subDays(today, 25)), completed: true },
      { step: 'Advance Paid', date: formatDate(subDays(today, 20)), completed: true, description: '₹90,000 advance received' },
      { step: 'Confirmed', date: formatDate(subDays(today, 20)), completed: true },
      { step: 'Event Preparation', completed: false },
      { step: 'Event Day', date: formatDate(addDays(today, 12)), completed: false },
      { step: 'Completed', completed: false },
    ],
    createdAt: formatDate(subDays(today, 30)), updatedAt: formatDate(subDays(today, 5))
  },
  {
    id: 'b3', enquiryId: 'e-old3', customerId: 'c3', customerName: 'Priya Sharma',
    eventType: 'Reception', eventDate: formatDate(subDays(today, 10)), guestCount: 300,
    packageType: 'Grand', totalAmount: 400000, advancePaid: 400000, remainingAmount: 0,
    paymentStatus: 'Paid', bookingStatus: 'Completed',
    timeline: [
      { step: 'Enquiry', date: formatDate(subDays(today, 60)), completed: true },
      { step: 'Quoted', date: formatDate(subDays(today, 55)), completed: true },
      { step: 'Advance Paid', date: formatDate(subDays(today, 50)), completed: true },
      { step: 'Confirmed', date: formatDate(subDays(today, 50)), completed: true },
      { step: 'Event Preparation', date: formatDate(subDays(today, 12)), completed: true },
      { step: 'Event Day', date: formatDate(subDays(today, 10)), completed: true },
      { step: 'Completed', date: formatDate(subDays(today, 8)), completed: true, description: 'All payments settled' },
    ],
    createdAt: formatDate(subDays(today, 60)), updatedAt: formatDate(subDays(today, 8))
  },
];

export const seedPayments: Payment[] = [
  { id: 'p1', bookingId: 'b1', customerName: 'Ayesha & Rahman', eventType: 'Wedding', amount: 200000, type: 'Advance', date: formatDate(subDays(today, 35)) },
  { id: 'p2', bookingId: 'b2', customerName: 'Sarah & Ali', eventType: 'Engagement', amount: 90000, type: 'Advance', date: formatDate(subDays(today, 20)) },
  { id: 'p3', bookingId: 'b3', customerName: 'Priya Sharma', eventType: 'Reception', amount: 250000, type: 'Advance', date: formatDate(subDays(today, 50)) },
  { id: 'p4', bookingId: 'b3', customerName: 'Priya Sharma', eventType: 'Reception', amount: 150000, type: 'Final', date: formatDate(subDays(today, 8)), note: 'Final settlement' },
];

export const seedPackages: Package[] = [
  {
    id: 'pkg1', name: 'Essential', status: 'Active',
    description: 'Everything you need for an elegant, well-organized event.',
    idealFor: 'Intimate gatherings, family celebrations, birthday events',
    included: ['Venue for up to 150 guests', 'Basic venue decoration', 'Sound system', 'Parking arrangements', 'Event coordination support', 'Cleaning and setup'],
  },
  {
    id: 'pkg2', name: 'Signature', status: 'Active',
    description: 'A refined experience with enhanced styling and dedicated event support.',
    idealFor: 'Engagements, receptions, nikah ceremonies, community events',
    included: ['Venue for up to 300 guests', 'Premium venue decoration', 'Professional sound & lighting', 'Dedicated event coordinator', 'Valet parking', 'Bridal/VIP room access', 'Catering coordination', 'Photography-ready setup'],
  },
  {
    id: 'pkg3', name: 'Grand', status: 'Active',
    description: 'The complete celebration experience — every detail considered.',
    idealFor: 'Weddings, grand receptions, milestone celebrations',
    included: ['Venue for up to 500 guests', 'Luxury decoration & floral styling', 'Premium sound, lighting & AV', 'Senior event manager', 'Full valet service', 'Bridal suite & VIP lounges', 'Complete catering management', 'Live event coordination', 'Custom stage & backdrop', 'Post-event cleanup'],
  },
];

// Helper to generate calendar days from bookings and enquiries
export function generateCalendarDays(bookings: Booking[], enquiries: Enquiry[]): Record<string, CalendarDay> {
  const days: Record<string, CalendarDay> = {};
  
  bookings.forEach(b => {
    if (b.bookingStatus !== 'Completed') {
      days[b.eventDate] = {
        date: b.eventDate,
        status: 'Booked',
        bookingId: b.id,
        eventType: b.eventType,
        customerName: b.customerName,
        guestCount: b.guestCount,
      };
    }
  });
  
  enquiries.forEach(e => {
    if (e.status !== 'Lost' && e.status !== 'Confirmed' && !days[e.preferredDate]) {
      days[e.preferredDate] = {
        date: e.preferredDate,
        status: 'Enquiry',
        enquiryId: e.id,
        eventType: e.eventType,
        customerName: e.customerName,
        guestCount: e.guestCount,
      };
    }
  });
  
  return days;
}
