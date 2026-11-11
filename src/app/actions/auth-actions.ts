"use server";

import { createSession, destroySession, verifyAdminCredentials } from "@/lib/auth";
import { redirect } from "next/navigation";

export interface AuthState {
  error?: string;
  success?: boolean;
}

export async function loginAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  const isValid = verifyAdminCredentials(email, password);
  if (!isValid) {
    return { error: "Invalid admin email or password." };
  }

  await createSession(email);
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

