"use client";

import { useState, useTransition } from "react";
import { addEventAction, deleteEventAction } from "@/app/actions";
import { Plus, Trash2, Loader2, CalendarDays, MapPin, ClipboardList } from "lucide-react";

interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  registrationCount: number;
}

interface EventsManagerProps {
  initialEvents: SchoolEvent[];
}

export default function EventsManager({ initialEvents }: EventsManagerProps) {
  const [events, setEvents] = useState<SchoolEvent[]>(initialEvents);
  const [showForm, setShowForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSchedule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await addEventAction(formData);
      if (result.success) {
        alert(result.message || "Event scheduled successfully!");
        window.location.reload();
      } else {
        alert(result.message || "Failed to schedule event.");
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this event?")) return;

    startTransition(async () => {
      const result = await deleteEventAction(id);
      if (result.success) {
        setEvents((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(result.message || "Failed to delete.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex items-center justify-between bg-white border border-primary-cream p-5 rounded-2xl shadow-sm">
        <span className="text-xs font-bold text-dark-text/50 uppercase tracking-wider">
          Currently managing: {events.length} activities
        </span>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-campus-green hover:bg-deep-green text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <Plus size={16} /> Schedule Event
        </button>
      </div>

      {/* Schedule Form (Conditional) */}
      {showForm && (
        <form
          onSubmit={handleSchedule}
          className="bg-white border border-primary-cream rounded-3xl p-6 sm:p-8 shadow-lg space-y-5 animate-fadeIn"
        >
          <h3 className="font-extrabold text-lg text-dark-text flex items-center gap-2">
            <CalendarDays className="text-campus-green" size={20} />
            Schedule New Activity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Event Title *</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Science Laboratory Exhibition 2026"
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Location / Venue *</label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g. Main Auditorium Hall"
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Event Date *</label>
              <input
                type="date"
                name="date"
                required
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Brief Description *</label>
              <input
                type="text"
                name="description"
                required
                placeholder="e.g. Student assemblies display innovations across Python programming projects..."
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-light-bg border border-primary-cream hover:bg-primary-cream/50 text-dark-text font-bold text-xs px-5 py-3 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-campus-green hover:bg-deep-green text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              {isPending && <Loader2 size={14} className="animate-spin" />}
              Publish Event
            </button>
          </div>
        </form>
      )}

      {/* Events list */}
      {events.length === 0 ? (
        <div className="text-center py-16 bg-white border border-primary-cream rounded-2xl text-xs text-dark-text/40 font-semibold">
          No activities scheduled yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => {
            const eventDate = new Date(event.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleString("en-IN", { month: "short" });
            
            return (
              <div
                key={event.id}
                className="bg-white border border-primary-cream p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative group flex gap-4 items-center"
              >
                {/* Cancel/Delete */}
                <button
                  onClick={() => handleDelete(event.id)}
                  disabled={isPending}
                  className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  title="Cancel Event"
                >
                  <Trash2 size={14} />
                </button>

                <div className="w-14 h-14 bg-primary-cream rounded-xl text-deep-green flex flex-col items-center justify-center shrink-0 border border-primary-cream">
                  <span className="text-lg font-black leading-none">{day}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">{month}</span>
                </div>
                
                <div className="space-y-1.5 min-w-0 pr-8">
                  <h4 className="font-extrabold text-sm sm:text-base text-dark-text truncate">
                    {event.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-dark-text/50 font-semibold">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {event.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <ClipboardList size={12} />
                      {event.registrationCount} registered
                    </span>
                  </div>
                  <p className="text-xs text-dark-text/60 line-clamp-1">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
