"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/app/actions/auth-actions";
import { Lock, Mail, ArrowRight, Loader2, Info } from "lucide-react";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [email, setEmail] = useState("admin@host2uls.com");
  const [password, setPassword] = useState("admin123Host2uls!");

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
          {state.error}
        </div>
      )}

      {/* Info notice about default credentials */}
      <div className="p-3 rounded-xl bg-cream border border-coral/20 text-navy text-xs flex items-start gap-2">
        <Info className="w-4 h-4 text-coral shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Default Admin Credentials:</span>
          <div className="font-mono text-[11px] text-brandText-muted mt-0.5">
            admin@host2uls.com / admin123Host2uls!
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5"
        >
          Admin Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral transition-all"
            placeholder="admin@host2uls.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral transition-all"
            placeholder="••••••••••••"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-600 text-white font-heading font-bold text-sm py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Signing In...</span>
          </>
        ) : (
          <>
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

