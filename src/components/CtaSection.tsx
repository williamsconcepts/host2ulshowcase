import { MessageSquare, ArrowRight, ShieldCheck, Clock, Zap } from "lucide-react";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/site";

export function CtaSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-cream to-white relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-coral/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-navy/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white relative shadow-2xl overflow-hidden border border-navy-800">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-block bg-coral/20 text-coral border border-coral/30 font-heading font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full">
              Let&apos;s Build Together
            </span>

            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Your Business Could Be{" "}
              <span className="text-coral underline decoration-coral/50 underline-offset-8">
                Next
              </span>
            </h2>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Ready to stop losing paying customers to slow pages, broken links, and missed Instagram DMs? Let&apos;s build a fast, credible website that brings in real orders and inquiries.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppUrl(
                  "Hello Host2uls! I want my business to be next. Let's discuss pricing and launch timelines."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-coral hover:bg-coral-600 text-white font-heading font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>Start Your Website on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:${SITE_CONFIG.phoneDisplay.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy-800 hover:bg-navy-700 text-white font-heading font-bold text-sm px-6 py-4 rounded-xl border border-navy-700 transition-colors"
              >
                <span>Call Us Directly: {SITE_CONFIG.phoneDisplay}</span>
              </a>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-8 mt-8 border-t border-navy-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-300">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-coral shrink-0" />
                <span>Ready in 7 &ndash; 14 Business Days</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-coral shrink-0" />
                <span>Free Domain & Hosting Setup</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-coral shrink-0" />
                <span>100% Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

