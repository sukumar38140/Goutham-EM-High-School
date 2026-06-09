"use client";

import { useState, useTransition } from "react";
import { markEnquiryReadAction } from "@/app/actions";
import { Mail, MailOpen, Phone, User, Loader2, Eye, EyeOff } from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface EnquiriesManagerProps {
  initialEnquiries: Enquiry[];
}

export default function EnquiriesManager({ initialEnquiries }: EnquiriesManagerProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [selectedEnq, setSelectedEnq] = useState<Enquiry | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleToggleRead = async (id: string, currentReadState: boolean) => {
    const nextState = !currentReadState;
    startTransition(async () => {
      const result = await markEnquiryReadAction(id, nextState);
      if (result.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, isRead: nextState } : item))
        );
        if (selectedEnq && selectedEnq.id === id) {
          setSelectedEnq((prev) => (prev ? { ...prev, isRead: nextState } : null));
        }
      } else {
        alert(result.message || "Failed to update state.");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: List (7 cols or full if no selection) */}
      <div className={`${selectedEnq ? "lg:col-span-7" : "lg:col-span-12"} space-y-4`}>
        {enquiries.length === 0 ? (
          <div className="text-center py-16 bg-white border border-primary-cream rounded-2xl text-xs text-dark-text/40 font-semibold">
            No contact enquiries submitted yet.
          </div>
        ) : (
          <div className="bg-white border border-primary-cream rounded-2xl overflow-hidden shadow-sm divide-y divide-primary-cream/50">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                onClick={() => setSelectedEnq(enq)}
                className={`p-5 cursor-pointer hover:bg-primary-cream/10 transition-colors flex items-center justify-between gap-4 ${
                  selectedEnq?.id === enq.id ? "bg-primary-cream/20" : ""
                }`}
              >
                <div className="space-y-1 min-w-0 pr-6">
                  <div className="flex items-center gap-2">
                    {!enq.isRead ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" title="Unread" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-transparent shrink-0" />
                    )}
                    <span className={`font-extrabold text-sm sm:text-base text-dark-text truncate ${!enq.isRead ? "font-black" : "opacity-75"}`}>
                      {enq.name}
                    </span>
                  </div>
                  <span className="block text-xs font-bold text-deep-green truncate">{enq.subject}</span>
                  <p className="text-xs text-dark-text/50 truncate leading-relaxed">{enq.message}</p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleRead(enq.id, enq.isRead);
                    }}
                    disabled={isPending}
                    className={`p-2 rounded-lg transition-colors border ${
                      enq.isRead
                        ? "bg-light-bg text-dark-text/40 border-primary-cream/80 hover:bg-primary-cream/40"
                        : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                    }`}
                    title={enq.isRead ? "Mark Unread" : "Mark Read"}
                  >
                    {enq.isRead ? <MailOpen size={16} /> : <Mail size={16} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Detail Panel (5 cols) */}
      {selectedEnq && (
        <div className="lg:col-span-5 bg-white border border-primary-cream rounded-3xl p-6 sm:p-8 shadow-lg space-y-6 animate-fadeIn relative">
          <button
            onClick={() => setSelectedEnq(null)}
            className="absolute top-4 right-4 text-xs font-bold text-dark-text/45 hover:text-dark-text uppercase tracking-wider"
          >
            Close
          </button>

          <div className="border-b border-primary-cream pb-5">
            <span className="text-[10px] text-campus-green font-extrabold uppercase tracking-widest block mb-1">Enquiry Details</span>
            <h3 className="text-lg font-black text-dark-text tracking-tight">{selectedEnq.subject}</h3>
            <span className="text-xs text-dark-text/40 font-bold block mt-1">
              Received: {new Date(selectedEnq.createdAt).toLocaleString("en-IN")}
            </span>
          </div>

          {/* Contact Profile */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-dark-text/40 mb-1">Sender Profile</h4>
            <div className="space-y-2 text-xs text-dark-text/75 font-semibold">
              <div className="flex items-center gap-2">
                <User size={14} className="text-dark-text/40" />
                <span>Name: {selectedEnq.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-dark-text/40" />
                <a href={`mailto:${selectedEnq.email}`} className="hover:underline text-deep-green">{selectedEnq.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-dark-text/40" />
                <a href={`tel:${selectedEnq.phone}`} className="hover:underline text-deep-green">{selectedEnq.phone}</a>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-2 border-t border-primary-cream/50 pt-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-dark-text/40 mb-1">Query Message</h4>
            <p className="text-xs sm:text-sm text-dark-text/80 leading-relaxed bg-light-bg/50 border border-primary-cream/60 p-4 rounded-xl resize-none min-h-24 whitespace-pre-line">
              &quot;{selectedEnq.message}&quot;
            </p>
          </div>

          {/* Action Trigger */}
          <div className="border-t border-primary-cream pt-6">
            {isPending ? (
              <div className="w-full flex items-center justify-center gap-2 text-xs font-bold text-dark-text/40 py-2">
                <Loader2 size={16} className="animate-spin" /> Saving changes...
              </div>
            ) : (
              <button
                onClick={() => handleToggleRead(selectedEnq.id, selectedEnq.isRead)}
                className={`w-full flex items-center justify-center gap-2 font-bold text-xs py-3 rounded-xl shadow-sm transition-colors border ${
                  selectedEnq.isRead
                    ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                    : "bg-campus-green text-white hover:bg-deep-green border-campus-green"
                }`}
              >
                {selectedEnq.isRead ? (
                  <>
                    <EyeOff size={14} /> Mark as Unread
                  </>
                ) : (
                  <>
                    <Eye size={14} /> Mark as Read
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
