import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight, Star, TrendingUp, Sparkles } from "lucide-react";
import { Project } from "@/types";

interface FeaturedProjectProps {
  project: Project | null;
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  if (!project) return null;

  return (
    <section className="mb-14">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-coral fill-coral" />
        <h2 className="font-heading font-black text-xs uppercase tracking-wider text-coral">
          Spotlight Project
        </h2>
      </div>

      <div className="bg-white rounded-3xl border border-navy/10 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-7 flex flex-col bg-navy-950 overflow-hidden group">
            {/* Browser Header Bar */}
            <div className="bg-navy-950 px-4 py-2.5 flex items-center justify-between border-b border-white/10 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="bg-white/10 text-gray-200 font-mono text-xs px-4 py-1 rounded-md">
                {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, "") : `${project.slug}.com`}
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">Online</span>
              </div>
            </div>

            <div className="relative min-h-[300px] sm:min-h-[380px] flex-1 overflow-hidden">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-navy text-white/50">
                  <span>Featured Project Mockup</span>
                </div>
              )}

              {/* Visual Overlays & Badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-black/20" />

              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-coral text-white font-heading font-bold text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Build
                </span>
                <span className="bg-navy/90 backdrop-blur-sm text-white font-semibold text-xs px-3 py-1.5 rounded-full">
                  {project.category}
                </span>
              </div>

              {project.liveUrl && (
                <div className="absolute bottom-4 left-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white/95 hover:bg-white text-navy font-bold text-xs px-3.5 py-1.5 rounded-full shadow backdrop-blur-sm transition-transform hover:scale-105"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live Site Verified</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Case Story & Result */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-brandText-muted">
                  Client: {project.clientName}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Delivered in {project.timeline}
                </span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-navy leading-tight">
                {project.title}
              </h3>

              {/* Bold 1-Line Result Metric */}
              <div className="p-3.5 rounded-xl bg-coral/5 border border-coral/15 flex items-start gap-2.5">
                <TrendingUp className="w-5 h-5 text-coral shrink-0 mt-0.5" />
                <p className="font-heading font-bold text-sm text-navy leading-snug">
                  {project.resultMetric}
                </p>
              </div>

              <p className="text-sm text-brandText-muted leading-relaxed line-clamp-3">
                {project.description}
              </p>

              {/* Tech Tags */}
              <div className="pt-2">
                <p className="text-xs font-bold text-navy/70 uppercase tracking-wider mb-2">
                  Built With:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techUsed.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium bg-cream text-navy px-2.5 py-1 rounded-md border border-navy/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 sm:pt-8 mt-6 border-t border-navy/5 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href={`/showcase/${project.slug}`}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-800 text-white font-heading font-bold text-sm py-3 px-5 rounded-xl transition-all shadow hover:shadow-md"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cream hover:bg-cream-200 text-navy font-heading font-bold text-sm py-3 px-5 rounded-xl border border-navy/10 transition-colors"
                >
                  <span>Visit Live</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

