import { prisma } from "@/lib/db";
import NewsManager from "./NewsManager";
import { News } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  let news: News[] = [];
  try {
    news = await prisma.news.findMany({
      orderBy: { publishedAt: "desc" }
    });
  } catch (error) {
    console.error("News page fetch error:", error);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-dark-text tracking-tight">Announcements Management</h1>
        <p className="text-xs sm:text-sm text-dark-text/50 mt-0.5">
          Write news announcements, CBSE notifications, scholarship lists, and feature them on the website homepage.
        </p>
      </div>

      <NewsManager initialNews={news} />
    </div>
  );
}
