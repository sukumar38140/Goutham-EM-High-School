"use client";

import { useState, useTransition } from "react";
import { updateAdmissionStatusAction } from "@/app/actions";
import {
  Search,
  CheckCircle,
  XCircle,
  FileText,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Eye
} from "lucide-react";

interface Document {
  name: string;
  url: string;
}

interface Application {
  id: string;
  applicationNumber: string;
  studentName: string;
  dateOfBirth: string;
  gender: string;
  gradeApplied: string;
  academicYear: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
  documents: string; // JSON string
  status: string;
  createdAt: Date;
}

interface AdmissionsManagerProps {
  initialApplications: Application[];
}

export default function AdmissionsManager({ initialApplications }: AdmissionsManagerProps) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    if (!confirm(`Are you sure you want to change this application status to ${newStatus}?`)) return;
    
    startTransition(async () => {
      const result = await updateAdmissionStatusAction(id, newStatus);
      if (result.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      } else {
        alert(result.message || "Failed to update status.");
      }
    });
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "ALL" || app.status.toUpperCase() === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "REVIEWING":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "APPROVED":
        return "bg-green-50 text-green-700 border-green-200";
      case "REJECTED":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: List & Filters (7 cols or full if no selection) */}
      <div className={`${selectedApp ? "lg:col-span-7" : "lg:col-span-12"} space-y-6`}>
        {/* Search & Filter header */}
        <div className="bg-white border border-primary-cream p-5 rounded-2xl shadow-sm space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-dark-text/40">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search by student name, parent, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["ALL", "PENDING", "REVIEWING", "APPROVED", "REJECTED"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === status
                    ? "bg-campus-green text-white shadow-sm"
                    : "bg-light-bg text-dark-text/60 hover:bg-primary-cream/50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white border border-primary-cream rounded-2xl overflow-hidden shadow-sm">
          {filteredApps.length === 0 ? (
            <div className="text-center py-16 text-xs text-dark-text/40 font-semibold">
              No applications match this search or filter.
            </div>
          ) : (
            <div className="divide-y divide-primary-cream/50">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-primary-cream/20 transition-colors ${
                    selectedApp?.id === app.id ? "bg-primary-cream/35" : ""
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm sm:text-base text-dark-text truncate">
                        {app.studentName}
                      </span>
                      <span className={`px-2.5 py-0.5 border rounded-full text-[9px] font-extrabold uppercase ${getStatusStyle(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 text-xs text-dark-text/50 font-semibold">
                      <span>ID: {app.applicationNumber}</span>
                      <span>•</span>
                      <span>Grade: {app.gradeApplied}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedApp(app);
                    }}
                    className="p-2 text-dark-text/40 hover:text-deep-green hover:bg-light-bg rounded-lg transition-colors"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Review Panel (5 cols) */}
      {selectedApp && (
        <div className="lg:col-span-5 bg-white border border-primary-cream rounded-3xl p-6 sm:p-8 shadow-lg space-y-6 animate-fadeIn relative">
          <button
            onClick={() => setSelectedApp(null)}
            className="absolute top-4 right-4 text-xs font-bold text-dark-text/45 hover:text-dark-text uppercase tracking-wider"
          >
            Close
          </button>

          <div className="border-b border-primary-cream pb-5">
            <span className="text-[10px] text-campus-green font-extrabold uppercase tracking-widest block mb-1">Application Review</span>
            <h3 className="text-xl font-black text-dark-text tracking-tight">{selectedApp.studentName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-dark-text/40 font-bold">ID: {selectedApp.applicationNumber}</span>
              <span className={`px-2.5 py-0.5 border rounded-full text-[9px] font-extrabold uppercase ${getStatusStyle(selectedApp.status)}`}>
                {selectedApp.status}
              </span>
            </div>
          </div>

          {/* Student Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-dark-text/40 mb-1">Student Details</h4>
            <div className="grid grid-cols-2 gap-4 text-xs text-dark-text/75 font-semibold">
              <div>
                <span className="block text-[10px] text-dark-text/40 uppercase">Date of Birth</span>
                <span>{selectedApp.dateOfBirth}</span>
              </div>
              <div>
                <span className="block text-[10px] text-dark-text/40 uppercase">Gender</span>
                <span>{selectedApp.gender}</span>
              </div>
              <div>
                <span className="block text-[10px] text-dark-text/40 uppercase">Applied Grade</span>
                <span>{selectedApp.gradeApplied}</span>
              </div>
              <div>
                <span className="block text-[10px] text-dark-text/40 uppercase">Academic Year</span>
                <span>{selectedApp.academicYear}</span>
              </div>
            </div>
          </div>

          {/* Parent Details */}
          <div className="space-y-3 border-t border-primary-cream/50 pt-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-dark-text/40 mb-1">Parent & Address Info</h4>
            <div className="space-y-2 text-xs text-dark-text/75 font-semibold">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-dark-text/40" />
                <span>Parent: {selectedApp.parentName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-dark-text/40" />
                <a href={`mailto:${selectedApp.parentEmail}`} className="hover:underline text-deep-green">{selectedApp.parentEmail}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-dark-text/40" />
                <a href={`tel:${selectedApp.parentPhone}`} className="hover:underline text-deep-green">{selectedApp.parentPhone}</a>
              </div>
              <div className="flex gap-2 items-start">
                <MapPin size={14} className="text-dark-text/40 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{selectedApp.address}</span>
              </div>
            </div>
          </div>

          {/* Uploaded Documents */}
          <div className="space-y-3 border-t border-primary-cream/50 pt-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-dark-text/40 mb-2">Uploaded Attachments</h4>
            {(() => {
              try {
                const docs: Document[] = JSON.parse(selectedApp.documents);
                if (docs.length === 0) return <span className="text-xs text-dark-text/40 italic">No attachments.</span>;
                return (
                  <div className="space-y-2">
                    {docs.map((doc, idx) => (
                      <a
                        key={idx}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl border border-primary-cream/80 bg-light-bg/40 text-xs font-semibold text-dark-text/75 hover:bg-primary-cream/40 transition-colors"
                      >
                        <span className="truncate pr-4 flex items-center gap-2">
                          <FileText size={14} className="text-campus-green" />
                          {doc.name}
                        </span>
                        <span className="text-deep-green font-bold text-[10px] shrink-0 uppercase">View File</span>
                      </a>
                    ))}
                  </div>
                );
              } catch {
                return <span className="text-xs text-red-500">Error parsing attachments record.</span>;
              }
            })()}
          </div>

          {/* Action Triggers */}
          <div className="border-t border-primary-cream pt-6 flex gap-3">
            {isPending ? (
              <div className="w-full flex items-center justify-center gap-2 text-xs font-bold text-dark-text/40 py-3">
                <Loader2 size={16} className="animate-spin" /> Saving changes...
              </div>
            ) : (
              <>
                {selectedApp.status !== "APPROVED" && (
                  <button
                    onClick={() => handleStatusUpdate(selectedApp.id, "APPROVED")}
                    className="w-1/2 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-colors"
                  >
                    <CheckCircle size={14} /> Approve Seat
                  </button>
                )}
                {selectedApp.status === "PENDING" && (
                  <button
                    onClick={() => handleStatusUpdate(selectedApp.id, "REVIEWING")}
                    className="w-1/2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-colors"
                  >
                    <Clock size={14} /> Mark Reviewing
                  </button>
                )}
                {selectedApp.status !== "REJECTED" && (
                  <button
                    onClick={() => handleStatusUpdate(selectedApp.id, "REJECTED")}
                    className={`flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-colors ${
                      selectedApp.status === "APPROVED" ? "w-full" : "w-1/2"
                    }`}
                  >
                    <XCircle size={14} /> Reject Application
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
