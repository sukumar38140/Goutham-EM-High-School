"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

interface HomeGalleryProps {
  initialItems: GalleryItem[];
}

const categories = ["ALL", "CAMPUS", "SPORTS", "EVENTS", "LABS"];

export default function HomeGallery({ initialItems }: HomeGalleryProps) {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredItems = activeTab === "ALL"
    ? initialItems
    : initialItems.filter(item => item.category.toUpperCase() === activeTab);

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-2.5 rounded-full transition-all duration-300 ${
              activeTab === cat
                ? "bg-campus-green text-white shadow-md"
                : "bg-primary-cream/80 text-dark-text/75 hover:bg-campus-green hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center text-dark-text/50 py-12 font-semibold">
          No images uploaded in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="group relative h-64 sm:h-72 overflow-hidden rounded-2xl border border-primary-cream/85 shadow-md card-hover"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Premium Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-text via-dark-text/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs text-sky-blue font-bold tracking-wider uppercase mb-1">
                  {item.category}
                </span>
                <h4 className="text-white font-extrabold text-base sm:text-lg tracking-wide">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
