import { useStore } from '../../store/useStore';
import { User, Phone, Mail } from 'lucide-react';

export function CustomersPage() {
  const customers = useStore((s) => s.customers);
  const bookings = useStore((s) => s.bookings);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent block mb-1">
            Client Directory
          </span>
          <h1 className="text-[28px] lg:text-[36px] font-light text-text-primary">
            Customers
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-border/60 bg-background/50">
          <span className="text-[13px] font-semibold text-text-secondary">
            {customers.length} Registered Contacts
          </span>
        </div>

        <div className="divide-y divide-border/60">
          {customers.map((c) => {
            const customerBookings = bookings.filter((b) => b.customerId === c.id);
            const totalValue = customerBookings.reduce((acc, b) => acc + b.totalAmount, 0);

            return (
              <div key={c.id} className="p-5 hover:bg-soft-rose/20 transition-colors flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-soft-rose flex items-center justify-center text-primary font-bold">
                    <User size={18} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-text-primary">{c.name}</h3>
                    <div className="flex items-center gap-4 text-[12.5px] text-text-secondary mt-0.5">
                      <span className="flex items-center gap-1">
                        <Phone size={13} className="text-muted" /> {c.phone}
                      </span>
                      {c.email && (
                        <span className="flex items-center gap-1">
                          <Mail size={13} className="text-muted" /> {c.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right text-[13px]">
                  <span className="font-semibold text-text-primary block">{customerBookings.length} Events Booked</span>
                  {totalValue > 0 && (
                    <span className="text-text-secondary text-[12px]">Total Value: ₹{totalValue.toLocaleString('en-IN')}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
