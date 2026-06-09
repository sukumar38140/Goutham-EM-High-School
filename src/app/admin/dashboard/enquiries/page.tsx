import { prisma } from "@/lib/db";
import EnquiriesManager from "./EnquiriesManager";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-dark-text tracking-tight">Contact Enquiries</h1>
        <p className="text-xs sm:text-sm text-dark-text/50 mt-0.5">
          View messages submitted via school contact forms, track query leads, and toggle read/unread status.
        </p>
      </div>

      <EnquiriesManager initialEnquiries={enquiries} />
    </div>
  );
}
