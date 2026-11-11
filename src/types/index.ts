export type ProjectCategory =
  | "All"
  | "Business"
  | "Online Store"
  | "School"
  | "Church"
  | "Portfolio / Creator"
  | string;

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  clientName: string;
  liveUrl?: string;
  description: string;
  resultMetric: string; // 1-line result shown on cards
  problem: string;
  solution: string;
  result: string;
  techUsed: string[];
  timeline: string;
  featured: boolean;
  order: number;
  status: "published" | "draft";
  coverImage: string;
  gallery: string[];
  testimonial?: Testimonial;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

