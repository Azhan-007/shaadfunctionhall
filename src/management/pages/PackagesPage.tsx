import { useStore } from '../../store/useStore';
import { Check } from 'lucide-react';

export function PackagesPage() {
  const packages = useStore((s) => s.packages);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent block mb-1">
            Service Tiers
          </span>
          <h1 className="text-[28px] lg:text-[36px] font-light text-text-primary">
            Package Configurations
          </h1>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-2xl p-6 border border-border/80 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent">{pkg.name}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {pkg.status}
                </span>
              </div>

              <h2 className="text-[20px] font-semibold text-text-primary mb-2">{pkg.name} Package</h2>
              <p className="text-[13px] text-text-secondary leading-relaxed mb-4">{pkg.description}</p>

              <div className="space-y-2 pt-3 border-t border-border/50">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">Includes</p>
                {pkg.included.map((inc, i) => (
                  <div key={i} className="flex items-start gap-2 text-[13px] text-text-primary">
                    <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/60">
              <span className="text-[12px] text-text-secondary block font-medium">Ideal For:</span>
              <span className="text-[12.5px] text-text-primary font-semibold">{pkg.idealFor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
