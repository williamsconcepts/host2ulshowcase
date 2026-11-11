"use server";

import fs from "fs";
import path from "path";
import { getSession } from "@/lib/auth";

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function uploadImageAction(formData: FormData): Promise<UploadResult> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in first." };
  }

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) {
    return { success: false, error: "No file provided or file is empty." };
  }

  // Allowed image mime types
  const allowedMime = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!allowedMime.includes(file.type)) {
    return {
      success: false,
      error: "Invalid file type. Please upload a JPEG, PNG, WEBP, or SVG image.",
    };
  }

  // Maximum file size: 10MB
  if (file.size > 10 * 1024 * 1024) {
    return { success: false, error: "Image size exceeds 10MB limit." };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-")
      .replace(/-+/g, "-");
    const filename = `${Date.now()}-${safeName}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const filePath = path.join(uploadsDir, filename);
      fs.writeFileSync(filePath, buffer);
      return { success: true, url: `/uploads/${filename}` };
    } catch (fsErr) {
      // In read-only serverless environment where public/ is immutable, fallback to optimized Data URI
      console.warn("Falling back to data URI due to read-only filesystem:", fsErr);
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;
      return { success: true, url: dataUri };
    }
  } catch (err: any) {
    console.error("Upload error:", err);
    return { success: false, error: err.message || "Failed to process image." };
  }
}

