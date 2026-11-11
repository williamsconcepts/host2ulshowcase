import { Suspense } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { FeaturedProject } from "@/components/FeaturedProject";
import { FilterBar } from "@/components/FilterBar";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SkeletonGrid } from "@/components/SkeletonGrid";
import { CtaSection } from "@/components/CtaSection";
import { getProjects, getFeaturedProject, getCategories } from "@/lib/store";
import { SITE_CONFIG } from "@/lib/site";
import { Check, Shield, Smartphone, Zap, Headset, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Showcase | Websites We've Built That Actually Work",
  description:
    "Explore our portfolio of high-performing websites built for Nigerian businesses, e-commerce stores, schools, churches, and creators.",
  alternates: {
    canonical: "/showcase",
  },
  openGraph: {
    title: "Host2uls Showcase | Websites That Actually Work",
    description:
      "Explore real client websites with proven results built by Host2uls web services.",
    url: `${SITE_CONFIG.siteUrl}/showcase`,
  },
};

interface ShowcasePageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function ShowcasePage({ searchParams }: ShowcasePageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category || "All";
  const search = resolvedParams.search || "";

  // Fetch data
  const [categories, featuredProject, projects] = await Promise.all([
    getCategories(),
    getFeaturedProject(),
    getProjects({
      category: currentCategory,
      search,
      status: "published",
    }),
  ]);

  // Structured Data (JSON-LD) for LocalBusiness & Portfolio
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Host2uls - web services",
    image: `${SITE_CONFIG.siteUrl}/logo.png`,
    url: `${SITE_CONFIG.siteUrl}/showcase`,
    telephone: SITE_CONFIG.whatsappNumber,
    priceRange: "₦₦",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
      addressLocality: "Lagos",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
    sameAs: [SITE_CONFIG.instagramUrl],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Stats Strip */}
        <StatsStrip />

        {/* Main Showcase Section */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Project Top Highlight (Only show when not filtering by search) */}
          {!search && currentCategory.toLowerCase() === "all" && (
            <FeaturedProject project={featuredProject} />
          )}

          {/* Section Heading & Filter Bar */}
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-navy">
                  Browse All Projects
                </h2>
                <p className="text-sm text-brandText-muted mt-1">
                  Filtering {projects.length} verified live {projects.length === 1 ? "website" : "websites"}
                </p>
              </div>
            </div>

            {/* Filter Bar with Search and Category Pills */}
            <FilterBar
              categories={categories}
              currentCategory={currentCategory}
              initialSearch={search}
            />

            {/* Projects Grid with Suspense */}
            <Suspense fallback={<SkeletonGrid />}>
              <ProjectGrid projects={projects} currentCategory={currentCategory} />
            </Suspense>
          </div>
        </section>

        {/* Why Host2uls Section */}
        <section id="why-host2uls" className="py-16 sm:py-20 bg-white border-y border-navy/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
              <span className="font-heading font-bold text-xs uppercase tracking-widest text-coral">
                The Host2uls Advantage
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-navy">
                Why Nigerian Businesses Choose Us Over Freelancers & DIY Builders
              </h2>
              <p className="text-base text-brandText-muted">
                Building a website isn&apos;t just about pretty colors. It is about speed, reliability, and ensuring every single visitor can contact you or pay you without hitches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Smartphone,
                  title: "9:16 Mobile-First Engineering",
                  desc: "Over 85% of Nigerian web traffic comes from Instagram and WhatsApp on phones. Your website is built and tested specifically for smartphone screens first.",
                },
                {
                  icon: Zap,
                  title: "Under 2s Speed Optimization",
                  desc: "Built with Next.js 15 and server rendering so pages load immediately even on slow 3G/4G networks, preventing visitors from bouncing.",
                },
                {
                  icon: Shield,
                  title: "Direct WhatsApp & Paystack Ready",
                  desc: "Customers can order or chat directly with your team on WhatsApp, or pay securely using debit cards, USSD, and bank transfers.",
                },
                {
                  icon: Headset,
                  title: "Zero Bot Support — Real Humans",
                  desc: "You get a dedicated WhatsApp channel directly with your developer. No ticketing queues or robotic automated responses.",
                },
                {
                  icon: Award,
                  title: "Full Ownership & Transparent Pricing",
                  desc: "No hidden renewal traps. You own your code, your domain, and your content with 100% control.",
                },
                {
                  icon: Check,
                  title: "Done In Days, Not Months",
                  desc: "Our agile deployment process delivers fully functional, tested websites in an average of 7 to 14 business days.",
                },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-cream/40 border border-navy/5 hover:border-coral/20 hover:bg-cream/70 transition-all space-y-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-navy/5 text-coral flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-black text-lg text-navy">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-brandText-muted leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}

