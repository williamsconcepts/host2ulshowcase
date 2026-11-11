import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Mail, Phone, ArrowUpRight, ShieldCheck } from "lucide-react";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/site";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-white mt-auto border-t border-navy-800">
      {/* Top Banner on Footer */}
      <div className="border-b border-navy-800 py-8 bg-navy-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center text-coral">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-heading font-bold text-white text-base">
                100% Reliable Nigerian Web Services
              </p>
              <p className="text-sm text-gray-300">
                Fast turnaround, transparent pricing, and 24/7 direct WhatsApp engineer support.
              </p>
            </div>
          </div>
          <a
            href={getWhatsAppUrl("Hi Host2uls! I would like to consult with an engineer.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-coral hover:bg-coral-600 text-white font-heading font-bold text-sm px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Chat With Us on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9">
                <Image
                  src="/icon.png"
                  alt="Host2uls Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl tracking-tight text-white leading-none">
                  Host2uls
                </span>
                <span className="text-[11px] font-semibold text-coral uppercase tracking-wider mt-0.5">
                  web services
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              We design and develop fast, secure, conversion-focused websites that help Nigerian and global businesses attract customers, take payments, and scale effortlessly.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-800 hover:bg-coral transition-colors flex items-center justify-center text-white"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
              </a>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-800 hover:bg-coral transition-colors flex items-center justify-center text-white"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="w-10 h-10 rounded-full bg-navy-800 hover:bg-coral transition-colors flex items-center justify-center text-white"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-base">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/showcase" className="hover:text-coral transition-colors">
                  Showcase Gallery
                </Link>
              </li>
              <li>
                <a href="#why-host2uls" className="hover:text-coral transition-colors">
                  Why Host2uls
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-coral transition-colors">
                  Verified Stats
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl("Hi Host2uls! I want a custom quote for my project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-coral transition-colors flex items-center gap-1"
                >
                  <span>Request Custom Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-base">Website Categories</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/showcase?category=Business" className="hover:text-coral transition-colors">
                  Corporate & Business
                </Link>
              </li>
              <li>
                <Link href="/showcase?category=Online%20Store" className="hover:text-coral transition-colors">
                  Online Stores & E-Commerce
                </Link>
              </li>
              <li>
                <Link href="/showcase?category=School" className="hover:text-coral transition-colors">
                  Schools & Academies
                </Link>
              </li>
              <li>
                <Link href="/showcase?category=Church" className="hover:text-coral transition-colors">
                  Churches & Ministries
                </Link>
              </li>
              <li>
                <Link href="/showcase?category=Portfolio%20/%20Creator" className="hover:text-coral transition-colors">
                  Creators & Portfolios
                </Link>
              </li>
              <li>
                <Link href="/showcase?category=Real%20Estate" className="hover:text-coral transition-colors">
                  Real Estate & Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-base">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-coral mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs text-gray-400">WhatsApp:</span>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-coral transition-colors"
                  >
                    {SITE_CONFIG.whatsappNumber}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <InstagramIcon className="w-4 h-4 text-coral mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs text-gray-400">Instagram:</span>
                  <a
                    href={SITE_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-coral transition-colors"
                  >
                    @{SITE_CONFIG.instagramHandle}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-coral mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs text-gray-400">Phone Calls:</span>
                  <a
                    href={`tel:${SITE_CONFIG.phoneDisplay.replace(/\s+/g, "")}`}
                    className="font-semibold text-white hover:text-coral transition-colors"
                  >
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/showcase" className="hover:text-white transition-colors">
              Showcase
            </Link>
            <Link href="/admin" className="hover:text-coral transition-colors text-gray-500">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

