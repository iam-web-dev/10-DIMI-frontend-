import React from "react";
import flag from "./Elements/flag.svg";
import president from "./Elements/president.svg";
import { useLanguage } from "../../Context/LanguageContext";
import { translations } from "../../Data/translations";

const President_main = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="overflow-x-clip">
      <div className="md:h-[326px] h-[275px] relative mb-8 bg-[#04142C]">
        <div className="absolute z-2 md:top-[50%] md:left-[150px] top-[43%] left-[30px] translate-y-[-50%]">
          <p className="text-[#F3F4F6] font-montserrat font-bold md:text-[35px] text-[18px] tracking-[-3%] max-w-[200px] md:max-w-[550px] lg:max-w-[650px] leading-[130%]">
            {t.president.quote}
          </p>
          <p className="text-[#F3F4F6] font-montserrat font-bold md:text-[23px] text-[16px] mt-[35px] md:mt-[62px] tracking-[-3%]">
            {t.president.name}
          </p>
        </div>
        <div className="bg-gradient-to-r absolute z-1 from-[#04142C] to-[#04142C]/30 from-[40%] to-[120%] 2xl:from-[60%] 2xl:to-[120%] w-full h-full"></div>
        <div className="flex items-center absolute z-0 justify-end w-full h-full">
          <img src={flag} alt="flag" className="h-full" />
        </div>
        <div className="absolute w-[433px] top-[100%] z-2 md:right-[10%] -right-[58%] translate-y-[-100%]">
          <img
            src={president}
            alt="president"
            className="md:w-full w-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default President_main;
