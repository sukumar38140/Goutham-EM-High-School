import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAdminSession, clearAdminSession } from "@/lib/auth";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Image as ImageIcon,
  Newspaper,
  CalendarDays,
  Mail,
  Settings,
  LogOut,
  UserCheck
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Admissions", href: "/admin/dashboard/admissions", icon: GraduationCap },
  { name: "Faculty", href: "/admin/dashboard/faculty", icon: Users },
  { name: "Gallery", href: "/admin/dashboard/gallery", icon: ImageIcon },
  { name: "News Articles", href: "/admin/dashboard/news", icon: Newspaper },
  { name: "School Events", href: "/admin/dashboard/events", icon: CalendarDays },
  { name: "Contact Enquiries", href: "/admin/dashboard/enquiries", icon: Mail },
  { name: "Content & SEO", href: "/admin/dashboard/content", icon: Settings },
];

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: AdminLayoutProps) {
  // Server-side cryptographic token verification
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Logout Server Action helper inside layout
  async function handleLogout() {
    "use server";
    await clearAdminSession();
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-light-bg flex flex-col md:flex-row">
      {/* 1. SIDEBAR CONTAINER */}
      <aside className="w-full md:w-64 bg-dark-text text-white shrink-0 flex flex-col border-r border-white/5">
        {/* Branding header */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="relative w-8 h-8 bg-white rounded-full p-1 overflow-hidden shrink-0">
            <Image
              src="/images/logo.png"
              alt="Goutham School Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-wide text-white">Goutham School</span>
            <span className="text-[10px] text-campus-green font-bold uppercase tracking-wider -mt-0.5">Admin Workspace</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-grow p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                <Icon size={18} className="text-campus-green" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User context footer */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-campus-green text-dark-text flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
              {session.name.charAt(0)}
            </div>
            <div className="text-xs truncate">
              <span className="font-bold text-white block truncate">{session.name}</span>
              <span className="text-white/40 block text-[10px] uppercase font-bold tracking-wider">{session.role}</span>
            </div>
          </div>

          <form action={handleLogout} className="w-full">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/10 text-white/60 hover:text-red-400 border border-white/10 hover:border-red-500/20 font-bold text-xs py-2.5 rounded-xl transition-all"
            >
              <LogOut size={14} />
              Logout Session
            </button>
          </form>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-grow flex flex-col min-w-0">
        <header className="bg-white border-b border-primary-cream px-6 py-4 flex items-center justify-between shrink-0">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
            Academic Operations Center
          </h2>
          <div className="flex items-center gap-2 text-xs font-semibold text-dark-text/60">
            <UserCheck size={16} className="text-campus-green" />
            Session active: {session.email}
          </div>
        </header>
        
        <main className="flex-grow p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
