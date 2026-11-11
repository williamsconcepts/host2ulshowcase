import { Globe, Server, Zap, MessageSquare } from "lucide-react";

export function StatsStrip() {
  const stats = [
    {
      icon: Globe,
      number: "100+",
      label: "Businesses Online",
      subtext: "Across Nigeria & Abroad",
    },
    {
      icon: Server,
      number: "99.9%",
      label: "High Uptime",
      subtext: "Enterprise-Grade Reliability",
    },
    {
      icon: Zap,
      number: "7-14",
      suffix: "Days",
      label: "Fast Delivery",
      subtext: "Launch Without Delay",
    },
    {
      icon: MessageSquare,
      number: "Direct",
      label: "WhatsApp Support",
      subtext: "Real Engineers, Zero Bots",
    },
  ];

  return (
    <section id="stats" className="py-10 bg-white border-y border-navy/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 p-4 rounded-xl bg-cream/40 border border-navy/5 hover:border-coral/20 transition-colors"
              >
                <div className="p-3 rounded-lg bg-navy/5 text-coral shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-baseline justify-center sm:justify-start gap-1">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-navy">
                      {item.number}
                    </span>
                    {item.suffix && (
                      <span className="font-heading font-bold text-lg text-coral">
                        {item.suffix}
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-sm text-navy mt-0.5">{item.label}</p>
                  <p className="text-xs text-brandText-muted">{item.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

