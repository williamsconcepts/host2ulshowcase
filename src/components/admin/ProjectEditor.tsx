"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Project, Category } from "@/types";
import { saveProjectAction } from "@/app/actions/project-actions";
import { uploadImageAction } from "@/app/actions/upload-action";
import { slugify } from "@/lib/slugify";
import {
  Upload,
  X,
  ExternalLink,
  ArrowLeft,
  Check,
  Loader2,
  Image as ImageIcon,
  Plus,
  Trash2,
  Sparkles,
  Lock,
  Unlock,
} from "lucide-react";

interface ProjectEditorProps {
  initialProject?: Project | null;
  categories: Category[];
}

export function ProjectEditor({ initialProject, categories }: ProjectEditorProps) {
  const router = useRouter();
  const isEditing = Boolean(initialProject);

  // Form states
  const [title, setTitle] = useState(initialProject?.title || "");
  const [slug, setSlug] = useState(initialProject?.slug || "");
  const [slugAuto, setSlugAuto] = useState(!initialProject);
  const [category, setCategory] = useState(
    initialProject?.category || categories[0]?.name || "Business"
  );
  const [clientName, setClientName] = useState(initialProject?.clientName || "");
  const [liveUrl, setLiveUrl] = useState(initialProject?.liveUrl || "");
  const [resultMetric, setResultMetric] = useState(
    initialProject?.resultMetric || ""
  );
  const [description, setDescription] = useState(
    initialProject?.description || ""
  );
  const [problem, setProblem] = useState(initialProject?.problem || "");
  const [solution, setSolution] = useState(initialProject?.solution || "");
  const [result, setResult] = useState(initialProject?.result || "");
  const [techUsedString, setTechUsedString] = useState(
    initialProject?.techUsed?.join(", ") || "Next.js, Tailwind CSS, Paystack"
  );
  const [timeline, setTimeline] = useState(initialProject?.timeline || "2 Weeks");
  const [featured, setFeatured] = useState(Boolean(initialProject?.featured));
  const [order, setOrder] = useState(initialProject?.order || 1);
  const [status, setStatus] = useState<"published" | "draft">(
    initialProject?.status || "published"
  );

  // Cover image & Gallery
  const [coverImage, setCoverImage] = useState(
    initialProject?.coverImage || "/placeholder-fashion.jpg"
  );
  const [gallery, setGallery] = useState<string[]>(
    initialProject?.gallery || [initialProject?.coverImage || "/placeholder-fashion.jpg"]
  );

  // Testimonial
  const [testiName, setTestiName] = useState(initialProject?.testimonial?.name || "");
  const [testiRole, setTestiRole] = useState(initialProject?.testimonial?.role || "");
  const [testiQuote, setTestiQuote] = useState(initialProject?.testimonial?.quote || "");

  // SEO
  const [seoTitle, setSeoTitle] = useState(initialProject?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(
    initialProject?.seoDescription || ""
  );

  // UI States
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Handle title change & auto slug
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (slugAuto) {
      setSlug(slugify(val));
    }
  };

  // Client-side image compression helper
  const compressImage = async (file: File): Promise<File> => {
    // If SVG or under 1MB, don't compress
    if (file.type === "image/svg+xml" || file.size < 1024 * 1024) {
      return file;
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new (window as any).Image();
        img.src = event.target?.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1080;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            "image/jpeg",
            0.85
          );
        };
      };
    });
  };

  // Upload Cover Image
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    try {
      const compressed = await compressImage(file);
      const fd = new FormData();
      fd.append("file", compressed);
      const res = await uploadImageAction(fd);
      if (res.success && res.url) {
        setCoverImage(res.url);
        // If gallery is empty or default, add it too
        if (gallery.length === 0 || gallery[0].includes("placeholder")) {
          setGallery([res.url]);
        }
      } else {
        alert(res.error || "Failed to upload image.");
      }
    } catch (err) {
      alert("Error uploading image");
    } finally {
      setUploadingCover(false);
    }
  };

  // Upload Gallery Image
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    try {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressed = await compressImage(file);
        const fd = new FormData();
        fd.append("file", compressed);
        const res = await uploadImageAction(fd);
        if (res.success && res.url) {
          newUrls.push(res.url);
        }
      }
      setGallery((prev) => [...prev, ...newUrls]);
    } catch (err) {
      alert("Error uploading gallery image");
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title.trim()) {
      setErrorMsg("Please enter a project title.");
      return;
    }

    const finalCategory = customCategory.trim() || category;
    if (!finalCategory) {
      setErrorMsg("Please select or specify a category.");
      return;
    }

    setIsSaving(true);

    const techArray = techUsedString
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const projectPayload = {
      id: initialProject?.id,
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      category: finalCategory,
      clientName: clientName.trim() || "Private Client",
      liveUrl: liveUrl.trim(),
      resultMetric: resultMetric.trim() || "Fast, modern web solution delivered",
      description: description.trim(),
      problem: problem.trim(),
      solution: solution.trim(),
      result: result.trim(),
      techUsed: techArray.length > 0 ? techArray : ["Next.js", "Tailwind CSS"],
      timeline: timeline.trim() || "2 Weeks",
      featured,
      order: Number(order) || 1,
      status,
      coverImage: coverImage || "/placeholder-fashion.jpg",
      gallery: gallery.length > 0 ? gallery : [coverImage || "/placeholder-fashion.jpg"],
      testimonial: testiQuote.trim()
        ? {
            name: testiName.trim() || "Satisfied Client",
            role: testiRole.trim() || "Business Owner",
            quote: testiQuote.trim(),
          }
        : undefined,
      seoTitle: seoTitle.trim(),
      seoDescription: seoDescription.trim(),
    };

    const res = await saveProjectAction(projectPayload);
    setIsSaving(false);

    if (res.success && res.project) {
      router.push("/admin");
      router.refresh();
    } else {
      setErrorMsg(res.error || "Failed to save project. Please check inputs.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-navy transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-navy">
            {isEditing ? `Edit: ${initialProject?.title}` : "Add New Showcase Project"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Fill in the details below. Most fields are optional or have smart defaults so you can publish in &lt; 2 minutes.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {slug && (
            <Link
              href={`/showcase/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2.5 rounded-xl transition-colors"
            >
              <span>Preview Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-600 text-white font-heading font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow hover:shadow-md disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>{isEditing ? "Save Changes" : "Publish Project"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {errorMsg}
        </div>
      )}

      {/* Main Form Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Primary Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card: Basic Info */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-base text-navy flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-coral" />
              <span>Project Essentials</span>
            </h2>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Lagos Luxury Fashion Store"
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/40"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                  URL Slug
                </label>
                <button
                  type="button"
                  onClick={() => setSlugAuto(!slugAuto)}
                  className="text-[11px] text-gray-500 hover:text-coral flex items-center gap-1"
                >
                  {slugAuto ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                  <span>{slugAuto ? "Auto-generating from title" : "Manual slug"}</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-mono">/showcase/</span>
                <input
                  type="text"
                  value={slug}
                  disabled={slugAuto}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  placeholder="lagos-luxury-fashion-store"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-xl font-mono text-gray-700 bg-gray-50 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-coral/40"
                />
              </div>
            </div>

            {/* 1-Line Result Metric */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-coral mb-1.5">
                1-Line Result Metric (Hero Card Highlight) *
              </label>
              <input
                type="text"
                required
                value={resultMetric}
                onChange={(e) => setResultMetric(e.target.value)}
                placeholder="e.g. +280% online sales in first 60 days"
                className="w-full px-4 py-2.5 text-sm border border-coral/30 rounded-xl bg-coral/5 focus:outline-none focus:ring-2 focus:ring-coral/40"
              />
            </div>

            {/* Client & Live URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                  Client / Business Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Aura Luxe Nigeria Ltd"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                  Live Website URL (optional)
                </label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/40"
                />
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Short Summary Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="High-converting fashion store with WhatsApp checkout and instant Paystack integration."
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/40"
              />
            </div>
          </div>

          {/* Card: Case Study Details (Problem / Solution / Result) */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-base text-navy">
              Deep-Dive Case Study Story
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-red-600 mb-1.5">
                The Problem / Challenge
              </label>
              <textarea
                rows={3}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="What was holding the client back before hiring Host2uls?"
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                The Host2uls Solution
              </label>
              <textarea
                rows={3}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="What architecture, UI, and integrations did we build to solve it?"
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1.5">
                The Business Impact / Result
              </label>
              <textarea
                rows={3}
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="Measurable outcomes, time saved, revenue generated, client satisfaction."
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/40"
              />
            </div>
          </div>

          {/* Card: Screenshots & Gallery */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-5">
            <h2 className="font-heading font-bold text-base text-navy">
              Screenshots & Mockups
            </h2>

            {/* Cover Image Upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">
                Primary Cover Image *
              </label>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative w-36 h-24 bg-navy-950 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt="Cover Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <div className="space-y-2 flex-1">
                  <input
                    type="file"
                    ref={coverInputRef}
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    disabled={uploadingCover}
                    className="inline-flex items-center gap-2 bg-navy hover:bg-navy-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
                  >
                    {uploadingCover ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingCover ? "Uploading..." : "Upload New Cover"}</span>
                  </button>

                  <div className="text-xs text-gray-500">
                    Or paste an image URL directly:
                    <input
                      type="text"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="/placeholder-fashion.jpg"
                      className="w-full mt-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Uploads */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                  Case Study Gallery (Screenshots)
                </label>
                <input
                  type="file"
                  multiple
                  ref={galleryInputRef}
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={uploadingGallery}
                  className="inline-flex items-center gap-1 text-xs font-bold text-coral hover:text-coral-600"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Gallery Photos</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {gallery.map((url, i) => (
                  <div
                    key={i}
                    className="relative aspect-[16/10] bg-navy-950 rounded-xl overflow-hidden border border-gray-200 group"
                  >
                    <Image
                      src={url}
                      alt={`Gallery ${i}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(i)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card: Client Testimonial */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-base text-navy">
              Client Testimonial (Optional)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                  Client Name
                </label>
                <input
                  type="text"
                  value={testiName}
                  onChange={(e) => setTestiName(e.target.value)}
                  placeholder="e.g. Chidinma Okonkwo"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                  Client Role & Title
                </label>
                <input
                  type="text"
                  value={testiRole}
                  onChange={(e) => setTestiRole(e.target.value)}
                  placeholder="e.g. Founder & Creative Director"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Client Quote
              </label>
              <textarea
                rows={2}
                value={testiQuote}
                onChange={(e) => setTestiQuote(e.target.value)}
                placeholder="What did the client say about working with Host2uls?"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/40"
              />
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Meta, Settings & Publishing */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Publish Settings */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-5">
            <h2 className="font-heading font-bold text-base text-navy">
              Publication Settings
            </h2>

            {/* Status: Published vs Draft */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus("published")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-colors ${
                    status === "published"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Published Live
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("draft")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-colors ${
                    status === "draft"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Draft Only
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Category / Industry *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-coral/40"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Or type a new category..."
                className="w-full mt-2 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-navy"
              />
            </div>

            {/* Featured Switch */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-navy">
                  Spotlight / Featured
                </span>
                <span className="block text-[11px] text-gray-500">
                  Highlight at top of /showcase
                </span>
              </div>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 text-coral rounded border-gray-300 focus:ring-coral"
              />
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                min={1}
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl"
              />
              <span className="text-[11px] text-gray-400 mt-0.5 block">
                Lower numbers appear first.
              </span>
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Delivery Timeline
              </label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="e.g. 2 Weeks or 10 Days"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl"
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Tech Stack (comma separated)
              </label>
              <input
                type="text"
                value={techUsedString}
                onChange={(e) => setTechUsedString(e.target.value)}
                placeholder="Next.js, Tailwind CSS, Paystack"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl"
              />
            </div>
          </div>

          {/* Card: SEO Meta */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-base text-navy">
              SEO Optimization
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Custom SEO Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder={`${title || "Project"} | Host2uls Showcase`}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Custom Meta Description
              </label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Summary for Google and WhatsApp preview cards..."
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

