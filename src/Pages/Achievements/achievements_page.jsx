import React, { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, X, ZoomIn, Trophy } from "lucide-react";
import { useLanguage } from "../../Context/LanguageContext";
import { useData } from "../../Context/DataContext";
import { translations } from "../../Data/translations";

const Achievements_page = () => {
  const { language } = useLanguage();
  const { achievements, achievementsCategories } = useData();
  const t = translations[language];
  const [selectedCategoryKey, setSelectedCategoryKey] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredData =
    selectedCategoryKey === "all"
      ? achievements
      : achievements.filter((item) => item.categoryKey === selectedCategoryKey);

  // Split into portrait and landscape using typeMap from API or type fallback
  const portraitItems = filteredData.filter(
    (item) => (item.typeMap || item.type) === "portrait",
  );
  const landscapeItems = filteredData.filter(
    (item) => (item.typeMap || item.type) === "landscape",
  );

  return (
    <div className="bg-[#F3F4F6] min-h-screen font-open-sans pt-10 md:pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-[50px]">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[#04142C]/40 text-[14px] md:text-[16px] mb-4 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to="/" className="hover:text-[#04142C] transition-colors">
            {t.breadcrumbs.home}
          </Link>
          <ChevronRight size={16} />
          <span className="text-[#04142C] font-medium">
            {t.achievements.title}
          </span>
        </div>

        {/* Page Title */}
        <h1 className="text-[#04142C] text-[32px] md:text-[45px] font-montserrat font-bold mb-8">
          {t.achievements.title}
        </h1>

        {/* Categories Filter */}
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-3 md:gap-4 mb-12 pb-2">
          {[
            { key: "all", uz: "Barchasi", ru: "Все", en: "All" },
            ...achievementsCategories,
          ].map((cat) => (
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
              {cat[language] || cat.uz}
            </button>
          ))}
        </div>

        {/* Portrait Certificates Section */}
        {portraitItems.length > 0 && (
          <div className="mb-16">
            <div className="w-full h-[1px] bg-[#04142C]/10 mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {portraitItems.map((item) => {
                const content = item[language] || item.uz;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedImage(item)}
                    className="group relative bg-white rounded-[20px] overflow-hidden border border-[#04142C]/10 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={content.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-[#04142C]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                      <ZoomIn
                        className="text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        size={40}
                      />
                      <p className="text-white font-montserrat font-bold text-[16px] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {content.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Landscape Certificates Section */}
        {landscapeItems.length > 0 && (
          <div>
            <div className="w-full h-[1px] bg-[#04142C]/10 mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {landscapeItems.map((item) => {
                const content = item[language] || item.uz;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedImage(item)}
                    className="group relative bg-white rounded-[25px] overflow-hidden border border-[#04142C]/10 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={content.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-[#04142C]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-8 text-center">
                      <ZoomIn
                        className="text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        size={48}
                      />
                      <p className="text-white font-montserrat font-bold text-[18px] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {content.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {portraitItems.length === 0 && landscapeItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-[#04142C]/5">
              <Trophy size={40} className="text-[#04142C]/20" />
            </div>
            <h3 className="text-[#04142C] text-xl font-bold mb-2">
              Ma'lumot topilmadi
            </h3>
            <p className="text-[#04142C]/40 max-w-sm">
              Ushbu turkumda hali yutuqlar qo'shilmagan yoki ular ko'rinish
              turiga ega emas.
            </p>
          </div>
        )}
      </div>

      {/* Modal - Large View */}
      {selectedImage &&
        (() => {
          const content = selectedImage[language] || selectedImage.uz;
          const category = achievementsCategories.find(
            (c) => c.key === selectedImage.categoryKey,
          );
          return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
              <div
                className="absolute inset-0 bg-[#04142C]/90 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out_forwards]"
                onClick={() => setSelectedImage(null)}
              ></div>

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white cursor-pointer z-20"
              >
                <X size={32} />
              </button>

              <div className="relative z-10 max-w-[90vw] w-full max-h-full flex flex-col items-center animate-[modalScaleIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
                <div className="bg-white p-1 md:p-2 rounded-[20px] shadow-2xl flex items-center justify-center max-h-[80vh] w-auto">
                  <img
                    src={selectedImage.image}
                    alt={content.title}
                    className="max-w-full max-h-[80vh] object-contain rounded-[15px]"
                  />
                </div>
                <div className="mt-6 text-center max-w-2xl px-4">
                  <h3 className="text-white text-[20px] md:text-[24px] font-montserrat font-bold line-clamp-2">
                    {content.title}
                  </h3>
                  <p className="text-white/60 font-open-sans mt-1">
                    {t.achievements.category}:{" "}
                    {category[language] || category.uz}
                  </p>
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
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Achievements_page;
