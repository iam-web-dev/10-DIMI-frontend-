import React, { useState } from "react";
import { Clock, User, ArrowRight, ChevronRight, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useLanguage } from "../../Context/LanguageContext";
import { useData } from "../../Context/DataContext";
import { translations } from "../../Data/translations";

const Courses_main = () => {
  const { language } = useLanguage();
  const { courses, coursesCategories } = useData();
  const t = translations[language];
  const navigate = useNavigate();

  const [selectedCategoryKey, setSelectedCategoryKey] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const categories = (coursesCategories || []).map((cat) => ({
    key: cat.key,
    label: cat[language] || cat.uz,
  }));

  const handleApply = (course) => {
    const courseContent = course[language] || course["uz"];
    setSelectedCourse(null);

    let prefilledMessage = t.courses.prefill
      .replace("{teacher}", courseContent.teacher)
      .replace("{time}", courseContent.time)
      .replace("{name}", courseContent.name || courseContent.title)
      .replace("{level}", courseContent.level);

    navigate("/", {
      hash: "#form",
      state: {
        prefilledMessage: prefilledMessage,
      },
    });
  };

  const filteredCourses =
    selectedCategoryKey === "all"
      ? courses
      : courses.filter((course) => course.categoryKey === selectedCategoryKey);

  return (
    <div className="bg-[#F3F4F6] min-h-screen font-open-sans pt-10 md:pt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-[50px]">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[#04142C]/40 text-[14px] md:text-[16px] mb-4 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to="/" className="hover:text-[#04142C] transition-colors">
            {t.breadcrumbs.home}
          </Link>
          <ChevronRight size={16} />
          <span className="text-[#04142C] font-medium">{t.courses.title}</span>
        </div>

        {/* Page Title */}
        <h1 className="text-[#04142C] text-[32px] md:text-[45px] font-montserrat font-bold mb-8">
          {t.courses.title}
        </h1>

        {/* Categories Filter */}
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-3 md:gap-4 mb-12 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategoryKey(cat.key)}
              className={`px-6 py-2.5 rounded-full font-open-sans font-semibold text-[14px] md:text-[16px] transition-all cursor-pointer border shrink-0
                ${
                  selectedCategoryKey === cat.key
                    ? "bg-[#04142C] text-white border-[#04142C]"
                    : "bg-white text-[#04142C]/60 border-[#04142C]/10 hover:border-[#04142C]/30"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          {filteredCourses.map((course) => {
            const content = course[language] || course["uz"];
            return (
              <div
                key={course.id}
                className="bg-white rounded-[20px] overflow-hidden border border-[#04142C]/10 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="h-[220px] w-full bg-[#E5E7EB] flex items-center justify-center relative overflow-hidden">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={content.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#04142C]/5 to-transparent"></div>
                      <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                        <div className="w-12 h-12 border-2 border-[#04142C]/10 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#04142C]/20 rounded-full"></div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="absolute top-4 right-4 bg-[#04142C] text-white text-[12px] font-montserrat font-bold px-4 py-1.5 rounded-full z-20">
                    {content.level}
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-[#04142C]/50" />
                    <span className="text-[#04142C]/60 text-[14px] font-medium">
                      {content.time}
                    </span>
                  </div>

                  <h3 className="text-[#04142C] text-[24px] font-montserrat font-bold mb-3">
                    {content.name || content.title}
                  </h3>

                  <p className="text-[#04142C]/70 text-[16px] leading-relaxed mb-6 flex-1">
                    {content.description}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-[#04142C]/5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#04142C]/50 border border-[#04142C]/10">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="text-[#04142C]/90 font-bold text-[14px]">
                          {content.teacher}
                        </p>
                        <p className="text-[#04142C]/40 text-[12px] font-medium">
                          {t.courses.labels.teacher}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="flex items-center gap-2 text-[#04142C] font-bold text-[14px] hover:text-blue-600 transition-colors group/btn cursor-pointer"
                    >
                      {t.courses.labels.more}
                      <ArrowRight
                        size={16}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal - Batafsil */}
      {selectedCourse &&
        (() => {
          const content = selectedCourse[language] || selectedCourse["uz"];
          return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6">
              <div
                className="absolute inset-0 bg-[#04142C]/60 backdrop-blur-md opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]"
                onClick={() => setSelectedCourse(null)}
              ></div>
              <div className="bg-white w-full max-w-2xl rounded-[30px] overflow-hidden relative z-10 shadow-2xl scale-95 opacity-0 animate-[modalScaleIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
                <div className="h-48 md:h-64 w-full bg-[#04142C] relative flex items-center justify-center px-10 overflow-hidden">
                  {selectedCourse.image ? (
                    <>
                      <img
                        src={selectedCourse.image}
                        alt={content.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#04142C] to-transparent"></div>
                    </>
                  ) : (
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                  )}
                  <h2 className="text-white text-[24px] md:text-[32px] font-montserrat font-bold text-center z-10 leading-tight drop-shadow-lg">
                    {content.name || content.title}
                  </h2>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md transition-all flex items-center justify-center text-white cursor-pointer group z-20"
                  >
                    <X
                      size={24}
                      className="group-hover:rotate-90 transition-transform duration-300"
                    />
                  </button>
                </div>

                <div className="p-6 md:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-[#04142C]/40 text-[12px] uppercase font-bold tracking-wider">
                        {t.courses.labels.teacher}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#04142C]">
                          <User size={20} />
                        </div>
                        <p className="text-[#04142C] font-montserrat font-bold text-[17px] md:text-[18px]">
                          {content.teacher}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#04142C]/40 text-[12px] uppercase font-bold tracking-wider">
                        {t.courses.labels.time}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#04142C]">
                          <Clock size={20} />
                        </div>
                        <p className="text-[#04142C] font-montserrat font-bold text-[15px] md:text-[16px]">
                          {content.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#04142C]/40 text-[12px] uppercase font-bold tracking-wider">
                        {t.courses.labels.level}
                      </span>
                      <p className="text-[#04142C] font-montserrat font-bold text-[17px] md:text-[18px]">
                        {content.level}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#04142C]/40 text-[12px] uppercase font-bold tracking-wider">
                        {t.courses.labels.room}
                      </span>
                      <p className="text-[#04142C] font-montserrat font-bold text-[17px] md:text-[18px]">
                        {content.room}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#04142C]/5 pt-6 md:pt-8">
                    <h4 className="text-[#04142C] text-[18px] md:text-[20px] font-montserrat font-bold mb-4">
                      {t.courses.labels.description}
                    </h4>
                    <p className="text-[#04142C]/70 text-[15px] md:text-[17px] leading-relaxed font-open-sans">
                      {content.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleApply(selectedCourse)}
                    className="w-full mt-8 md:mt-10 h-[50px] md:h-[60px] bg-[#04142C] text-white rounded-[12px] md:rounded-[15px] font-montserrat font-bold text-[16px] md:text-[18px] hover:bg-[#04142C]/90 hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-3"
                  >
                    {t.courses.labels.enroll}
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {/* Custom Snappy Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Courses_main;
