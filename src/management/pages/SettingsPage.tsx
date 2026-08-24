

export function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent block mb-1">
            System & Venue Configuration
          </span>
          <h1 className="text-[28px] lg:text-[36px] font-light text-text-primary">
            Settings
          </h1>
        </div>
      </div>

      <div className="max-w-[680px] bg-white rounded-2xl p-6 lg:p-8 border border-border/80 shadow-xs space-y-6">
        <h2 className="text-[18px] font-semibold text-text-primary border-b border-border/60 pb-3">
          Venue Information Profile
        </h2>

        <div className="space-y-4 text-[14px]">
          <div>
            <label className="text-[13px] font-medium text-text-secondary block mb-1">Venue Brand Name</label>
            <input
              type="text"
              readOnly
              value="Shaad Function Hall"
              className="w-full h-[44px] px-4 rounded-xl border border-border bg-background text-text-primary font-semibold"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-text-secondary block mb-1">Primary Operating Phone</label>
            <input
              type="text"
              readOnly
              value="+91 98765 43210"
              className="w-full h-[44px] px-4 rounded-xl border border-border bg-background text-text-primary"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-text-secondary block mb-1">Visiting Hours</label>
            <input
              type="text"
              readOnly
              value="10:00 AM – 8:00 PM (Monday to Saturday)"
              className="w-full h-[44px] px-4 rounded-xl border border-border bg-background text-text-primary"
            />
          </div>

          <div className="p-4 rounded-xl bg-soft-rose/40 border border-primary/10 text-[13px] text-primary">
            <span className="font-semibold block mb-0.5">Demo System Active</span>
            <span>All changes in this discovery workspace use local state.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
