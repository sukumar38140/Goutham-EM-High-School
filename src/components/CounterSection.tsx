"use client";

import { useEffect, useState, useRef } from "react";
import { Users, GraduationCap, CalendarDays, Award, LucideIcon } from "lucide-react";

interface StatItem {
  label: string;
  target: number;
  suffix: string;
  icon: LucideIcon;
}

const statsData: StatItem[] = [
  { label: "Enrolled Students", target: 5000, suffix: "+", icon: Users },
  { label: "Expert Faculty", target: 150, suffix: "+", icon: GraduationCap },
  { label: "Years of Excellence", target: 25, suffix: "+", icon: CalendarDays },
  { label: "Student Development", target: 100, suffix: "%", icon: Award },
];

export default function CounterSection() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 2000; // 2 seconds animation
    const steps = 50;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      setCounts(
        statsData.map((stat) => {
          const progress = stepCount / steps;
          const currentCount = Math.min(Math.floor(stat.target * progress), stat.target);
          return currentCount;
        })
      );

      if (stepCount >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [hasAnimated]);

  return (
    <div
      ref={sectionRef}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      {statsData.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/60 shadow-lg text-center flex flex-col items-center group transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]"
          >
            <div className="p-3 bg-primary-cream rounded-xl text-deep-green group-hover:bg-campus-green group-hover:text-white transition-colors duration-300 mb-4">
              <Icon size={24} />
            </div>
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-text tracking-tight mb-2">
              {counts[idx]}
              {stat.suffix}
            </span>
            <span className="text-xs sm:text-sm font-bold text-dark-text/60 uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
