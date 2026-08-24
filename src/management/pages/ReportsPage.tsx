import { useStore } from '../../store/useStore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function ReportsPage() {
  const bookings = useStore((s) => s.bookings);

  // Group bookings by event type
  const eventTypeMap: Record<string, number> = {};
  bookings.forEach((b) => {
    eventTypeMap[b.eventType] = (eventTypeMap[b.eventType] || 0) + 1;
  });

  const eventTypeData = Object.keys(eventTypeMap).map((key) => ({
    name: key,
    count: eventTypeMap[key],
  }));

  // Revenue overview
  const totalPaid = bookings.reduce((acc, b) => acc + b.advancePaid, 0);
  const totalDue = bookings.reduce((acc, b) => acc + b.remainingAmount, 0);

  const financialData = [
    { name: 'Collected', value: totalPaid },
    { name: 'Outstanding Due', value: totalDue },
  ];

  const COLORS = ['#7A284B', '#C49A45'];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent block mb-1">
            Performance & Insights
          </span>
          <h1 className="text-[28px] lg:text-[36px] font-light text-text-primary">
            Business Summary Reports
          </h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Chart 1: Event Type Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-border/80 shadow-xs space-y-4">
          <h2 className="text-[16px] font-semibold text-text-primary border-b border-border/60 pb-3">
            Booked Events by Category
          </h2>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventTypeData}>
                <XAxis dataKey="name" stroke="#716B73" fontSize={12} />
                <YAxis allowDecimals={false} stroke="#716B73" fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#7A284B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Revenue vs Outstanding */}
        <div className="bg-white rounded-2xl p-6 border border-border/80 shadow-xs space-y-4">
          <h2 className="text-[16px] font-semibold text-text-primary border-b border-border/60 pb-3">
            Collection Ratio (₹)
          </h2>
          <div className="h-[260px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={financialData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {financialData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${Number(value || 0).toLocaleString('en-IN')}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 text-[13px] font-medium pt-2">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#7A284B]" /> Collected: ₹{totalPaid.toLocaleString('en-IN')}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C49A45]" /> Outstanding: ₹{totalDue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
