import Image from "next/image";
import Link from "next/link";
import { GraduationCap, ArrowRight, ClipboardList, CheckSquare, FileText, Search } from "lucide-react";

export default function AdmissionsPage() {
  return (
    <div className="relative w-full bg-light-bg pb-20">
      {/* Header Banner */}
      <section className="relative bg-dark-text text-white py-16 sm:py-24 overflow-hidden border-b-4 border-campus-green">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero-desktop.png"
            alt="Admissions Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-campus-green bg-white/10 px-4 py-1 rounded-full border border-white/10">
            Admissions
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Admissions Portal</h1>
          <p className="text-sm sm:text-base text-white/75 max-w-2xl mx-auto">
            Admissions open for Academic Year 2026–27. Join an institution dedicated to shaping leaders.
          </p>
        </div>
      </section>

      {/* Main Portals Cards */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Apply Now */}
          <div className="bg-white border border-primary-cream p-8 sm:p-10 rounded-3xl shadow-lg flex flex-col justify-between hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary-cream text-deep-green rounded-2xl flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
              <h3 className="font-extrabold text-2xl text-dark-text">Online Application Form</h3>
              <p className="text-sm text-dark-text/60 leading-relaxed">
                Submit a new student registration form directly using our secure portal. You will need to upload digital copies of the student&apos;s Birth Certificate and previous report cards.
              </p>
            </div>
            <Link
              href="/admissions/apply"
              className="mt-8 w-full flex items-center justify-center gap-2 bg-campus-green hover:bg-deep-green text-white font-extrabold py-4 rounded-2xl shadow-md transition-colors"
            >
              Apply Online
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Card 2: Track Status */}
          <div className="bg-white border border-primary-cream p-8 sm:p-10 rounded-3xl shadow-lg flex flex-col justify-between hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary-cream text-deep-green rounded-2xl flex items-center justify-center">
                <Search size={24} />
              </div>
              <h3 className="font-extrabold text-2xl text-dark-text">Track Application Status</h3>
              <p className="text-sm text-dark-text/60 leading-relaxed">
                If you have already submitted an admission registration, check its progress. Enter your system-generated application number (e.g. GHS-2026-XXXX) to view status updates.
              </p>
            </div>
            <Link
              href="/admissions/track"
              className="mt-8 w-full flex items-center justify-center gap-2 bg-light-bg border border-primary-cream hover:bg-primary-cream/50 text-dark-text font-extrabold py-4 rounded-2xl transition-colors"
            >
              Track Application
              <ArrowRight size={18} className="text-deep-green" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-text">The Admission Journey</h2>
          <p className="text-xs sm:text-sm text-dark-text/60">Four simple steps to register and enroll your child at Goutham School.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Online Registration", desc: "Fill out the registration details on our application portal and upload required documents." },
            { step: "02", title: "Document Review", desc: "Our admissions department reviews the forms. Successful files are invited for campus interactions." },
            { step: "03", title: "Student Interaction", desc: "A friendly, informal chat with the student and parents. Basic readiness tests for senior grades." },
            { step: "04", title: "Enrollment & Fees", desc: "Submit school fee records to confirm the seat, and pick up the student uniform/syllabus brochures." }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-primary-cream/70 p-6 rounded-2xl relative shadow-sm"
            >
              <span className="absolute top-4 right-6 text-3xl font-black text-campus-green/20">{item.step}</span>
              <h3 className="font-extrabold text-base text-dark-text mb-2 pr-8">{item.title}</h3>
              <p className="text-xs sm:text-sm text-dark-text/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Age Eligibility & Required Documents */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Eligibility */}
          <div className="bg-white border border-primary-cream/80 rounded-3xl p-6 sm:p-8 shadow-md">
            <h3 className="font-extrabold text-lg sm:text-xl text-dark-text mb-6 flex items-center gap-2">
              <ClipboardList className="text-campus-green" />
              Age Eligibility Guidelines
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-primary-cream text-dark-text/50 font-bold uppercase">
                    <th className="py-2">Class Applied</th>
                    <th className="py-2">Minimum Age</th>
                    <th className="py-2">Age Criteria as of</th>
                  </tr>
                </thead>
                <tbody className="text-dark-text/80 divide-y divide-primary-cream/50">
                  <tr>
                    <td className="py-3 font-semibold">Nursery</td>
                    <td className="py-3">3 Years</td>
                    <td className="py-3 font-medium">June 1st, 2026</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold">LKG</td>
                    <td className="py-3">4 Years</td>
                    <td className="py-3 font-medium">June 1st, 2026</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold">UKG</td>
                    <td className="py-3">5 Years</td>
                    <td className="py-3 font-medium">June 1st, 2026</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold">Class I</td>
                    <td className="py-3">6 Years</td>
                    <td className="py-3 font-medium">June 1st, 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Required Documents */}
          <div className="bg-white border border-primary-cream/80 rounded-3xl p-6 sm:p-8 shadow-md">
            <h3 className="font-extrabold text-lg sm:text-xl text-dark-text mb-6 flex items-center gap-2">
              <CheckSquare className="text-campus-green" />
              Document Preparation Checklist
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm text-dark-text/75 leading-relaxed">
              <li className="flex gap-3 items-start">
                <CheckSquare size={18} className="text-campus-green shrink-0 mt-0.5" />
                <span><strong>Student Birth Certificate:</strong> Issued by Municipal Corporation or Panchayat.</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckSquare size={18} className="text-campus-green shrink-0 mt-0.5" />
                <span><strong>Transfer Certificate (TC):</strong> Required in original for admissions from Class II onwards.</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckSquare size={18} className="text-campus-green shrink-0 mt-0.5" />
                <span><strong>Report Card / Marksheet:</strong> Digital copy of previous year assessment sheet.</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckSquare size={18} className="text-campus-green shrink-0 mt-0.5" />
                <span><strong>Passport Photos:</strong> Three recent passport size colored photographs of student & parents.</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckSquare size={18} className="text-campus-green shrink-0 mt-0.5" />
                <span><strong>Address Proof:</strong> Passport, Aadhaar, Electricity Bill, or Rental Deed.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Fee Reference Info */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="fees">
        <div className="bg-primary-cream/45 border-2 border-primary-cream rounded-3xl p-6 sm:p-10 space-y-4">
          <h3 className="font-extrabold text-lg sm:text-xl text-dark-text flex items-center gap-2">
            <FileText className="text-campus-green" />
            School Fee & Prospectus Details
          </h3>
          <p className="text-xs sm:text-sm text-dark-text/70 leading-relaxed">
            The school fee structures vary depending on the grade and co-curricular programs. We support quarterly fee payments through online banking links, demand drafts, or physical school office counters. To check detailed fee charts, schedule physical interactions, or download prospectus brochures, please contact our administrative desk at <a href="mailto:info@gouthamschool.com" className="text-deep-green font-bold underline">info@gouthamschool.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
