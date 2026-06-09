import { Suspense } from "react";
import TrackAdmissionForm from "@/components/TrackAdmissionForm";

export default function TrackAdmissionPage() {
  return (
    <div className="relative w-full bg-light-bg py-16 sm:py-24 min-h-[calc(100vh-80px)] flex items-center justify-center">
      <Suspense
        fallback={
          <div className="max-w-xl w-full mx-auto px-4 text-center text-xs font-bold text-dark-text/40 py-12 bg-white border border-primary-cream rounded-3xl shadow-lg">
            Loading Application Tracker...
          </div>
        }
      >
        <TrackAdmissionForm />
      </Suspense>
    </div>
  );
}
