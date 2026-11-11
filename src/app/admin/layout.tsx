import { getSession } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth-actions";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, LogOut, LayoutDashboard, PlusCircle } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If on login page, just render children without admin chrome
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Admin Top Navbar */}
      <header className="bg-navy text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Portal Name */}
            <div className="flex items-center gap-4">
              <Link href="/admin" className="flex items-center gap-2.5">
                <div className="relative w-8 h-8">
                  <Image
                    src="/icon.png"
                    alt="Host2uls Icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading font-black text-lg text-white">
                    Host2uls
                  </span>
                  <span className="text-xs font-bold text-coral uppercase tracking-wider">
                    CMS Studio
                  </span>
                </div>
              </Link>

              <span className="hidden sm:inline-block w-px h-5 bg-white/20" />

              <nav className="hidden sm:flex items-center gap-2">
                <Link
                  href="/admin"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Projects</span>
                </Link>
                <Link
                  href="/admin/projects/new"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-coral hover:bg-coral-600 text-white transition-colors flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>New Project</span>
                </Link>
              </nav>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <Link
                href="/showcase"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 border border-navy-700"
              >
                <span>Live Showcase</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-300 hover:text-white hover:bg-red-600/30 transition-colors px-3 py-1.5 rounded-lg border border-red-500/30"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

