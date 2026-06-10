"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminLoginAction } from "@/app/actions";
import { ShieldAlert, Lock, Mail, ArrowRight, Loader2, Home } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await adminLoginAction(formData);

    if (result.success) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-light-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Home link */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-bold text-dark-text/50 hover:text-deep-green uppercase tracking-wider transition-colors"
      >
        <Home size={14} /> Back to Home
      </Link>

      <div className="max-w-md w-full space-y-8 bg-white border border-primary-cream p-8 sm:p-10 rounded-3xl shadow-xl">
        {/* Header Branding */}
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 bg-primary-cream text-deep-green rounded-full p-2 mx-auto shadow-inner flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Goutham E.M High School Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-2xl font-black text-dark-text tracking-tight">Admin Portal Login</h2>
            <p className="text-xs text-dark-text/50 mt-1 uppercase tracking-widest font-bold text-deep-green">Authorized Access Only</p>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-sm flex gap-3 items-start animate-fadeIn">
            <ShieldAlert className="shrink-0 mt-0.5 text-red-600" size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-dark-text/40">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="admin@gouthamschool.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-dark-text/40">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-sm font-semibold"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-campus-green text-white hover:bg-deep-green font-extrabold text-sm py-3.5 rounded-xl shadow-md transition-colors disabled:opacity-75"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                Sign In to Dashboard
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
