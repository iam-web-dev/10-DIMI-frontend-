import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useLanguage } from "../../../../Context/LanguageContext";
import { useData } from "../../../../Context/DataContext";
import { translations } from "../../../../Data/translations";

const Achievements_main = () => {
  const { language } = useLanguage();
  const { achievements } = useData();
  const t = translations[language];

  const displayAchievements = achievements.slice(0, 15);
  const portraitItems = displayAchievements.filter(
    (item) => (item.typeMap || item.type) === "portrait",
  );
  const landscapeItems = displayAchievements.filter(
    (item) => (item.typeMap || item.type) === "landscape",
  );

  const RenderSection = ({ items, type }) => {
    if (items.length === 0) return null;

    return (
      <div className="w-full overflow-x-auto no-scrollbar pb-6 pt-4">
        <div className="flex items-center gap-6 px-4 md:px-[50px]">
          {items.map((item, index) => {
            const content = item[language] || item.uz;
            const isLandscape = type === "landscape";
            return (
              <Link
                to="/achievements"
                key={item.id}
                className={`achievement-card ${isLandscape ? "w-[300px] md:w-[450px] aspect-[4/3]" : "w-[200px] md:w-[280px] aspect-[3/4]"} 
                  bg-white border border-[#04142C]/10 rounded-[20px] md:rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 shrink-0 cursor-pointer 
                  ${index % 2 === 0 ? "rotate-1" : "-rotate-1"} hover:rotate-0 hover:scale-105 flex flex-col`}
              >
                <img
                  src={item.image}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      id="achievements"
      className="md:pt-[45px] mb-8 md:mb-16 overflow-hidden"
    >
      <div className="px-6 md:px-[50px] flex flex-row items-center justify-center mb-10 md:mb-14 relative z-30">
        <h2 className="text-[#04142C] text-[28px] md:text-[40px] font-montserrat font-bold text-center">
          {t.achievements.title}
        </h2>

        <Link
          to="/achievements"
          className="absolute md:flex hidden right-[50px] items-center gap-2 px-4 h-[40px] md:h-[45px] border border-[#04142C]/20 rounded-[6px] text-[#04142C] font-open-sans font-semibold text-[14px] md:text-[16px] hover:bg-[#04142C] hover:text-white transition-all duration-300 group cursor-pointer z-10"
        >
          {t.news.all}
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-6 md:gap-10">
        {/* Portrait Row */}
        <RenderSection items={portraitItems} type="portrait" />

        {/* Landscape Row */}
        <RenderSection items={landscapeItems} type="landscape" />
      </div>

      <div className="px-6">
        <Link
          to="/achievements"
          className="md:hidden flex items-center mx-auto gap-2 px-4 mt-8 h-[40px] border border-[#04142C]/20 rounded-[6px] text-[#04142C] font-open-sans font-semibold text-[14px] hover:bg-[#04142C] hover:text-white transition-all duration-300 group cursor-pointer w-fit"
        >
          {t.news.all}
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
};

export default Achievements_main;
