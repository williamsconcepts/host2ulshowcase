import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-navy/10 text-center space-y-5 shadow-card">
          <div className="w-16 h-16 bg-coral/10 text-coral rounded-2xl flex items-center justify-center mx-auto font-heading font-black text-2xl">
            404
          </div>

          <h1 className="font-heading font-black text-2xl text-navy">
            Project Page Not Found
          </h1>

          <p className="text-sm text-brandText-muted leading-relaxed">
            The case study or page you are looking for may have moved or been updated. Browse our full live showcase to view all projects.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/showcase"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-navy hover:bg-navy-800 text-white font-heading font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Showcase</span>
            </Link>

            <a
              href={getWhatsAppUrl("Hello Host2uls! I ran into a 404 page.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-coral hover:bg-coral-600 text-white font-heading font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

