"use client";

import { useState } from "react";
import { submitEnquiryAction } from "@/app/actions";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await submitEnquiryAction(formData);

    setLoading(false);
    if (result.success) {
      setMessage({ type: "success", text: result.message });
      (event.target as HTMLFormElement).reset();
    } else {
      setMessage({ type: "error", text: result.message });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-primary-cream/80 p-6 sm:p-8 rounded-3xl shadow-lg">
      <h3 className="font-extrabold text-xl text-dark-text tracking-tight mb-2">Send an Enquiry</h3>
      <p className="text-xs sm:text-sm text-dark-text/60 mb-6">Have questions? Fill out the form below and our admissions desk will reply shortly.</p>

      {message && (
        <div
          className={`flex items-start gap-3 p-4 rounded-xl text-sm ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={18} className="shrink-0 text-green-600 mt-0.5" />
          ) : (
            <AlertCircle size={18} className="shrink-0 text-red-600 mt-0.5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="John Doe"
            className="w-full px-4 py-3 text-sm rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 text-sm rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">
          Email Address *
          </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="johndoe@example.com"
          className="w-full px-4 py-3 text-sm rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          placeholder="Admission query / Sports facilities"
          className="w-full px-4 py-3 text-sm rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Write your query details here..."
          className="w-full px-4 py-3 text-sm rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none transition-colors resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-campus-green text-white hover:bg-deep-green font-bold text-sm py-3.5 rounded-xl shadow-md transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
