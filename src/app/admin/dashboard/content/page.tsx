import { prisma } from "@/lib/db";
import ContentManager from "./ContentManager";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const settings = await prisma.contentSetting.findMany();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-dark-text tracking-tight">Content & SEO Settings</h1>
        <p className="text-xs sm:text-sm text-dark-text/50 mt-0.5">
          Edit homepage headlines, stats metrics, meta tags, and global search keywords dynamically.
        </p>
      </div>

      <ContentManager initialSettings={settings} />
    </div>
  );
}
