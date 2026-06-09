"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { addNewsAction, deleteNewsAction } from "@/app/actions";
import { Plus, Trash2, Loader2, Newspaper, Clock, Sparkles } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  isFeatured: boolean;
  publishedAt: Date;
}

interface NewsManagerProps {
  initialNews: NewsItem[];
}

export default function NewsManager({ initialNews }: NewsManagerProps) {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [showForm, setShowForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handlePublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Convert boolean check
    const isFeatured = e.currentTarget.isFeaturedCheckbox.checked;
    formData.append("isFeatured", isFeatured ? "true" : "false");

    startTransition(async () => {
      const result = await addNewsAction(formData);
      if (result.success) {
        alert(result.message || "News article published successfully!");
        window.location.reload();
      } else {
        alert(result.message || "Failed to publish news.");
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;

    startTransition(async () => {
      const result = await deleteNewsAction(id);
      if (result.success) {
        setNews((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(result.message || "Failed to delete.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex items-center justify-between bg-white border border-primary-cream p-5 rounded-2xl shadow-sm">
        <span className="text-xs font-bold text-dark-text/50 uppercase tracking-wider">
          Currently managing: {news.length} articles
        </span>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-campus-green hover:bg-deep-green text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <Plus size={16} /> Publish News
        </button>
      </div>

      {/* Publish Form (Conditional) */}
      {showForm && (
        <form
          onSubmit={handlePublish}
          className="bg-white border border-primary-cream rounded-3xl p-6 sm:p-8 shadow-lg space-y-5 animate-fadeIn"
        >
          <h3 className="font-extrabold text-lg text-dark-text flex items-center gap-2">
            <Newspaper className="text-campus-green" size={20} />
            Publish News Article
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Article Title *</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Annual Sports Day Meet 2026 Announcement"
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Summary * (Brief teaser text)</label>
              <input
                type="text"
                name="summary"
                required
                placeholder="e.g. Preparations have begun for our grand sports competition scheduling on September..."
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Full Body Content *</label>
              <textarea
                name="content"
                required
                rows={6}
                placeholder="Write full article description details here..."
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Banner Image File</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full px-3 py-2.5 rounded-xl border border-dark-text/10 bg-light-bg text-xs font-semibold"
                />
              </div>

              <div className="flex items-center gap-3 pt-6 pl-2">
                <input
                  type="checkbox"
                  id="isFeaturedCheckbox"
                  className="w-4 h-4 text-campus-green border-dark-text/10 rounded focus:ring-campus-green cursor-pointer"
                />
                <label htmlFor="isFeaturedCheckbox" className="text-xs font-bold uppercase tracking-wider text-dark-text/75 cursor-pointer flex items-center gap-1.5">
                  <Sparkles size={14} className="text-deep-green" />
                  Mark Featured Announcement
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-light-bg border border-primary-cream hover:bg-primary-cream/50 text-dark-text font-bold text-xs px-5 py-3 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-campus-green hover:bg-deep-green text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              {isPending && <Loader2 size={14} className="animate-spin" />}
              Publish Article
            </button>
          </div>
        </form>
      )}

      {/* News list */}
      {news.length === 0 ? (
        <div className="text-center py-16 bg-white border border-primary-cream rounded-2xl text-xs text-dark-text/40 font-semibold">
          No news articles published yet.
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-primary-cream p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative group flex flex-col sm:flex-row gap-5"
            >
              {/* Delete button (hover) */}
              <button
                onClick={() => handleDelete(item.id)}
                disabled={isPending}
                className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                title="Delete Article"
              >
                <Trash2 size={14} />
              </button>

              <div className="relative w-full sm:w-40 h-28 shrink-0 rounded-xl overflow-hidden border border-primary-cream/80 bg-light-bg/50">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1.5 flex-grow flex flex-col justify-center pr-8">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-deep-green font-bold flex items-center gap-1.5">
                    <Clock size={12} />
                    {new Date(item.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </span>
                  {item.isFeatured && (
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                      <Sparkles size={10} />
                      Featured
                    </span>
                  )}
                </div>
                <h4 className="font-extrabold text-base sm:text-lg text-dark-text hover:text-deep-green transition-colors leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-dark-text/60 line-clamp-1 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
