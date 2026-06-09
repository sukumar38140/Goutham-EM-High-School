import Image from "next/image";
import { BookOpen, Compass, Award, CheckCircle2, ChevronRight } from "lucide-react";

export default function AcademicsPage() {
  return (
    <div className="relative w-full bg-light-bg pb-20">
      {/* Header Banner */}
      <section className="relative bg-dark-text text-white py-16 sm:py-24 overflow-hidden border-b-4 border-campus-green">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/building.png"
            alt="Academics Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-campus-green bg-white/10 px-4 py-1 rounded-full border border-white/10">
            Academics
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Academic Curriculum</h1>
          <p className="text-sm sm:text-base text-white/75 max-w-2xl mx-auto">
            Nurturing analytical skills, physical stamina, and scientific reasoning through our structured CBSE coursework.
          </p>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-primary-cream/80 p-8 sm:p-12 rounded-3xl shadow-lg space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-text tracking-tight">
            Affiliated to Central Board of Secondary Education (CBSE)
          </h2>
          <p className="text-sm sm:text-base text-dark-text/70 leading-relaxed">
            Our curriculum conforms to the standards laid down by the CBSE, New Delhi. We utilize research-driven pedagogical methods that prioritize conceptual understanding over rote memorization. Continuous and Comprehensive Evaluation (CCE) systems are integrated into class assignments, ensuring that student development is tracked consistently across multiple criteria.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-cream text-deep-green flex items-center justify-center shrink-0">
                <BookOpen size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-dark-text text-sm mb-1">Experiential Pedagogy</h4>
                <p className="text-xs text-dark-text/60">Integrating lab experiments and smart board projects directly into lesson plans.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-cream text-deep-green flex items-center justify-center shrink-0">
                <Compass size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-dark-text text-sm mb-1">Co-Curricular Grooming</h4>
                <p className="text-xs text-dark-text/60">Creative arts, coding, and physical coaching classes are scheduled during weekly hours.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-cream text-deep-green flex items-center justify-center shrink-0">
                <Award size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-dark-text text-sm mb-1">Continuous Mentorship</h4>
                <p className="text-xs text-dark-text/60">Class teacher advisory circles meet bi-weekly to discuss individual student concerns.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Phases Detail */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-text">Academic Stages</h2>
          <p className="text-xs sm:text-sm text-dark-text/60">Providing age-appropriate learning frameworks from Nursery to Class XII.</p>
        </div>

        <div className="space-y-8">
          {[
            {
              phase: "Early Years Foundation (Nursery to UKG)",
              description: "Focused on socialization, basic language habits, number identification, fine motor controls, and vocabulary building. We avoid heavy textbooks, utilizing play materials, drawing books, and interactive singing circles to make first learning experiences enjoyable.",
              subjects: "Rhymes, Basic Alphabet, Numerical Skills, Drawing & Craft, Interactive Games"
            },
            {
              phase: "Primary School (Class I to Class V)",
              description: "Focus shifts to structural language grammar, writing skills, mathematical calculations, and environmental sciences. Students are introduced to computer labs to develop basic keyboarding and painting software skills.",
              subjects: "English, Mathematics, Environmental Science (EVS), Regional Language, Computer Studies, Moral Science"
            },
            {
              phase: "Middle School (Class VI to Class VIII)",
              description: "Introducing specific divisions of science (Physics, Chemistry, Biology) and social sciences (History, Geography, Civics). Coding basics, structured laboratories, and creative writing programs are added to prepare students for secondary schooling.",
              subjects: "English Lit, Hindi/Sanskrit, Mathematics, Physics, Chemistry, Biology, Social Sciences, Computer Coding (Python)"
            },
            {
              phase: "Secondary & Senior Secondary (Class IX to Class XII)",
              description: "Rigorous CBSE board syllabus preparation. Class mentors conduct special revision camps, Mock test series, and past-paper reviews. In Senior Secondary (Class XI & XII), students choose specific professional pathways:",
              subjects: "Science Stream (Physics, Chemistry, Math/Bio, CS), Commerce Stream (Accountancy, Business Studies, Economics, Math), Humanities Stream (Pol Science, History, Economics)"
            }
          ].map((stage, idx) => (
            <div
              key={idx}
              className="bg-white border border-primary-cream/80 p-8 rounded-3xl shadow-sm space-y-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-extrabold text-lg sm:text-xl text-dark-text flex items-center gap-2">
                <ChevronRight className="text-campus-green" size={20} />
                {stage.phase}
              </h3>
              <p className="text-xs sm:text-sm text-dark-text/70 leading-relaxed pl-7">
                {stage.description}
              </p>
              <div className="bg-primary-cream/30 border border-primary-cream rounded-xl p-4 ml-7 text-xs text-dark-text/75">
                <strong>Key Focus Areas / Subjects:</strong> {stage.subjects}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evaluation & Grading */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-text tracking-tight">
              Evaluation & Assessment
            </h2>
            <p className="text-sm text-dark-text/70 leading-relaxed">
              We conduct academic evaluations across the year divided into two semesters. For Primary and Middle school levels, assessment metrics combine written term examinations, practical lab reports, subject portfolio submissions, and classroom participation behavior.
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-dark-text/75 font-semibold">
              <li className="flex gap-2 items-center">
                <CheckCircle2 size={16} className="text-campus-green" />
                <span>Periodic Tests (PT-1 & PT-2) - conducted quarterly</span>
              </li>
              <li className="flex gap-2 items-center">
                <CheckCircle2 size={16} className="text-campus-green" />
                <span>Half-Yearly Written Exams - conducted in September</span>
              </li>
              <li className="flex gap-2 items-center">
                <CheckCircle2 size={16} className="text-campus-green" />
                <span>Annual Written Board Exams - conducted in March</span>
              </li>
              <li className="flex gap-2 items-center">
                <CheckCircle2 size={16} className="text-campus-green" />
                <span>Internal Lab Assessments & Viva Voce</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-primary-cream/80 rounded-3xl p-6 sm:p-8 shadow-md">
            <h3 className="font-extrabold text-lg text-dark-text mb-4">Grading System Outline</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-primary-cream text-dark-text/50 font-bold uppercase">
                    <th className="py-2">Marks Range</th>
                    <th className="py-2">Grade</th>
                    <th className="py-2">Performance Description</th>
                  </tr>
                </thead>
                <tbody className="text-dark-text/80 divide-y divide-primary-cream/50">
                  <tr>
                    <td className="py-2.5 font-semibold">91% – 100%</td>
                    <td className="py-2.5 font-bold text-deep-green">A1</td>
                    <td className="py-2.5">Outstanding</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">81% – 90%</td>
                    <td className="py-2.5 font-bold text-deep-green">A2</td>
                    <td className="py-2.5">Excellent</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">71% – 80%</td>
                    <td className="py-2.5 font-bold text-deep-green">B1</td>
                    <td className="py-2.5">Very Good</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">61% – 70%</td>
                    <td className="py-2.5 font-bold text-deep-green">B2</td>
                    <td className="py-2.5">Good</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">51% – 60%</td>
                    <td className="py-2.5 font-bold text-deep-green">C1</td>
                    <td className="py-2.5">Satisfactory</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">Below 33%</td>
                    <td className="py-2.5 font-bold text-red-500">D/E</td>
                    <td className="py-2.5">Needs Improvement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
