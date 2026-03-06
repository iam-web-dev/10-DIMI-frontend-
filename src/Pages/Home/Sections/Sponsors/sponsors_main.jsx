import React from "react";
import logo_1 from "./list/1.svg";
import logo_2 from "./list/2.svg";
import logo_3 from "./list/3.svg";
import logo_4 from "./list/4.svg";
import logo_5 from "./list/5.svg";
import { useLanguage } from "../../../../Context/LanguageContext";
import { translations } from "../../../../Data/translations";

const sponsors = [
  { id: 1, img: logo_1 },
  { id: 2, img: logo_2 },
  { id: 3, img: logo_3 },
  { id: 4, img: logo_4 },
  { id: 5, img: logo_5 },
];

const Sponsors_main = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div
      id="sponsors"
      className="pt-6 md:pt-[45px] mb-12 md:mb-20 overflow-hidden"
    >

      <div className="relative w-full overflow-hidden py-6 md:py-10">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#F3F4F6] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#F3F4F6] to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee flex items-center gap-10 md:gap-24">
          {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map(
            (sponsor, index) => (
              <div
                key={`${sponsor.id}-${index}`}
                className="h-[50px] md:h-[75px] flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer shrink-0"
              >
                <img
                  src={sponsor.img}
                  alt={`Sponsor ${sponsor.id}`}
                  className="h-full w-auto object-contain"
                />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Sponsors_main;
