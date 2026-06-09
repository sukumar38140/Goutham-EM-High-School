import { prisma } from "@/lib/db";
import FacultyManager from "./FacultyManager";
import { Faculty } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminFacultyPage() {
  let faculty: Faculty[] = [];
  try {
    faculty = await prisma.faculty.findMany({
      orderBy: { displayOrder: "asc" }
    });
  } catch (error) {
    console.error("Faculty page fetch error:", error);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-dark-text tracking-tight">Faculty Management</h1>
        <p className="text-xs sm:text-sm text-dark-text/50 mt-0.5">
          Register new academic mentors, specify designations, qualifications, and order of display on the school home page.
        </p>
      </div>

      <FacultyManager initialFaculty={faculty} />
    </div>
  );
}
