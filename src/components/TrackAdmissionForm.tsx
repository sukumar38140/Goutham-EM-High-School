"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getAdmissionStatusAction } from "@/app/actions";
import { Search, Loader2, Calendar, ClipboardList, CheckCircle2, XCircle, AlertCircle, Clock } from "lucide-react";

interface TrackedApplication {
  applicationNumber: string;
  studentName: string;
  gradeApplied: string;
  academicYear: string;
  status: string;
  createdAt: Date;
}

export default function TrackAdmissionForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialAppId = searchParams.get("id") || "";
  const [appId, setAppId] = useState(initialAppId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [application, setApplication] = useState<TrackedApplication | null>(null);

  const handleTrack = useCallback(async (targetId: string) => {
    if (!targetId.trim()) return;
    setLoading(true);
    setError(null);
    setApplication(null);

    try {
      const result = await getAdmissionStatusAction(targetId);
      if (result.success && result.application) {
        setApplication(result.application as unknown as TrackedApplication);
      } else {
        setError(result.message || "Failed to find application record.");
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "An error occurred during status tracking.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const queryId = searchParams.get("id");
    if (queryId) {
      const timer = setTimeout(() => {
        handleTrack(queryId);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [searchParams, handleTrack]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.replace(`/admissions/track?id=${appId}`);
    handleTrack(appId);
  };

  const getStatusDetails = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return {
          color: "text-amber-600 bg-amber-50 border-amber-200",
          progress: 1,
          description: "Your application has been received and is waiting in queue for document review."
        };
      case "REVIEWING":
        return {
          color: "text-blue-600 bg-blue-50 border-blue-200",
          progress: 2,
          description: "Our admission desk is reviewing your documents. We will contact you shortly to schedule student interactions."
        };
      case "APPROVED":
        return {
          color: "text-green-600 bg-green-50 border-green-200",
          progress: 3,
          description: "Congratulations! Your admission is approved. Please visit the school office to verify certificates and complete fee payments."
        };
      case "REJECTED":
        return {
          color: "text-red-600 bg-red-50 border-red-200",
          progress: 3,
          description: "We regret to inform you that your application could not be approved at this time due to age mismatch or seat limitations."
        };
      default:
        return { color: "text-dark-text/50 bg-light-bg border-primary-cream", progress: 0, description: "" };
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto px-4 space-y-6">
      {/* Tracking Search box */}
      <div className="bg-white border border-primary-cream rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-dark-text tracking-tight flex items-center gap-2">
          <ClipboardList className="text-campus-green" /> Track Application
        </h2>
        <p className="text-xs sm:text-sm text-dark-text/50">Enter the system-generated Application Number (e.g. GHS-2026-1001) sent to you upon submission.</p>
        
        <form onSubmit={onSubmit} className="flex gap-2 pt-2">
          <input
            type="text"
            required
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            placeholder="e.g. GHS-2026-1001"
            className="flex-grow px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-sm font-semibold tracking-wide"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-campus-green hover:bg-deep-green text-white font-extrabold px-6 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Search
          </button>
        </form>
      </div>

      {/* Error Feedback */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-sm flex gap-3 items-start shadow-sm">
          <AlertCircle className="shrink-0 mt-0.5 text-red-600" size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Result Tracking Details */}
      {application && (
        <div className="bg-white border border-primary-cream rounded-3xl p-6 sm:p-10 shadow-lg space-y-8 animate-fadeIn">
          <div className="border-b border-primary-cream pb-6 space-y-2">
            <span className="text-xs text-dark-text/40 font-bold uppercase tracking-wider block">Application Record Found</span>
            <h3 className="text-2xl font-black text-dark-text tracking-tight">{application.studentName}</h3>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-dark-text/60 pt-1">
              <span className="flex items-center gap-1"><Clock size={14} /> ID: {application.applicationNumber}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> Grade: {application.gradeApplied} ({application.academicYear})</span>
            </div>
          </div>

          {/* Status Details Box */}
          {(() => {
            const statusDetails = getStatusDetails(application.status);
            return (
              <div className="space-y-6">
                <div className={`border p-5 rounded-2xl ${statusDetails.color} flex gap-3 items-start`}>
                  {application.status === "APPROVED" && <CheckCircle2 size={20} className="shrink-0 text-green-600 mt-0.5" />}
                  {application.status === "REJECTED" && <XCircle size={20} className="shrink-0 text-red-600 mt-0.5" />}
                  {application.status !== "APPROVED" && application.status !== "REJECTED" && <Clock size={20} className="shrink-0 text-amber-600 mt-0.5" />}
                  
                  <div className="text-xs sm:text-sm">
                    <span className="font-extrabold uppercase tracking-wide block mb-1">
                      Application Status: {application.status}
                    </span>
                    <p className="leading-relaxed opacity-90">{statusDetails.description}</p>
                  </div>
                </div>

                {/* Status Progress Bar */}
                {application.status !== "REJECTED" && (
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-dark-text/40">
                      <span>Submitted</span>
                      <span>Reviewing</span>
                      <span>Approved</span>
                    </div>
                    <div className="relative h-2.5 bg-primary-cream rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-campus-green rounded-full transition-all duration-500"
                        style={{
                          width:
                            statusDetails.progress === 1
                              ? "15%"
                              : statusDetails.progress === 2
                              ? "50%"
                              : "100%"
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
