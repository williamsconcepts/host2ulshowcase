import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CtaSection } from "@/components/CtaSection";
import { getProjectBySlug, getNextProject, getProjects } from "@/lib/store";
import { SITE_CONFIG, getProjectInquiryWhatsAppUrl } from "@/lib/site";
import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Clock,
  Briefcase,
  AlertCircle,
  Lightbulb,
  TrendingUp,
  Quote,
  MessageSquare,
  Sparkles,
  Share2,
} from "lucide-react";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects({ status: "published" });
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = project.seoTitle || `${project.title} | Host2uls Case Study`;
  const description =
    project.seoDescription ||
    project.description ||
    `Discover how Host2uls built ${project.title} for ${project.clientName}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/showcase/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.siteUrl}/showcase/${slug}`,
      type: "article",
      images: [
        {
          url: project.coverImage || "/logo.png",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.coverImage || "/logo.png"],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = await getNextProject(slug);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Navigation Breadcrumb */}
        <div className="bg-white border-b border-navy/5 py-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/showcase"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brandText-muted hover:text-coral transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all Showcase Projects</span>
            </Link>
          </div>
        </div>

        {/* Case Study Header / Hero */}
        <section className="pt-10 pb-14 bg-gradient-to-b from-white to-cream border-b border-navy/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-coral text-white font-heading font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                  {project.category}
                </span>
                <span className="bg-navy/5 text-navy font-semibold text-xs px-3 py-1 rounded-full border border-navy/10 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-navy/70" />
                  Client: {project.clientName}
                </span>
                <span className="bg-navy/5 text-navy font-semibold text-xs px-3 py-1 rounded-full border border-navy/10 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-navy/70" />
                  Delivery: {project.timeline}
                </span>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-navy hover:bg-navy-800 text-white font-heading font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow transition-all hover:shadow-md"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Visit Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-navy tracking-tight leading-tight">
              {project.title}
            </h1>

            {/* Key Result Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-coral/10 border border-coral/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-coral text-white shrink-0 mt-0.5">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-coral">
                    Primary Result & Impact
                  </span>
                  <p className="font-heading font-black text-base sm:text-lg text-navy">
                    {project.resultMetric}
                  </p>
                </div>
              </div>

              <a
                href={getProjectInquiryWhatsAppUrl(project.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 bg-coral hover:bg-coral-600 text-white font-heading font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Want Similar Results?</span>
              </a>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold text-navy/70 uppercase tracking-wider mr-1">
                Tech Stack:
              </span>
              {project.techUsed.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs font-medium bg-white text-navy px-3 py-1 rounded-full border border-navy/10 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Visual Mockup */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-14">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-navy-950">
            {/* Desktop Browser Bar */}
            <div className="bg-navy-950 px-4 py-3 flex items-center justify-between border-b border-white/10 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="bg-white/10 text-gray-200 font-mono text-xs px-5 py-1 rounded-lg flex items-center gap-2">
                <span className="text-gray-400 text-[10px]">https://</span>
                <span>{project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, "") : `${project.slug}.com`}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">Production</span>
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover object-top"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-navy text-white text-sm">
                  <span>Case Study Cover</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Problem / Solution / Result Deep Dive */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 mb-16">
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="font-heading font-black text-2xl text-navy">
              Project Overview
            </h2>
            <p className="text-base sm:text-lg text-brandText-muted leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Problem Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-red-100 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-heading font-black text-xl text-navy">
                The Challenge
              </h3>
            </div>
            <p className="text-base text-brandText-muted leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-navy">
              <Lightbulb className="w-5 h-5 text-coral" />
              <h3 className="font-heading font-black text-xl text-navy">
                The Host2uls Solution
              </h3>
            </div>
            <p className="text-base text-brandText-muted leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Result Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/50 border border-emerald-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-700">
              <TrendingUp className="w-5 h-5" />
              <h3 className="font-heading font-black text-xl text-navy">
                The Business Impact
              </h3>
            </div>
            <p className="text-base text-brandText-muted leading-relaxed">
              {project.result}
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="py-14 bg-white border-y border-navy/5 mb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-2 mb-10">
                <span className="font-heading font-bold text-xs uppercase tracking-widest text-coral">
                  Visual Tour
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-navy">
                  Screenshots & Feature Previews
                </h2>
                <p className="text-sm text-brandText-muted">
                  Designed for pixel perfection on both smartphones and desktop displays.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.gallery.map((imgUrl, i) => (
                  <div
                    key={i}
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-navy/10 shadow group bg-navy-950"
                  >
                    <Image
                      src={imgUrl}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-navy-950/20 group-hover:opacity-0 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Client Testimonial */}
        {project.testimonial && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="relative p-8 sm:p-10 rounded-3xl bg-white border border-navy/10 shadow-lg text-center space-y-5">
              <div className="w-12 h-12 bg-coral/10 text-coral rounded-full flex items-center justify-center mx-auto">
                <Quote className="w-6 h-6" />
              </div>

              <blockquote className="font-heading font-bold text-lg sm:text-xl text-navy leading-relaxed">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>

              <div className="pt-2">
                <p className="font-heading font-black text-base text-navy">
                  {project.testimonial.name}
                </p>
                <p className="text-xs text-brandText-muted">
                  {project.testimonial.role} &bull; {project.clientName}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Next Project Navigation */}
        {nextProject && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-navy/10 mb-14">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-navy/10 shadow-sm hover:border-coral/30 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-coral">
                  Next Case Study
                </span>
                <h4 className="font-heading font-black text-xl text-navy mt-1">
                  {nextProject.title}
                </h4>
                <p className="text-xs text-brandText-muted mt-0.5">
                  Category: {nextProject.category} &bull; Delivered in {nextProject.timeline}
                </p>
              </div>

              <Link
                href={`/showcase/${nextProject.slug}`}
                className="inline-flex items-center gap-2 bg-navy hover:bg-navy-800 text-white font-heading font-bold text-sm px-5 py-3 rounded-xl transition-all shadow"
              >
                <span>View Next Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}

        {/* Call To Action */}
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}

