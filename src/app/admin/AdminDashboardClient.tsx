"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project, Category } from "@/types";
import {
  toggleProjectStatusAction,
  deleteProjectAction,
  addCategoryAction,
  removeCategoryAction,
} from "@/app/actions/project-actions";
import {
  PlusCircle,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Star,
  FolderPlus,
  Loader2,
  AlertTriangle,
} from "lucide-react";

interface AdminDashboardClientProps {
  initialProjects: Project[];
  categories: Category[];
}

export function AdminDashboardClient({
  initialProjects,
  categories,
}: AdminDashboardClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Deletion modal state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status toggle loading tracker
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Category management
  const [newCatName, setNewCatName] = useState("");
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  // Filter projects locally
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || p.status === statusFilter;

    const matchesCategory =
      categoryFilter === "all" ||
      p.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleToggleStatus = async (id: string) => {
    setTogglingId(id);
    const res = await toggleProjectStatusAction(id);
    setTogglingId(null);

    if (res.success && res.newStatus) {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: res.newStatus! } : p))
      );
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    const res = await deleteProjectAction(id);
    setIsDeleting(false);
    setDeletingId(null);

    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setIsAddingCat(true);
    const res = await addCategoryAction(newCatName.trim());
    setIsAddingCat(false);
    if (res.success) {
      setNewCatName("");
      window.location.reload();
    }
  };

  const handleDeleteCategory = async (catId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    const res = await removeCategoryAction(catId);
    if (res.success) {
      window.location.reload();
    }
  };

  // Metrics
  const totalCount = projects.length;
  const publishedCount = projects.filter((p) => p.status === "published").length;
  const draftCount = projects.filter((p) => p.status === "draft").length;

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Metrics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-navy">
            Project Showcase Manager
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage live showcase case studies, client testimonials, and categories.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setShowCategoryManager(!showCategoryManager)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 text-navy font-heading font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 transition-colors shadow-sm"
          >
            <FolderPlus className="w-4 h-4 text-coral" />
            <span>Categories ({categories.length})</span>
          </button>

          <Link
            href="/admin/projects/new"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-600 text-white font-heading font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow hover:shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Total Projects
          </span>
          <p className="font-heading font-black text-3xl text-navy mt-1">
            {totalCount}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Published Live
          </span>
          <p className="font-heading font-black text-3xl text-emerald-600 mt-1">
            {publishedCount}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Drafts
          </span>
          <p className="font-heading font-black text-3xl text-amber-600 mt-1">
            {draftCount}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-navy uppercase tracking-wider">
            Industries / Categories
          </span>
          <p className="font-heading font-black text-3xl text-navy mt-1">
            {categories.length}
          </p>
        </div>
      </div>

      {/* Category Manager Dropdown */}
      {showCategoryManager && (
        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-md space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-heading font-bold text-base text-navy">
              Manage Website Categories
            </h3>
            <button
              onClick={() => setShowCategoryManager(false)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Close &times;
            </button>
          </div>

          <form onSubmit={handleAddCategory} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="e.g. Fintech, Healthcare, Event..."
              className="flex-1 px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/40"
            />
            <button
              type="submit"
              disabled={isAddingCat || !newCatName.trim()}
              className="bg-navy hover:bg-navy-800 text-white font-bold text-xs px-4 py-2 rounded-xl disabled:opacity-50"
            >
              {isAddingCat ? "Adding..." : "Add Category"}
            </button>
          </form>

          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-navy"
              >
                <span>{cat.name}</span>
                <span className="text-[10px] text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded-full">
                  {cat.count || 0}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="text-gray-400 hover:text-red-500"
                  title="Delete category"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/40"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400">Status:</span>
          {(["all", "published", "draft"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                statusFilter === status
                  ? "bg-navy text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs font-semibold text-navy bg-gray-100 border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects List Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="font-heading font-bold text-base">No projects found</p>
            <p className="text-xs mt-1">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Project Title & Screenshot */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-9 rounded-lg overflow-hidden bg-navy-950 shrink-0 border border-gray-200">
                          {project.coverImage ? (
                            <Image
                              src={project.coverImage}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                        <div>
                          <p className="font-heading font-bold text-navy hover:text-coral transition-colors">
                            <Link href={`/admin/projects/${project.id}`}>
                              {project.title}
                            </Link>
                          </p>
                          <p className="text-[11px] text-gray-400 font-mono">
                            /showcase/{project.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-semibold bg-gray-100 text-navy px-2.5 py-1 rounded-md">
                        {project.category}
                      </span>
                    </td>

                    {/* Client */}
                    <td className="py-3.5 px-4 text-xs font-medium text-gray-600">
                      {project.clientName}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(project.id)}
                        disabled={togglingId === project.id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                          project.status === "published"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                        }`}
                        title="Click to toggle status"
                      >
                        {togglingId === project.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : project.status === "published" ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        <span className="capitalize">{project.status}</span>
                      </button>
                    </td>

                    {/* Featured */}
                    <td className="py-3.5 px-4">
                      {project.featured ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-coral bg-coral/10 px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 fill-coral" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">&mdash;</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Preview */}
                        <Link
                          href={`/showcase/${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-lg transition-colors"
                          title="Preview public case study"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        {/* Edit */}
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="p-1.5 text-navy hover:text-coral hover:bg-coral/10 rounded-lg transition-colors"
                          title="Edit project"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => setDeletingId(project.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-heading font-black text-lg text-navy">
                Delete Project?
              </h3>
              <p className="text-xs text-gray-500">
                Are you sure you want to delete this project? This will remove it from the public showcase immediately.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deletingId)}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

