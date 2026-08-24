import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Inbox,
  BookmarkCheck,
  Users,
  PartyPopper,
  Package,
  CreditCard,
  BarChart3,
  Settings,
  Menu,
  X,
  ExternalLink,
  Plus
} from 'lucide-react';

const navGroups = [
  {
    group: 'OVERVIEW',
    items: [
      { label: 'Dashboard', path: '/manage', icon: LayoutDashboard, end: true },
      { label: 'Calendar', path: '/manage/calendar', icon: Calendar },
    ],
  },
  {
    group: 'BOOKINGS',
    items: [
      { label: 'Enquiries', path: '/manage/enquiries', icon: Inbox },
      { label: 'Bookings', path: '/manage/bookings', icon: BookmarkCheck },
      { label: 'Customers', path: '/manage/customers', icon: Users },
    ],
  },
  {
    group: 'EVENTS',
    items: [
      { label: 'Events', path: '/manage/events', icon: PartyPopper },
      { label: 'Packages', path: '/manage/packages', icon: Package },
    ],
  },
  {
    group: 'FINANCE',
    items: [
      { label: 'Payments', path: '/manage/payments', icon: CreditCard },
      { label: 'Reports', path: '/manage/reports', icon: BarChart3 },
    ],
  },
  {
    group: 'MANAGEMENT',
    items: [
      { label: 'Settings', path: '/manage/settings', icon: Settings },
    ],
  },
];

export function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (open: boolean) => void }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[260px] bg-background border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-border/60 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[16px] font-bold tracking-[0.2em] text-primary">SHAAD</span>
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-text-secondary">
              Event Management
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-text-secondary hover:text-text-primary bg-transparent border-0 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Button */}
        <div className="p-4">
          <button
            onClick={() => {
              setMobileOpen(false);
              navigate('/manage/bookings/new');
            }}
            className="w-full h-[40px] bg-primary text-white rounded-xl text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-primary-deep transition-colors border-0 cursor-pointer shadow-sm"
          >
            <Plus size={16} /> New Booking
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
          {navGroups.map((group) => (
            <div key={group.group}>
              <p className="px-3 text-[10px] font-bold tracking-[0.2em] text-muted uppercase mb-2">
                {group.group}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 no-underline ${
                          isActive
                            ? 'bg-soft-rose text-primary font-semibold shadow-xs'
                            : 'text-text-secondary hover:text-text-primary hover:bg-white/60'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon size={18} className={isActive ? 'text-primary' : 'text-text-secondary'} />
                          <span>{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer info & Public Site Link */}
        <div className="p-4 border-t border-border/60 bg-white/40">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between text-[12.5px] font-medium text-primary hover:underline no-underline p-2 rounded-lg hover:bg-soft-rose/40 transition-colors"
          >
            <span>View Customer Site</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </aside>
    </>
  );
}

export function ManagementLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 lg:pl-[260px] flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <header className="lg:hidden h-[60px] bg-white border-b border-border px-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-text-primary bg-transparent border-0 cursor-pointer"
            >
              <Menu size={22} />
            </button>
            <span className="text-[14px] font-semibold text-primary tracking-widest">SHAAD MANAGE</span>
          </div>
        </header>

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
