"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { addFacultyAction, deleteFacultyAction } from "@/app/actions";
import { Plus, Trash2, Loader2, GraduationCap, Clock, Award, Users } from "lucide-react";

interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  department: string;
  imageUrl: string;
  displayOrder: number;
}

interface FacultyManagerProps {
  initialFaculty: FacultyMember[];
}

export default function FacultyManager({ initialFaculty }: FacultyManagerProps) {
  const [faculty, setFaculty] = useState<FacultyMember[]>(initialFaculty);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAddFaculty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await addFacultyAction(formData);
      if (result.success) {
        // Refresh page or reload items (simplest is forcing reload or letting server cache revalidate)
        alert(result.message || "Faculty member added!");
        window.location.reload(); // Quick sync
      } else {
        alert(result.message || "Failed to add faculty.");
      }
    });
  };

  const handleDeleteFaculty = async (id: string) => {
    if (!confirm("Are you sure you want to remove this faculty member?")) return;

    startTransition(async () => {
      const result = await deleteFacultyAction(id);
      if (result.success) {
        setFaculty((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(result.message || "Failed to delete.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex justify-between items-center bg-white border border-primary-cream p-5 rounded-2xl shadow-sm">
        <span className="text-xs font-bold text-dark-text/50 uppercase tracking-wider">
          Currently managing: {faculty.length} teachers
        </span>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-campus-green hover:bg-deep-green text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <Plus size={16} /> Add Faculty
        </button>
      </div>

      {/* Add Faculty Form (Conditional) */}
      {showAddForm && (
        <form
          onSubmit={handleAddFaculty}
          className="bg-white border border-primary-cream rounded-3xl p-6 sm:p-8 shadow-lg space-y-5 animate-fadeIn"
        >
          <h3 className="font-extrabold text-lg text-dark-text">Register New Teacher</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Teacher Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Mrs. Priya Sen"
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Designation / Role *</label>
              <input
                type="text"
                name="designation"
                required
                placeholder="e.g. Senior Biology Mentor"
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Qualifications *</label>
              <input
                type="text"
                name="qualification"
                required
                placeholder="e.g. M.Sc, B.Ed"
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Years Experience *</label>
              <input
                type="text"
                name="experience"
                required
                placeholder="e.g. 10 Years"
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Department *</label>
              <select
                name="department"
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
              >
                <option value="Administration">Administration</option>
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Languages">Languages</option>
                <option value="Social Sciences">Social Sciences</option>
                <option value="Sports">Sports</option>
                <option value="Arts & Activities">Arts & Activities</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Display Order Number</label>
              <input
                type="number"
                name="displayOrder"
                defaultValue={0}
                className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Profile Avatar Picture</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full px-3 py-2.5 rounded-xl border border-dark-text/10 bg-light-bg text-xs font-semibold"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
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
              Publish Profile
            </button>
          </div>
        </form>
      )}

      {/* Faculty list grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty.map((member) => (
          <div
            key={member.id}
            className="bg-white border border-primary-cream p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative group"
          >
            {/* Delete button (hover) */}
            <button
              onClick={() => handleDeleteFaculty(member.id)}
              disabled={isPending}
              className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
              title="Delete Profile"
            >
              <Trash2 size={16} />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-primary-cream/80 bg-white">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-dark-text">{member.name}</h4>
                  <span className="text-[10px] text-deep-green font-bold uppercase tracking-wider block">
                    {member.designation}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-primary-cream/40 pt-4 text-xs text-dark-text/70">
                <div className="flex items-center gap-2">
                  <GraduationCap size={14} className="text-dark-text/40 shrink-0" />
                  <span>{member.qualification}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-dark-text/40 shrink-0" />
                  <span>{member.experience} Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-dark-text/40 shrink-0" />
                  <span>Dept: {member.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={14} className="text-dark-text/40 shrink-0" />
                  <span>Sort Order: #{member.displayOrder}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
