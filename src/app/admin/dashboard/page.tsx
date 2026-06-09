import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  GraduationCap,
  Mail,
  Clock,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default async function AdminDashboardPage() {
  // Query operations statistics
  const totalAdmissions = await prisma.admission.count();
  const pendingAdmissions = await prisma.admission.count({ where: { status: "PENDING" } });
  const approvedAdmissions = await prisma.admission.count({ where: { status: "APPROVED" } });
  const totalEnquiries = await prisma.enquiry.count();
  const unreadEnquiries = await prisma.enquiry.count({ where: { isRead: false } });
  const facultyCount = await prisma.faculty.count();
  const galleryCount = await prisma.galleryItem.count();

  // Fetch recent applications
  const recentAdmissions = await prisma.admission.findMany({
    orderBy: { createdAt: "desc" },
    take: 5
  });

  // Fetch recent enquiries
  const recentEnquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5
  });

  const stats = [
    { name: "Total Applications", value: totalAdmissions, icon: GraduationCap, color: "text-blue-600 bg-blue-50" },
    { name: "Pending Review", value: pendingAdmissions, icon: Clock, color: "text-amber-600 bg-amber-50" },
    { name: "Approved Seats", value: approvedAdmissions, icon: CheckCircle2, color: "text-green-600 bg-green-50" },
    { name: "Unread Enquiries", value: unreadEnquiries, icon: Mail, color: "text-red-600 bg-red-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-dark-text tracking-tight">Overview Dashboard</h1>
        <p className="text-xs sm:text-sm text-dark-text/50 mt-0.5">Quick operational summary of applications, enquiries, and database items.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white border border-primary-cream p-6 rounded-2xl shadow-sm flex items-center gap-5"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <span className="text-2xl font-black text-dark-text block tracking-tight">{stat.value}</span>
                <span className="text-xs font-bold text-dark-text/40 uppercase tracking-wider">{stat.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Database Quick Stats */}
      <div className="bg-white border border-primary-cream rounded-2xl p-6 shadow-sm flex flex-wrap gap-x-8 gap-y-3 text-xs font-bold text-dark-text/60">
        <span>Active Faculty Base: <strong className="text-dark-text font-black">{facultyCount} teachers</strong></span>
        <span className="hidden sm:inline border-r border-primary-cream h-4 my-auto" />
        <span>Gallery Showcase Items: <strong className="text-dark-text font-black">{galleryCount} pictures</strong></span>
        <span className="hidden sm:inline border-r border-primary-cream h-4 my-auto" />
        <span>Total Enquiry Logs: <strong className="text-dark-text font-black">{totalEnquiries} enquiries</strong></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications Table */}
        <div className="bg-white border border-primary-cream rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-dark-text">Recent Admissions</h3>
            <Link href="/admin/dashboard/admissions" className="text-xs font-bold text-deep-green hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>

          {recentAdmissions.length === 0 ? (
            <div className="text-center py-12 text-xs text-dark-text/40 font-semibold">
              No applications submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-primary-cream text-dark-text/40 uppercase font-bold">
                    <th className="pb-3">Student Name</th>
                    <th className="pb-3">Grade</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-cream/40">
                  {recentAdmissions.map((app) => (
                    <tr key={app.id} className="text-dark-text/80">
                      <td className="py-3 font-semibold">{app.studentName}</td>
                      <td className="py-3 font-semibold">{app.gradeApplied}</td>
                      <td className="py-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            app.status === "APPROVED"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : app.status === "PENDING"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-blue-50 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href="/admin/dashboard/admissions"
                          className="text-deep-green font-bold hover:underline"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Enquiries list */}
        <div className="bg-white border border-primary-cream rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-dark-text">Recent Enquiries</h3>
            <Link href="/admin/dashboard/enquiries" className="text-xs font-bold text-deep-green hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="text-center py-12 text-xs text-dark-text/40 font-semibold">
              No enquiries submitted yet.
            </div>
          ) : (
            <div className="space-y-4">
              {recentEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className={`p-4 rounded-xl border transition-colors ${
                    enq.isRead
                      ? "bg-light-bg/40 border-primary-cream/60 text-dark-text/60"
                      : "bg-amber-50/30 border-amber-100 text-dark-text"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-xs sm:text-sm">{enq.name}</span>
                    <span className="text-[10px] font-semibold text-dark-text/45">
                      {new Date(enq.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <span className="block text-[11px] font-bold text-deep-green mb-1 truncate">{enq.subject}</span>
                  <p className="text-xs line-clamp-1 leading-relaxed text-dark-text/70">{enq.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
