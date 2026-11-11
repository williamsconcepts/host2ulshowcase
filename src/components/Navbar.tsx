"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Menu, X, ArrowRight, ExternalLink } from "lucide-react";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/site";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-cream/90 backdrop-blur-md border-b border-navy/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/showcase" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
              <Image
                src="/icon.png"
                alt="Host2uls Logo Icon"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-tight text-navy leading-none">
                Host2uls
              </span>
              <span className="text-[11px] font-semibold text-coral uppercase tracking-wider mt-0.5">
                web services
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/showcase"
              className="text-sm font-semibold text-navy hover:text-coral transition-colors"
            >
              Showcase
            </Link>
            <a
              href="#filter-section"
              className="text-sm font-semibold text-navy/80 hover:text-coral transition-colors"
            >
              Categories
            </a>
            <a
              href="#why-host2uls"
              className="text-sm font-semibold text-navy/80 hover:text-coral transition-colors"
            >
              Why Host2uls
            </a>
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-navy/80 hover:text-coral transition-colors flex items-center gap-1"
            >
              <span>Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={getWhatsAppUrl("Hi Host2uls! I want to start a website for my business.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-coral hover:bg-coral-600 text-white font-heading font-bold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Start Your Website</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Host2uls on WhatsApp"
              className="p-2 bg-coral/10 text-coral rounded-full hover:bg-coral/20 transition-colors"
            >
              <MessageSquare className="w-5 h-5 fill-coral" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-navy hover:text-coral transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-navy/10 bg-cream/98 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 font-heading font-semibold text-base text-navy">
            <Link
              href="/showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-navy/5 hover:text-coral transition-colors"
            >
              Showcase Gallery
            </Link>
            <a
              href="#filter-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-navy/5 hover:text-coral transition-colors"
            >
              Browse Categories
            </a>
            <a
              href="#why-host2uls"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-navy/5 hover:text-coral transition-colors"
            >
              Why Choose Us
            </a>
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg hover:bg-navy/5 hover:text-coral transition-colors flex items-center justify-between"
            >
              <span>Follow @{SITE_CONFIG.instagramHandle}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-2">
            <a
              href={getWhatsAppUrl("Hi Host2uls! I want to start a website for my business.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-600 text-white font-heading font-bold py-3 px-4 rounded-xl shadow transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Start Your Website on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

