/**
 * Host2uls Site Configuration
 * Single source of truth for business details, social links, contact information,
 * and site metadata. Update here to reflect across the entire application.
 */

export const SITE_CONFIG = {
  name: "Host2uls - web services",
  tagline: "Websites We've Built That Actually Work",
  description:
    "Explore websites designed and built by Host2uls for businesses, online stores, schools, churches, and creators in Nigeria & worldwide.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://host2uls.com",
  showcaseUrl: "https://host2uls.com/showcase",

  // Contact Channels
  whatsappNumber: "+2348141272216",
  whatsappCleanNumber: "2348141272216", // for wa.me links
  instagramHandle: "host_2uls",
  instagramUrl: "https://instagram.com/host_2uls",
  email: "hello@host2uls.com",
  phoneDisplay: "+234 814 127 2216",

  // Brand Palette
  colors: {
    primaryNavy: "#1E1B4B",
    primaryNavyDark: "#23214E",
    accentCoral: "#FF5A5F",
    backgroundCream: "#FFF9F2",
    textDark: "#111827",
    white: "#FFFFFF",
  },

  // Key stats displayed on Showcase
  stats: [
    { label: "Businesses Online", value: "100+", suffix: "Online" },
    { label: "Platform Uptime", value: "99.9%", suffix: "Uptime" },
    { label: "Turnaround Time", value: "Fast", suffix: "Delivery" },
    { label: "Direct Support", value: "24/7", suffix: "on WhatsApp" },
  ],
};

/**
 * Generate a pre-filled WhatsApp click-to-chat URL
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMessage =
    "Hello Host2uls! I saw your showcase website and I'd like to discuss starting my website project.";
  const message = encodeURIComponent(customMessage || defaultMessage);
  return `https://wa.me/${SITE_CONFIG.whatsappCleanNumber}?text=${message}`;
}

/**
 * Generate project specific WhatsApp inquiry URL
 */
export function getProjectInquiryWhatsAppUrl(projectTitle: string): string {
  const message = `Hello Host2uls! I saw the "${projectTitle}" project on your showcase and I want something similar for my business. Can we talk?`;
  return getWhatsAppUrl(message);
}

