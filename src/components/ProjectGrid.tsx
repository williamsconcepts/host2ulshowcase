import { ProjectCard } from "./ProjectCard";
import { Project } from "@/types";
import { MessageSquare, Sparkles } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/site";

interface ProjectGridProps {
  projects: Project[];
  currentCategory?: string;
}

export function ProjectGrid({ projects, currentCategory }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-3xl border border-navy/10 shadow-sm max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 bg-coral/10 text-coral rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="font-heading font-black text-2xl text-navy">
          No projects in this category yet
        </h3>
        <p className="text-brandText-muted text-sm sm:text-base mt-2 max-w-md mx-auto">
          Be the first {currentCategory ? `in ${currentCategory}` : "business"} to showcase a modern, high-converting website built by Host2uls.
        </p>
        <div className="mt-6">
          <a
            href={getWhatsAppUrl(
              `Hi Host2uls! I want to be the first business to build a ${
                currentCategory || "custom"
              } website with you.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-coral hover:bg-coral-600 text-white font-heading font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all hover:shadow-lg"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Be The First &mdash; Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

