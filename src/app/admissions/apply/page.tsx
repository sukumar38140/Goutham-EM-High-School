"use client";

import { useState } from "react";
import Link from "next/link";
import { submitAdmissionAction } from "@/app/actions";
import {
  ArrowRight,
  ArrowLeft,
  User,
  Users,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Search
} from "lucide-react";

export default function ApplyAdmissionPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appId, setAppId] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    gender: "Male",
    gradeApplied: "Nursery",
    academicYear: "2026-2027",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    address: ""
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("studentName", formData.studentName);
      data.append("dateOfBirth", formData.dateOfBirth);
      data.append("gender", formData.gender);
      data.append("gradeApplied", formData.gradeApplied);
      data.append("academicYear", formData.academicYear);
      data.append("parentName", formData.parentName);
      data.append("parentEmail", formData.parentEmail);
      data.append("parentPhone", formData.parentPhone);
      data.append("address", formData.address);

      files.forEach((file) => {
        data.append("documents", file);
      });

      const response = await submitAdmissionAction(data);
      if (response.success && response.applicationNumber) {
        setAppId(response.applicationNumber);
        setStep(4);
      } else {
        setError(response.message);
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Failed to submit admission application.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const grades = [
    "Nursery", "LKG", "UKG", 
    "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", 
    "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11"
  ];

  return (
    <div className="relative w-full bg-light-bg py-16 sm:py-24 min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-4">
        {/* Step Indicator Header */}
        {step < 4 && (
          <div className="flex justify-between items-center mb-8 bg-white border border-primary-cream px-6 py-4 rounded-2xl shadow-sm">
            {[
              { num: 1, label: "Student Info" },
              { num: 2, label: "Parent Details" },
              { num: 3, label: "Upload Docs" }
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s.num
                      ? "bg-campus-green text-white"
                      : "bg-primary-cream text-dark-text/40"
                  }`}
                >
                  {s.num}
                </span>
                <span
                  className={`text-xs font-extrabold hidden sm:block ${
                    step >= s.num ? "text-dark-text" : "text-dark-text/40"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-sm flex gap-3 items-start mb-6">
            <AlertCircle className="shrink-0 mt-0.5 text-red-600" size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Multi-step Form Content */}
        <div className="bg-white border border-primary-cream rounded-3xl p-6 sm:p-10 shadow-lg">
          {/* STEP 1: STUDENT INFO */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-dark-text flex items-center gap-3">
                <User className="text-campus-green" /> Student Information
              </h2>
              <p className="text-xs sm:text-sm text-dark-text/50">Enter the basic details of the child applying for admission.</p>
              
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Student Full Name *</label>
                  <input
                    type="text"
                    name="studentName"
                    required
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="Enter student's full name"
                    className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Gender *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Grade Applied *</label>
                    <select
                      name="gradeApplied"
                      value={formData.gradeApplied}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium"
                    >
                      {grades.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Academic Year *</label>
                    <select
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium"
                    >
                      <option value="2026-2027">2026–2027</option>
                      <option value="2027-2028">2027–2028</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.studentName || !formData.dateOfBirth}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-campus-green text-white hover:bg-deep-green font-bold text-sm py-3.5 rounded-xl shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Parent Info
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* STEP 2: PARENT DETAILS */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-dark-text flex items-center gap-3">
                <Users className="text-campus-green" /> Parent & Address Info
              </h2>
              <p className="text-xs sm:text-sm text-dark-text/50">Enter the contact information of the student&apos;s legal guardian.</p>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Parent/Guardian Full Name *</label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="Enter parent's full name"
                    className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="parentEmail"
                      required
                      value={formData.parentEmail}
                      onChange={handleInputChange}
                      placeholder="parent@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="parentPhone"
                      required
                      value={formData.parentPhone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Residential Address *</label>
                  <textarea
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter full home address..."
                    className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-1/2 flex items-center justify-center gap-2 bg-light-bg border border-primary-cream text-dark-text font-extrabold text-sm py-3.5 rounded-xl transition-colors"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.parentName || !formData.parentEmail || !formData.parentPhone || !formData.address}
                  className="w-1/2 flex items-center justify-center gap-2 bg-campus-green text-white hover:bg-deep-green font-bold text-sm py-3.5 rounded-xl shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DOCUMENT UPLOAD */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-dark-text flex items-center gap-3">
                <Upload className="text-campus-green" /> Upload Documents
              </h2>
              <p className="text-xs sm:text-sm text-dark-text/50">Upload copy of student Birth Certificate and/or transfer certificates.</p>

              <div className="pt-2">
                <div className="border-2 border-dashed border-primary-cream/80 hover:border-campus-green rounded-2xl p-8 text-center bg-light-bg/50 transition-colors cursor-pointer relative group">
                  <input
                    type="file"
                    multiple
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="mx-auto text-campus-green group-hover:scale-110 transition-transform mb-3 animate-bounce" size={28} />
                  <span className="block text-sm font-extrabold text-dark-text mb-1">Click to Upload Files</span>
                  <span className="block text-xs text-dark-text/40">Select multiple PDF or Image files (Max 5MB each)</span>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 border border-primary-cream rounded-xl p-4 bg-light-bg/30 space-y-2">
                    <span className="block text-xs font-bold text-dark-text/40 uppercase tracking-wider mb-1">Selected Files:</span>
                    {files.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-dark-text/75 font-semibold">
                        <span className="truncate">{file.name}</span>
                        <span className="text-dark-text/45 ml-2">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={loading}
                  className="w-1/2 flex items-center justify-center gap-2 bg-light-bg border border-primary-cream text-dark-text font-extrabold text-sm py-3.5 rounded-xl transition-colors disabled:opacity-50"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || files.length === 0}
                  className="w-1/2 flex items-center justify-center gap-2 bg-campus-green text-white hover:bg-deep-green font-bold text-sm py-3.5 rounded-xl shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION */}
          {step === 4 && (
            <div className="text-center space-y-6 py-6">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 size={36} className="fill-current bg-white rounded-full" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-text tracking-tight">Application Submitted!</h2>
              
              <div className="bg-primary-cream/40 border border-primary-cream rounded-2xl p-6 space-y-2">
                <span className="text-xs text-dark-text/50 uppercase tracking-widest font-extrabold block">Your Application Tracking ID</span>
                <span className="text-2xl font-black text-deep-green block tracking-wider">{appId}</span>
              </div>
              
              <p className="text-xs sm:text-sm text-dark-text/60 leading-relaxed max-w-sm mx-auto">
                Please save this ID carefully. You will need it to track the review progress and admission interview schedules.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/admissions/track?id=${appId}`}
                  className="flex items-center justify-center gap-2 bg-campus-green hover:bg-deep-green text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-sm transition-colors"
                >
                  <Search size={16} /> Track Application Status
                </Link>
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 bg-light-bg border border-primary-cream hover:bg-primary-cream/50 text-dark-text font-extrabold text-sm px-6 py-3.5 rounded-xl transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
