import { prisma } from "@/lib/db";
import AdmissionsManager from "./AdmissionsManager";
import { Admission } from "@prisma/client";

// Force dynamic fetch to avoid static page caching issues in dashboard
export const dynamic = "force-dynamic";

export default async function AdminAdmissionsPage() {
  // Query all admissions applications safely
  let applications: Admission[] = [];
  try {
    applications = await prisma.admission.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Admissions page fetch error:", error);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-dark-text tracking-tight">Admissions Management</h1>
        <p className="text-xs sm:text-sm text-dark-text/50 mt-0.5">
          Review online registration files, verify uploaded certificates, and manage seats approval status.
        </p>
      </div>

      <AdmissionsManager initialApplications={applications} />
    </div>
  );
}
