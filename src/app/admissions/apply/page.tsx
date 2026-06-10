"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Search,
  Trash2,
  Paperclip
} from "lucide-react";

export default function ApplyAdmissionPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appId, setAppId] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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
    // Clear validation error when typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      if (validationErrors.files) {
        setValidationErrors((prev) => {
          const next = { ...prev };
          delete next.files;
          return next;
        });
      }
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!formData.studentName.trim()) {
      errors.studentName = "Student full name is required.";
    }
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!formData.parentName.trim()) {
      errors.parentName = "Parent/Guardian full name is required.";
    }
    if (!formData.parentEmail.trim()) {
      errors.parentEmail = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      errors.parentEmail = "Please enter a valid email address.";
    }
    if (!formData.parentPhone.trim()) {
      errors.parentPhone = "Phone number is required.";
    } else {
      const cleanPhone = formData.parentPhone.replace(/[\s\-()]/g, "");
      if (!/^\d{10}$/.test(cleanPhone)) {
        errors.parentPhone = "Please enter a valid 10-digit mobile number.";
      }
    }
    if (!formData.address.trim()) {
      errors.address = "Residential address is required.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errors: Record<string, string> = {};
    if (files.length === 0) {
      errors.files = "Please upload at least one document to proceed.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;
    
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

  // Restrict to Nursery - Class 10 (as requested: Nursery to 10th)
  const grades = [
    "Nursery", "LKG", "UKG", 
    "Class I", "Class II", "Class III", "Class IV", "Class V", 
    "Class VI", "Class VII", "Class VIII", "Class IX", "Class X"
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

        {/* Multi-step Form Content Container */}
        <div className="bg-white border border-primary-cream rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: STUDENT INFO */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-dark-text flex items-center gap-3">
                    <User className="text-campus-green" /> Student Information
                  </h2>
                  <p className="text-xs sm:text-sm text-dark-text/50">Enter the basic details of the child applying for admission.</p>
                </div>
                
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
                      className={`w-full px-4 py-3 rounded-xl border bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium transition-colors ${
                        validationErrors.studentName ? "border-red-400 focus:border-red-500" : "border-dark-text/10"
                      }`}
                    />
                    {validationErrors.studentName && (
                      <span className="text-red-500 text-[11px] font-bold mt-1 block">{validationErrors.studentName}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        required
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium transition-colors ${
                          validationErrors.dateOfBirth ? "border-red-400 focus:border-red-500" : "border-dark-text/10"
                        }`}
                      />
                      {validationErrors.dateOfBirth && (
                        <span className="text-red-500 text-[11px] font-bold mt-1 block">{validationErrors.dateOfBirth}</span>
                      )}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-campus-green text-white hover:bg-deep-green font-bold text-sm py-3.5 rounded-xl shadow-md transition-colors"
                >
                  Continue to Parent Info
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {/* STEP 2: PARENT DETAILS */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-dark-text flex items-center gap-3">
                    <Users className="text-campus-green" /> Parent & Address Info
                  </h2>
                  <p className="text-xs sm:text-sm text-dark-text/50">Enter the contact information of the student&apos;s legal guardian.</p>
                </div>

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
                      className={`w-full px-4 py-3 rounded-xl border bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium transition-colors ${
                        validationErrors.parentName ? "border-red-400 focus:border-red-500" : "border-dark-text/10"
                      }`}
                    />
                    {validationErrors.parentName && (
                      <span className="text-red-500 text-[11px] font-bold mt-1 block">{validationErrors.parentName}</span>
                    )}
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
                        className={`w-full px-4 py-3 rounded-xl border bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium transition-colors ${
                          validationErrors.parentEmail ? "border-red-400 focus:border-red-500" : "border-dark-text/10"
                        }`}
                      />
                      {validationErrors.parentEmail && (
                        <span className="text-red-500 text-[11px] font-bold mt-1 block">{validationErrors.parentEmail}</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Phone Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        name="parentPhone"
                        required
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        placeholder="e.g. 9876543210"
                        className={`w-full px-4 py-3 rounded-xl border bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium transition-colors ${
                          validationErrors.parentPhone ? "border-red-400 focus:border-red-500" : "border-dark-text/10"
                        }`}
                      />
                      {validationErrors.parentPhone && (
                        <span className="text-red-500 text-[11px] font-bold mt-1 block">{validationErrors.parentPhone}</span>
                      )}
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
                      className={`w-full px-4 py-3 rounded-xl border bg-light-bg focus:border-campus-green focus:outline-none text-sm font-medium resize-none transition-colors ${
                        validationErrors.address ? "border-red-400 focus:border-red-500" : "border-dark-text/10"
                      }`}
                    ></textarea>
                    {validationErrors.address && (
                      <span className="text-red-500 text-[11px] font-bold mt-1 block">{validationErrors.address}</span>
                    )}
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
                    className="w-1/2 flex items-center justify-center gap-2 bg-campus-green text-white hover:bg-deep-green font-bold text-sm py-3.5 rounded-xl shadow-md transition-colors"
                  >
                    Next Step <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: DOCUMENT UPLOAD */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-dark-text flex items-center gap-3">
                    <Upload className="text-campus-green" /> Upload Documents
                  </h2>
                  <p className="text-xs sm:text-sm text-dark-text/50">Upload copy of student Birth Certificate and previous report cards.</p>
                </div>

                <div className="pt-2">
                  <div className="border-2 border-dashed border-primary-cream/80 hover:border-campus-green rounded-2xl p-8 text-center bg-light-bg/50 transition-colors cursor-pointer relative group">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="mx-auto text-campus-green group-hover:scale-110 transition-transform mb-3 animate-bounce" size={28} />
                    <span className="block text-sm font-extrabold text-dark-text mb-1">Click to Upload Files</span>
                    <span className="block text-xs text-dark-text/40">Select multiple PDF or Image files (Max 5MB each)</span>
                  </div>
                  {validationErrors.files && (
                    <span className="text-red-500 text-[11px] font-bold mt-2 block text-center">{validationErrors.files}</span>
                  )}

                  {/* File List with delete option */}
                  {files.length > 0 && (
                    <div className="mt-5 border border-primary-cream rounded-xl p-4 bg-light-bg/30 space-y-2.5">
                      <span className="block text-[10px] font-bold text-dark-text/40 uppercase tracking-wider">Uploaded Documents ({files.length}):</span>
                      <div className="divide-y divide-primary-cream/50 max-h-44 overflow-y-auto pr-1">
                        {files.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between py-2 text-xs text-dark-text/75 font-semibold">
                            <div className="flex items-center gap-2 max-w-[75%]">
                              <Paperclip size={13} className="text-deep-green shrink-0" />
                              <span className="truncate" title={file.name}>{file.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-dark-text/40">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                              <button
                                type="button"
                                onClick={() => removeFile(idx)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                                title="Remove File"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
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
              </motion.div>
            )}

            {/* STEP 4: CONFIRMATION */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6 py-6"
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
