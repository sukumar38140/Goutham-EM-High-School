import { prisma } from "@/lib/db";
import GalleryManager from "./GalleryManager";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-dark-text tracking-tight">Gallery Showcase Management</h1>
        <p className="text-xs sm:text-sm text-dark-text/50 mt-0.5">
          Upload and categorize photos of student assemblies, sports festivals, laboratories, and classroom operations.
        </p>
      </div>

      <GalleryManager initialItems={items} />
    </div>
  );
}
