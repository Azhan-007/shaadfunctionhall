import { create } from 'zustand';
import type {
  Enquiry, Booking, Customer, Payment, CalendarDay,
  EnquiryStatus, BookingStatus, PaymentStatus, EventType, PackageType, Package, TimelineEntry
} from '../data/seed';
import {
  seedCustomers, seedEnquiries, seedBookings, seedPayments, seedPackages, generateCalendarDays
} from '../data/seed';

interface AppState {
  // Data
  customers: Customer[];
  enquiries: Enquiry[];
  bookings: Booking[];
  payments: Payment[];
  packages: Package[];
  calendarDays: Record<string, CalendarDay>;

  // Enquiry actions
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;

  // Booking actions
  createBookingFromEnquiry: (enquiryId: string, packageType: PackageType, totalAmount: number, advancePaid: number) => string;
  createDirectBooking: (data: {
    customerName: string; customerPhone: string; customerEmail?: string;
    eventType: EventType; eventDate: string; guestCount: number;
    packageType?: PackageType; totalAmount: number; advancePaid: number; requirements?: string;
  }) => string;
  updateBookingStatus: (id: string, status: BookingStatus) => void;

  // Payment actions
  recordPayment: (bookingId: string, amount: number, type: Payment['type'], note?: string) => void;

  // Calendar actions
  checkAvailability: (date: string) => CalendarDayStatus;
  blockDate: (date: string) => void;
  unblockDate: (date: string) => void;

  // Customer actions
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => string;

  // Recompute calendar
  refreshCalendar: () => void;
}

type CalendarDayStatus = 'Available' | 'Booked' | 'Enquiry' | 'Blocked';

let nextId = 100;
const genId = (prefix: string) => `${prefix}${nextId++}`;
const today = () => new Date().toISOString().split('T')[0];

export const useStore = create<AppState>((set, get) => ({
  customers: [...seedCustomers],
  enquiries: [...seedEnquiries],
  bookings: [...seedBookings],
  payments: [...seedPayments],
  packages: [...seedPackages],
  calendarDays: generateCalendarDays(seedBookings, seedEnquiries),

  addEnquiry: (data) => {
    const id = genId('e');
    const now = today();

    // Auto-create customer if not existing
    const existingCustomer = get().customers.find(c => c.phone === data.customerPhone);
    let customerId = existingCustomer?.id || '';
    if (!existingCustomer) {
      customerId = genId('c');
      set(s => ({
        customers: [...s.customers, {
          id: customerId,
          name: data.customerName,
          phone: data.customerPhone,
          email: data.customerEmail,
          createdAt: now,
        }]
      }));
    }

    const enquiry: Enquiry = {
      ...data,
      id,
      customerId,
      createdAt: now,
      updatedAt: now,
    };

    set(s => {
      const newEnquiries = [...s.enquiries, enquiry];
      return {
        enquiries: newEnquiries,
        calendarDays: generateCalendarDays(s.bookings, newEnquiries),
      };
    });

    return id;
  },

  updateEnquiryStatus: (id, status) => {
    set(s => ({
      enquiries: s.enquiries.map(e =>
        e.id === id ? { ...e, status, updatedAt: today() } : e
      ),
    }));
  },

  createBookingFromEnquiry: (enquiryId, packageType, totalAmount, advancePaid) => {
    const state = get();
    const enquiry = state.enquiries.find(e => e.id === enquiryId);
    if (!enquiry) return '';

    const id = genId('b');
    const now = today();
    const remaining = totalAmount - advancePaid;
    const paymentStatus: PaymentStatus = remaining <= 0 ? 'Paid' : advancePaid > 0 ? 'Partially Paid' : 'Due';

    const timeline: TimelineEntry[] = [
      { step: 'Enquiry', date: enquiry.createdAt, completed: true, description: 'Initial enquiry received' },
      { step: 'Quoted', date: now, completed: true, description: `${packageType} package selected` },
      { step: 'Advance Paid', date: advancePaid > 0 ? now : undefined, completed: advancePaid > 0, description: advancePaid > 0 ? `₹${advancePaid.toLocaleString('en-IN')} advance received` : undefined },
      { step: 'Confirmed', date: now, completed: true, description: 'Booking confirmed' },
      { step: 'Event Preparation', completed: false },
      { step: 'Event Day', date: enquiry.preferredDate, completed: false },
      { step: 'Completed', completed: false },
    ];

    const booking: Booking = {
      id,
      enquiryId,
      customerId: enquiry.customerId,
      customerName: enquiry.customerName,
      eventType: enquiry.eventType,
      eventDate: enquiry.preferredDate,
      guestCount: enquiry.guestCount,
      packageType,
      totalAmount,
      advancePaid,
      remainingAmount: remaining,
      paymentStatus,
      bookingStatus: 'Confirmed',
      requirements: enquiry.requirements,
      timeline,
      createdAt: now,
      updatedAt: now,
    };

    // Record advance payment
    const payments: Payment[] = [...state.payments];
    if (advancePaid > 0) {
      payments.push({
        id: genId('p'),
        bookingId: id,
        customerName: enquiry.customerName,
        eventType: enquiry.eventType,
        amount: advancePaid,
        type: 'Advance',
        date: now,
      });
    }

    set(s => {
      const newBookings = [...s.bookings, booking];
      const newEnquiries = s.enquiries.map(e =>
        e.id === enquiryId ? { ...e, status: 'Confirmed' as EnquiryStatus, updatedAt: now } : e
      );
      return {
        bookings: newBookings,
        enquiries: newEnquiries,
        payments,
        calendarDays: generateCalendarDays(newBookings, newEnquiries),
      };
    });

    return id;
  },

  createDirectBooking: (data) => {
    const id = genId('b');
    const now = today();
    const remaining = data.totalAmount - data.advancePaid;
    const paymentStatus: PaymentStatus = remaining <= 0 ? 'Paid' : data.advancePaid > 0 ? 'Partially Paid' : 'Due';

    // Create customer
    let customerId = '';
    const existing = get().customers.find(c => c.phone === data.customerPhone);
    if (existing) {
      customerId = existing.id;
    } else {
      customerId = genId('c');
      set(s => ({
        customers: [...s.customers, {
          id: customerId,
          name: data.customerName,
          phone: data.customerPhone,
          email: data.customerEmail,
          createdAt: now,
        }]
      }));
    }

    const timeline: TimelineEntry[] = [
      { step: 'Enquiry', date: now, completed: true, description: 'Direct booking' },
      { step: 'Quoted', date: now, completed: true },
      { step: 'Advance Paid', date: data.advancePaid > 0 ? now : undefined, completed: data.advancePaid > 0 },
      { step: 'Confirmed', date: now, completed: true },
      { step: 'Event Preparation', completed: false },
      { step: 'Event Day', date: data.eventDate, completed: false },
      { step: 'Completed', completed: false },
    ];

    const booking: Booking = {
      id,
      customerId,
      customerName: data.customerName,
      eventType: data.eventType,
      eventDate: data.eventDate,
      guestCount: data.guestCount,
      packageType: data.packageType,
      totalAmount: data.totalAmount,
      advancePaid: data.advancePaid,
      remainingAmount: remaining,
      paymentStatus,
      bookingStatus: 'Confirmed',
      requirements: data.requirements,
      timeline,
      createdAt: now,
      updatedAt: now,
    };

    set(s => {
      const newBookings = [...s.bookings, booking];
      return {
        bookings: newBookings,
        calendarDays: generateCalendarDays(newBookings, s.enquiries),
      };
    });

    if (data.advancePaid > 0) {
      set(s => ({
        payments: [...s.payments, {
          id: genId('p'),
          bookingId: id,
          customerName: data.customerName,
          eventType: data.eventType,
          amount: data.advancePaid,
          type: 'Advance' as const,
          date: now,
        }]
      }));
    }

    return id;
  },

  updateBookingStatus: (id, status) => {
    set(s => ({
      bookings: s.bookings.map(b => {
        if (b.id !== id) return b;
        const timeline = b.timeline.map(t => {
          if (t.step === status) return { ...t, completed: true, date: t.date || today() };
          return t;
        });
        return { ...b, bookingStatus: status, timeline, updatedAt: today() };
      })
    }));
  },

  recordPayment: (bookingId, amount, type, note) => {
    const now = today();
    set(s => {
      const newPayments = [...s.payments, {
        id: genId('p'),
        bookingId,
        customerName: s.bookings.find(b => b.id === bookingId)?.customerName || '',
        eventType: s.bookings.find(b => b.id === bookingId)?.eventType || 'Other' as EventType,
        amount,
        type,
        date: now,
        note,
      }];

      const newBookings = s.bookings.map(b => {
        if (b.id !== bookingId) return b;
        const newAdvance = b.advancePaid + amount;
        const newRemaining = b.totalAmount - newAdvance;
        const paymentStatus: PaymentStatus = newRemaining <= 0 ? 'Paid' : 'Partially Paid';
        return { ...b, advancePaid: newAdvance, remainingAmount: Math.max(0, newRemaining), paymentStatus, updatedAt: now };
      });

      return { payments: newPayments, bookings: newBookings };
    });
  },

  checkAvailability: (date) => {
    const day = get().calendarDays[date];
    if (!day) return 'Available';
    return day.status;
  },

  blockDate: (date) => {
    set(s => ({
      calendarDays: {
        ...s.calendarDays,
        [date]: { date, status: 'Blocked' },
      }
    }));
  },

  unblockDate: (date) => {
    set(s => {
      const newDays = { ...s.calendarDays };
      delete newDays[date];
      return { calendarDays: newDays };
    });
  },

  addCustomer: (data) => {
    const id = genId('c');
    set(s => ({
      customers: [...s.customers, { ...data, id, createdAt: today() }]
    }));
    return id;
  },

  refreshCalendar: () => {
    set(s => ({
      calendarDays: generateCalendarDays(s.bookings, s.enquiries),
    }));
  },
}));
