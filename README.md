# Host2uls Showcase Website

A modern, fast, production-ready showcase and case-study platform for **Host2uls - web services**, built to replace the legacy WordPress page at `https://host2uls.com/showcase`.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Key Highlights

- **Brand Design System**: Host2uls Navy (`#1E1B4B`), Accent Coral Red (`#FF5A5F`), Background Cream (`#FFF9F2`), Inter + Sora typography.
- **Mobile-First (9:16 Optimized)**: Engineered for high-conversion traffic from Instagram and WhatsApp.
- **Built-in Admin CMS (`/admin` or `/studio`)**:
  - Non-technical admins can add or edit projects in < 2 minutes.
  - Image upload support directly from phone cameras/galleries or desktop drag-and-drop with auto-compression.
  - Automatic slug generation with uniqueness guarantee.
  - Instant on-demand cache revalidation via `revalidatePath` and `revalidateTag`.
  - Secure JWT session authentication.
- **SEO & Social Sharing**:
  - Dynamic Open Graph image generation per project (`@vercel/og`).
  - Google-indexed `sitemap.xml` and `robots.txt`.
  - JSON-LD Structured Data (`ProfessionalService` / `LocalBusiness`).
  - Unique meta title and description per case study.
- **WordPress URL Preservation & Redirects**: All old `/showcase`, `/showcase/[slug]`, `/portfolio`, `/project/:slug` URLs are preserved and redirected.

---

## 🛠️ Quick Start (Run Locally)

### 1. Prerequisites
- Node.js 18.18+ or 20+ (tested on Node 22+)
- npm or pnpm

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Default credentials for local testing:
- **Admin Email**: `admin@host2uls.com`
- **Admin Password**: `admin123Host2uls!`
- **JWT Secret**: Set any 32-character random string.

### 4. Start the Dev Server
```bash
npm run dev
```

Open [http://localhost:3000/showcase](http://localhost:3000/showcase) in your browser.

---

## 📱 How to Change WhatsApp, Instagram & Brand Info in One Place

All contact channels, phone numbers, social links, and brand colors are centralized in a single configuration file:

📁 **`/src/lib/site.ts`**

```typescript
export const SITE_CONFIG = {
  name: "Host2uls - web services",
  whatsappNumber: "+2348141272216",      // Display number
  whatsappCleanNumber: "2348141272216",   // Number used for wa.me links
  instagramHandle: "host_2uls",          // Instagram handle
  instagramUrl: "https://instagram.com/host_2uls",
  siteUrl: "https://host2uls.com",
  email: "hello@host2uls.com",
  phoneDisplay: "+234 814 127 2216",
  ...
};
```

Whenever you update `whatsappCleanNumber` or `instagramHandle` here, all WhatsApp CTA buttons, prefilled messages, inquiry links, and footer contacts update automatically across the entire site.

---

## 📝 How to Add a New Project in the CMS (< 2 Minutes)

1. Open your browser and navigate to `/admin` (or `/studio`).
2. Log in using your admin credentials.
3. Click the **"+ Add New Project"** button in the top right.
4. Fill in:
   - **Project Title**: (e.g. *Lagos Luxury Fashion Store*) &rarr; the URL slug auto-generates automatically!
   - **1-Line Result Metric**: (e.g. *+280% online orders on WhatsApp in 60 days*)
   - **Category**: Pick an existing industry or enter a custom one.
   - **Client Name** & optional **Live Website URL**.
   - **Cover Image**: Click **Upload New Cover** to select an image from your phone or computer. The uploader auto-compresses the image for fast mobile loading.
   - **Problem / Solution / Result**: Write 2-3 sentences for each section.
   - Optional: Add extra screenshots to the **Gallery** and add a **Client Testimonial**.
5. Set Status to **Published Live** and click **Publish Project**.
6. That's it! Your new project is immediately visible at `/showcase` without needing to rebuild or deploy.

---

## 🖼️ Replacing Placeholder Images

The initial seed data includes 6 real Nigerian business case studies with placeholders in `/public/`:
- `/public/placeholder-fashion.jpg` (TODO: replace with real fashion store screenshot)
- `/public/placeholder-food.jpg` (TODO: replace with real food vendor screenshot)
- `/public/placeholder-school.jpg` (TODO: replace with real school portal screenshot)
- `/public/placeholder-church.jpg` (TODO: replace with real church website screenshot)
- `/public/placeholder-creator.jpg` (TODO: replace with real creator portfolio screenshot)
- `/public/placeholder-realestate.jpg` (TODO: replace with real estate screenshot)

You can either replace these files directly in `/public/`, or simply upload new screenshots directly via the CMS at `/admin`.

---

## ☁️ How to Deploy to Vercel

1. Push this repository to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Host2uls Showcase"
   git remote add origin https://github.com/your-username/host2uls-showcase.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Add the following **Environment Variables** in the Vercel dashboard:
   - `NEXT_PUBLIC_SITE_URL`: `https://host2uls.com`
   - `ADMIN_EMAIL`: Your production admin email
   - `ADMIN_PASSWORD`: A strong production password
   - `JWT_SECRET`: A secure random 32+ character string
   - *(Optional)* `BLOB_READ_WRITE_TOKEN`: If using Vercel Blob storage for uploads
5. Click **Deploy**. Vercel will automatically build and deploy your application with zero config.

---

## 🔒 Production Security Note

In production:
- Ensure you change `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your hosting dashboard environment variables.
- Ensure `JWT_SECRET` is set to a long, unpredictable secret.
- Session tokens are stored in strict `httpOnly`, `secure`, `sameSite=lax` cookies.

