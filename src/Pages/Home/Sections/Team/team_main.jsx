import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../../../Context/LanguageContext";
import { useData } from "../../../../Context/DataContext";
import { translations } from "../../../../Data/translations";

const Team_main = () => {
  const { language } = useLanguage();
  const { team } = useData();
  const t = translations[language];
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.querySelector(".team-card");
      if (card) {
        const cardWidth = card.offsetWidth;
        const gap = parseInt(window.getComputedStyle(container).gap) || 0;
        const scrollAmount = cardWidth + gap;

        container.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div id="team" className="md:pt-13 mb-1 overflow-hidden px-6 md:px-[50px]">
      <div className="flex flex-row items-center justify-center mb-12 md:mb-16 relative">
        <p className="text-center text-[#04142C] text-[28px] md:text-[40px] font-montserrat font-bold">
          {t.team.title}
        </p>

        <div className="md:flex hidden gap-4 absolute right-[5%] translate-x-[5%] md:right-[8%] md:translate-x-[8%]">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-[#04142C]/10 flex items-center justify-center text-[#04142C] hover:bg-[#04142C] hover:text-white hover:shadow-lg transition-all cursor-pointer bg-white group"
          >
            <ChevronLeft
              size={24}
              className="md:w-7 md:h-7 group-active:scale-90"
            />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-[#04142C]/10 flex items-center justify-center text-[#04142C] hover:bg-[#04142C] hover:text-white hover:shadow-lg transition-all cursor-pointer bg-white group"
          >
            <ChevronRight
              size={24}
              className="md:w-7 md:h-7 group-active:scale-90"
            />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-row gap-6 md:gap-10 overflow-x-auto no-scrollbar scroll-smooth pb-5 snap-x snap-mandatory"
      >
        {team.map((member, index) => {
          const content = member[language] || member.uz;
          return (
            <div
              key={index}
              className="team-card min-w-full md:min-w-[400px] group cursor-pointer snap-center"
            >
              <div className="flex flex-col mx-2">
                <div className="relative border bg-[#F3F4F6] border-[#04142C]/50 shadow-lg w-full h-[320px] md:h-[440px] rounded-2xl overflow-hidden mb-5 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                  <img
                    src={member.image}
                    alt={content.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-col items-center px-1">
                  <h4 className="font-montserrat font-bold text-[22px] md:text-[28px] text-[#04142C]">
                    {content.name}
                  </h4>
                  <p className="font-open-sans font-medium text-[16px] md:text-[20px] text-[#04142C]/70">
                    {content.position}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex md:hidden gap-4 items-center justify-center mb-10">
        <button
          onClick={() => scroll("left")}
          className="w-10 h-10 rounded-full border border-[#04142C]/10 flex items-center justify-center text-[#04142C] hover:bg-[#04142C] hover:text-white hover:shadow-lg transition-all cursor-pointer bg-white group"
        >
          <ChevronLeft
            size={24}
            className="md:w-7 md:h-7 group-active:scale-90"
          />
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-10 h-10 rounded-full border border-[#04142C]/10 flex items-center justify-center text-[#04142C] hover:bg-[#04142C] hover:text-white hover:shadow-lg transition-all cursor-pointer bg-white group"
        >
          <ChevronRight
            size={24}
            className="md:w-7 md:h-7 group-active:scale-90"
          />
        </button>
      </div>
    </div>
  );
};

export default Team_main;
