"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { addGalleryItemAction, deleteGalleryItemAction } from "@/app/actions";
import { Plus, Trash2, Loader2, ImageIcon } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

interface GalleryManagerProps {
  initialItems: GalleryItem[];
}

export default function GalleryManager({ initialItems }: GalleryManagerProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [filterTab, setFilterTab] = useState("ALL");
  const [isPending, startTransition] = useTransition();

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await addGalleryItemAction(formData);
      if (result.success) {
        alert(result.message || "Image uploaded successfully!");
        window.location.reload();
      } else {
        alert(result.message || "Failed to upload image.");
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    startTransition(async () => {
      const result = await deleteGalleryItemAction(id);
      if (result.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(result.message || "Failed to delete.");
      }
    });
  };

  const filteredItems = filterTab === "ALL"
    ? items
    : items.filter((item) => item.category.toUpperCase() === filterTab);

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-primary-cream p-5 rounded-2xl shadow-sm">
        <div className="flex flex-wrap gap-2">
          {["ALL", "CAMPUS", "SPORTS", "EVENTS", "LABS"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filterTab === tab
                  ? "bg-campus-green text-white shadow-sm"
                  : "bg-light-bg text-dark-text/60 hover:bg-primary-cream/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-campus-green hover:bg-deep-green text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <Plus size={16} /> Add Image
        </button>
      </div>

      {/* Add Form (Conditional) */}
      {showForm && (
        <form
          onSubmit={handleUpload}
          className="bg-white border border-primary-cream rounded-3xl p-6 sm:p-8 shadow-lg space-y-5 animate-fadeIn"
        >
          <h3 className="font-extrabold text-lg text-dark-text flex items-center gap-2">
            <ImageIcon className="text-campus-green" size={20} />
            Upload Campus Photo
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Photo Title *</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Science Fair Project Presentation"
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Category *</label>
              <select
                name="category"
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
              >
                <option value="CAMPUS">CAMPUS</option>
                <option value="SPORTS">SPORTS</option>
                <option value="EVENTS">EVENTS</option>
                <option value="LABS">LABS</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Select Image File *</label>
            <input
              type="file"
              name="image"
              required
              accept="image/*"
              className="w-full px-3 py-2.5 rounded-xl border border-dark-text/10 bg-light-bg text-xs font-semibold"
            />
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
              Start Upload
            </button>
          </div>
        </form>
      )}

      {/* Gallery list grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white border border-primary-cream rounded-2xl text-xs text-dark-text/40 font-semibold">
          No photo files match this category check.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-primary-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group flex flex-col"
            >
              <div className="relative h-48 w-full bg-light-bg">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={isPending}
                  className="absolute top-3 right-3 p-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg shadow-md transition-colors disabled:opacity-50"
                  title="Delete Image"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[10px] text-deep-green font-extrabold uppercase tracking-widest block">
                  {item.category}
                </span>
                <h4 className="font-bold text-sm text-dark-text line-clamp-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
