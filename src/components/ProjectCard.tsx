import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight, TrendingUp } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full">
      {/* Browser Window Frame Header (Jupiter X Style) */}
      <div className="bg-navy-950 px-3.5 py-2 flex items-center justify-between border-b border-white/10 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="bg-white/10 text-gray-300 font-mono text-[10px] px-3 py-0.5 rounded-md truncate max-w-[180px] text-center">
          {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, "") : `${project.slug}.ng`}
        </div>
        <div className="w-6 flex justify-end">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Live Website" />
        </div>
      </div>

      {/* Screenshot / Visual Banner */}
      <div className="relative aspect-[16/10] w-full bg-navy-950 overflow-hidden">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-navy text-white/50 text-xs font-semibold">
            <span>Project Preview</span>
          </div>
        )}

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-navy/90 backdrop-blur-sm text-white font-heading font-bold text-[11px] px-2.5 py-1 rounded-full shadow">
            {project.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-brandText-muted">
            <span className="font-semibold text-navy/70 truncate max-w-[180px]">
              {project.clientName}
            </span>
            <span className="font-medium bg-cream px-2 py-0.5 rounded border border-navy/5 text-[11px]">
              {project.timeline}
            </span>
          </div>

          <h3 className="font-heading font-black text-lg text-navy group-hover:text-coral transition-colors line-clamp-1">
            <Link href={`/showcase/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          {/* 1-Line Result Metric */}
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-coral/5 border border-coral/10">
            <TrendingUp className="w-4 h-4 text-coral shrink-0 mt-0.5" />
            <p className="font-heading font-bold text-xs text-navy leading-snug line-clamp-2">
              {project.resultMetric}
            </p>
          </div>

          <p className="text-xs text-brandText-muted line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-navy/5 flex items-center justify-between gap-2">
          <Link
            href={`/showcase/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-navy hover:text-coral transition-colors"
          >
            <span>View Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-navy/70 hover:text-coral transition-colors"
            >
              <span>View Live</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

