import React from "react";
import { useLanguage } from "../../../../Context/LanguageContext";
import { translations } from "../../../../Data/translations";
import bg from "./Elements/Element.svg";
import image_1 from "./Elements/image_1.svg";
import image_2 from "./Elements/image_2.svg";

const About_main = () => {
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

  const handleScrollToTeam = () => {
    const element = document.getElementById("team");
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

  return (
    <div className="flex flex-col md:pt-[50px] mb-18">
      <div className="relative w-full flex justify-center flex-col items-center">
        <p className="text-center md:px-auto px-[30px] text-[#04142C] leading-[1.3] text-[28px] md:text-[40px] font-montserrat font-bold">
          {t.about.sectionTitle}
        </p>
        <img
          src={bg}
          alt=""
          className="absolute w-full h-auto z-0 block select-none pointer-events-none top-[80px] md:top-[0px]"
        />

        <div className="-mt-[50px] w-full max-w-7xl mx-auto items-center justify-center md:mt-[80px] px-6 md:px-10 lg:px-20 flex flex-col lg:flex-row gap-10 lg:gap-20">
          <div className="relative w-full max-w-[550px] h-[360px] md:h-[500px] mx-auto lg:mx-0 shrink-0">
            <img
              src={image_1}
              alt=""
              className="w-[45%] md:w-[258px] rounded-[2px] h-[461px] absolute top-[0px] left-[0px] z-10"
            />
            <div className="absolute w-[120px] md:w-[182px] h-[120px] md:h-[182px] flex items-center border border-white rounded-full md:mt-[130px] md:ml-[180px] mt-[170px] ml-[30%] justify-center z-30">
              <div className="absolute w-[118px] h-[118px] md:w-[180px] md:h-[180px] bg-[#04142C] rounded-full flex items-center justify-center">
                <span className="font-montserrat font-bold text-[16px] md:text-[24px] text-white">
                  10-DIMI
                </span>
              </div>
              <svg
                className="absolute w-full h-[111px] md:h-[166px] animate-spin-slow"
                viewBox="0 0 200 200"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 100, 100 m -82, 0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
                  />
                </defs>
                <text
                  fill="white"
                  fontSize="13px"
                  fontWeight="semibold"
                  className="font-montserrat"
                >
                  <textPath
                    href="#circlePath"
                    startOffset="0%"
                    textLength="503"
                  >
                    {t.about.fullTitle}
                  </textPath>
                </text>
              </svg>
            </div>
            <img
              src={image_2}
              alt=""
              className="w-[45%] md:w-[258px] rounded-[2px] h-[461px] absolute -top-[20px] md:-top-[30px] md:left-[288px] left-[50%] z-20"
            />
          </div>

          <div className="flex flex-col items-center lg:items-start justify-center lg:flex-1 md:-mt-12">
            <div className="w-full">
              <p className="font-montserrat font-bold text-[36px] md:text-[48px] text-[#04142C] text-center lg:text-left">
                {t.about.title}
              </p>
              <p className="font-open-sans max-w-[560px] font-medium text-[16px] md:text-[24px] mt-[20px] text-[#04142C] leading-relaxed text-center lg:text-left">
                {t.about.description}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start w-full gap-[16px] md:gap-[24px] mt-6 md:mt-[36px]">
              <button
                onClick={handleScrollToTeam}
                className="cursor-pointer relative flex items-center justify-center border border-[#04142C] rounded-[6px] w-full sm:w-[180px] h-[44px] md:h-[50px] overflow-hidden transition-all duration-300 hover:scale-101 active:scale-99 group"
              >
                <div className="absolute w-[50px] -translate-x-[180px] h-[200px] rotate-[45deg] bg-[#04142C] opacity-0 transition-opacity duration-400 transition-transform group-hover:translate-x-[185px] group-hover:opacity-10"></div>
                <span className="relative z-10 text-[#04142C] text-[15px] md:text-[16px] font-open-sans font-medium">
                  {t.navbar.team}
                </span>
              </button>
              <button
                onClick={handleScrollToForm}
                className="cursor-pointer relative flex items-center justify-center border border-[#04142C] rounded-[6px] w-full sm:w-[180px] h-[44px] md:h-[50px] overflow-hidden transition-all duration-300 hover:scale-101 active:scale-99 group"
              >
                <div className="absolute w-[50px] -translate-x-[180px] h-[200px] rotate-[45deg] bg-[#04142C] opacity-0 transition-opacity duration-400 transition-transform group-hover:translate-x-[185px] group-hover:opacity-10"></div>
                <span className="relative z-10 text-[#04142C] text-[15px] md:text-[16px] font-open-sans font-medium">
                  {t.form.send}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-20 md:mt-20 flex items-center justify-center">
        <div className="relative z-10 bg-[#04142C] rounded-[20px] w-[90%] max-w-7xl mx-auto px-10 md:px-[80px] py-10 md:py-[45px] flex flex-col md:flex-row items-center justify-between gap-10 md:gap-[10px] shadow-2xl">
          <div className="flex flex-col items-center justify-center text-center flex-1">
            <p className="font-montserrat font-bold text-[36px] md:text-[48px] text-[#F3F4F6]">
              98.7%
            </p>
            <p className="font-open-sans font-medium text-[16px] md:text-[20px] lg:text-[24px] mt-2 md:mt-[15px] text-[#F3F4F6] whitespace-nowrap">
              {t.about.stats.graduation}
            </p>
          </div>

          <hr className="hidden md:block border-white rotate-90 h-[1px] w-[80px] opacity-70" />

          <div className="flex flex-col items-center justify-center text-center flex-1">
            <p className="font-montserrat font-bold text-[36px] md:text-[48px] text-[#F3F4F6]">
              50+
            </p>
            <p className="font-open-sans font-medium text-[16px] md:text-[20px] lg:text-[24px] mt-2 md:mt-[15px] text-[#F3F4F6] whitespace-nowrap">
              {t.about.stats.teachers}
            </p>
          </div>

          <hr className="hidden md:block border-white rotate-90 h-[1px] w-[80px] opacity-70" />

          <div className="flex flex-col items-center justify-center text-center flex-1">
            <p className="font-montserrat font-bold text-[36px] md:text-[48px] text-[#F3F4F6]">
              10+
            </p>
            <p className="font-open-sans font-medium text-[16px] md:text-[20px] lg:text-[24px] mt-2 md:mt-[15px] text-[#F3F4F6] whitespace-nowrap">
              {t.about.stats.experience}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_main;
