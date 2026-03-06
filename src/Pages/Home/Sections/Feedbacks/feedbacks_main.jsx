import React, { useState, useEffect } from "react";
import { useLanguage } from "../../../../Context/LanguageContext";
import { useData } from "../../../../Context/DataContext";
import { translations } from "../../../../Data/translations";

const Feedbacks_main = () => {
  const { language } = useLanguage();
  const { feedbacks } = useData();
  const t = translations[language];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
    }, 15000);
    return () => clearTimeout(timer);
  }, [currentIndex, feedbacks.length]);

  const isMobile = windowWidth < 768;
  const cardWidth = isMobile ? windowWidth - 48 : 650;
  const gap = isMobile ? 20 : 40;

  const containerPadding = (windowWidth - cardWidth) / 2;
  const translateX = -(currentIndex * (cardWidth + gap)) + containerPadding;

  return (
    <div id="feedbacks" className="md:pt-[50px] relative mb-16">
      <div className="flex flex-row items-center justify-center mb-12 md:mb-16 relative">
        <p className="text-center md:px-auto px-[30px] text-[#04142C] leading-[1.3] text-[28px] md:text-[40px] font-montserrat font-bold">
          {t.feedbacks.title}
        </p>
      </div>

      {/* Slider Viewport */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-[1200ms] ease-in-out"
          style={{
            transform: `translateX(${translateX}px)`,
            gap: `${gap}px`,
          }}
        >
          {feedbacks.map((item, index) => {
            const content = item[language] || item.uz;
            return (
              <div
                key={index}
                style={{ minWidth: `${cardWidth}px`, width: `${cardWidth}px` }}
                className={`bg-white border border-[#04142C]/50 rounded-[15px] p-8 md:p-10 shadow-lg border border-[#04142C]/5 flex flex-col gap-6 transition-all duration-700 
                ${index === currentIndex ? "scale-100 opacity-100" : "scale-95 opacity-50"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-[60px] h-[60px] md:w-[72px] md:h-[72px] rounded-full bg-[#E5E7EB] border border-[#04142C]/10 shrink-0 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={content.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#04142C]/30 text-xl font-bold bg-white/50">
                          {content.name?.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="font-montserrat font-bold text-[22px] md:text-[28px] text-[#04142C] leading-tight">
                        {content.name}
                      </span>
                      <span className="font-open-sans font-medium text-[16px] md:text-[20px] text-[#04142C]/70">
                        {content.role}
                      </span>
                    </div>
                  </div>

                  <span className="text-[60px] md:text-[80px] font-serif text-[#04142C]/10 leading-none h-[40px] flex items-center mb-8 select-none">
                    “
                  </span>
                </div>

                <div className="font-open-sans font-normal text-[16px] md:text-[20px] text-[#04142C]/80 leading-relaxed px-1">
                  {content.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots Indicator - Premium Styling */}
      <div className="flex justify-center items-center gap-4 mt-16">
        {feedbacks.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer transition-all duration-500 rounded-full h-[6px] 
              ${index === currentIndex ? "w-12 bg-[#04142C]" : "w-3 bg-[#04142C]/20 hover:bg-[#04142C]/40"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Feedbacks_main;
