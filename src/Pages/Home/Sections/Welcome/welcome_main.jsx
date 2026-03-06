import React, { Fragment } from "react";
import bg from "./Elements/BG.svg";
import { Atom, ChartLine, GraduationCap } from "lucide-react";
import { useLanguage } from "../../../../Context/LanguageContext";
import { translations } from "../../../../Data/translations";

const Welcome_main = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const handleScrollToForm = () => {
    const element = document.getElementById("form");
    if (element) {
      const offset = 75;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const icons = [
    <GraduationCap
      className="text-white w-7 h-7 md:w-[38px] md:h-[38px]"
      strokeWidth={1}
    />,
    <ChartLine
      className="text-white w-7 h-7 md:w-[38px] md:h-[38px]"
      strokeWidth={1}
    />,
    <Atom
      className="text-white w-7 h-7 md:w-[38px] md:h-[38px]"
      strokeWidth={1}
    />,
  ];

  return (
    <div className="relative w-full h-auto flex flex-col items-center justify-center pb-[80px] md:pb-[200px]">
      <div className="relative w-full">
        <img
          src={bg}
          alt="Background"
          className="w-full h-[520px] md:h-[665px] z-0 block select-none pointer-events-none object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-br from-[#000815]/80 to-[#000815]/20 z-10"></div>

        <div className="absolute inset-0 z-20 flex flex-col items-start justify-center md:justify-start w-full px-6 md:px-[125px] md:pt-[150px]">
          <p className="text-[#ffffff] text-3xl md:text-[40px] font-montserrat font-bold leading-tight">
            {t.welcome.title}
          </p>
          <div className="text-[#ffffff] text-base md:text-[20px] mt-4 md:mt-[25px] text-left max-w-[548px] font-open-sans font-medium opacity-90">
            {t.welcome.description}
          </div>
          <button
            onClick={handleScrollToForm}
            className="mt-8 md:mt-[50px] bg-[#04142C]/20 cursor-pointer relative flex items-center justify-center border border-white rounded-[6px] w-[180px] md:w-[200px] h-[50px] md:h-[55px] overflow-hidden transition-all duration-300 hover:scale-101 active:scale-99 group"
          >
            <div className="absolute w-[50px] -translate-x-[180px] h-[200px] rotate-[45deg] bg-white opacity-0 transition-opacity duration-400 transition-transform group-hover:translate-x-[185px] group-hover:opacity-10"></div>
            <span className="relative z-10 text-white text-base md:text-[18px] font-open-sans font-medium">
              {t.welcome.apply}
            </span>
          </button>
        </div>
      </div>

      <div className="w-full px-6 flex justify-center -mt-8 md:-mt-0 relative z-30">
        <div className="flex bg-[#F3F4F6] shadow-2xl relative md:absolute md:-bottom-[120px] flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-[30px] z-11 justify-center rounded-[15px] py-8 md:py-[28px] px-6 md:px-[25px] w-full max-w-7xl">
          {t.welcome.cards.map((card, index) => (
            <Fragment key={index}>
              <div className="flex flex-row items-center justify-start gap-4 md:gap-[25px] flex-1">
                <div className="w-14 h-14 md:w-[72px] md:h-[72px] bg-[#000F25] rounded-full flex shrink-0 items-center justify-center">
                  {icons[index]}
                </div>
                <div className="font-open-sans">
                  <p className="text-[#04142C] leading-[1.2] text-lg md:text-[25px] font-bold">
                    {card.title}
                  </p>
                  <p className="text-[#04142C] text-sm md:text-[16px] font-medium mt-2 max-w-[278px] leading-[1.3]">
                    {card.text}
                  </p>
                </div>
              </div>
              {index < t.welcome.cards.length - 1 && (
                <div className="hidden md:block w-px h-16 bg-gray-300"></div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome_main;
