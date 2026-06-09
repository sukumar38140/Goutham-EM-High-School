import { prisma } from "@/lib/db";
import EventsManager from "./EventsManager";
import { Event as PrismaEvent } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  let events: PrismaEvent[] = [];
  try {
    events = await prisma.event.findMany({
      orderBy: { date: "asc" }
    });
  } catch (error) {
    console.error("Events page fetch error:", error);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-dark-text tracking-tight">Events Management</h1>
        <p className="text-xs sm:text-sm text-dark-text/50 mt-0.5">
          Schedule academic dates, science fairs, parent-teacher committee meetings, and display them in the website schedules.
        </p>
      </div>

      <EventsManager initialEvents={events} />
    </div>
  );
}
