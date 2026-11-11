import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Login | Host2uls CMS",
  description: "Secure login portal for Host2uls showcase content management.",
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-navy flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-coral/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="text-center space-y-3">
          <Link
            href="/showcase"
            className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-coral transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to public Showcase</span>
          </Link>

          <div className="flex justify-center">
            <div className="relative w-14 h-14 bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <Image
                src="/icon.png"
                alt="Host2uls Icon"
                fill
                className="object-contain p-2"
                priority
              />
            </div>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
            Host2uls CMS Admin
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            Sign in to manage projects, upload screenshots, and publish case studies in seconds.
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-navy-800">
          <LoginForm />
        </div>

        <div className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-coral" />
          <span>Protected with JWT session security</span>
        </div>
      </div>
    </div>
  );
}

