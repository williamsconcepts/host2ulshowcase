import { MessageSquare, ArrowDown, Sparkles, CheckCircle2 } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-navy/5">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-coral/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-navy/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 border border-navy/10 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-navy shadow-sm mb-6 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-coral animate-spin-slow" />
          <span>Real Client Results &bull; Nigerian & Global Web Services</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-navy tracking-tight max-w-4xl mx-auto leading-[1.12]">
          Websites We&apos;ve Built That{" "}
          <span className="relative inline-block text-coral">
            Actually Work
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-coral/30"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path
                d="M0 15 Q 50 0, 100 15"
                stroke="currentColor"
                strokeWidth="5"
                fill="none"
              />
            </svg>
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-brandText-muted max-w-2xl mx-auto leading-relaxed">
          No corporate fluff. We craft fast, mobile-ready websites for businesses, online stores, schools, churches, and creators that turn visitors into paying customers on WhatsApp, Paystack, and direct calls.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#filter-section"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-800 text-white font-heading font-bold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>View Live Sites</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href={getWhatsAppUrl("Hello Host2uls! I'm interested in starting a website for my business.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-coral hover:bg-coral-600 text-white font-heading font-bold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
            <span>Start Your Website &rarr; WhatsApp</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs sm:text-sm font-semibold text-navy/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Mobile-First (9:16 Optimized)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Under 2-Second Load Speed</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Direct WhatsApp Order Routing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Paystack / Flutterwave Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}

