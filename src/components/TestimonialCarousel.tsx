"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "Goutham School has transformed my daughter's confidence. The combination of smart classrooms, caring teachers, and structured sports programs provides a truly holistic development environment.",
    author: "Mr. Sandeep Deshmukh",
    role: "Parent of Class VIII Student",
    stars: 5,
  },
  {
    quote: "The science laboratories and computer rooms are state of the art. My teachers guided me through national science exhibitions and supported my goals all the way to engineering admission.",
    author: "Nikhil Rao",
    role: "Alumni, Batch of 2024",
    stars: 5,
  },
  {
    quote: "Sending our twins to Goutham School was the best educational decision we made. The focus on safety and security combined with activity-based learning is exactly what young kids need.",
    author: "Mrs. Priya Hegde",
    role: "Parent of Class III Students",
    stars: 5,
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((curr) => (curr === 0 ? testimonials.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrent((curr) => (curr === testimonials.length - 1 ? 0 : curr + 1));
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 text-primary-cream/40 -translate-x-6 -translate-y-6 hidden sm:block">
        <Quote size={120} className="fill-current" />
      </div>

      <div className="relative bg-white border border-primary-cream/80 rounded-3xl p-8 sm:p-12 shadow-xl overflow-hidden">
        {/* Stars */}
        <div className="flex justify-center gap-1 mb-6 text-yellow-400">
          {Array.from({ length: testimonials[current].stars }).map((_, i) => (
            <Star key={i} size={20} className="fill-current" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-lg sm:text-xl text-dark-text/90 italic text-center font-medium leading-relaxed mb-8">
          &quot;{testimonials[current].quote}&quot;
        </p>

        {/* Profile */}
        <div className="text-center">
          <h4 className="font-extrabold text-dark-text text-base sm:text-lg">
            {testimonials[current].author}
          </h4>
          <p className="text-xs sm:text-sm text-deep-green font-semibold uppercase tracking-wider mt-1">
            {testimonials[current].role}
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="p-3 bg-primary-cream text-dark-text hover:bg-campus-green hover:text-white rounded-full transition-all duration-300 focus:outline-none"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="p-3 bg-primary-cream text-dark-text hover:bg-campus-green hover:text-white rounded-full transition-all duration-300 focus:outline-none"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
