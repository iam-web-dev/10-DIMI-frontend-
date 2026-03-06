import React, { useState } from "react";
import { Link } from "react-router";
import { Instagram, Youtube, Send } from "lucide-react";
import { useLanguage } from "../../Context/LanguageContext";
import { useData } from "../../Context/DataContext";
import { translations } from "../../Data/translations";

const Footer_main = () => {
  const { language } = useLanguage();
  const { settings } = useData();
  const t = translations[language];

  return (
    <footer className="bg-[#04142C] text-white pt-16 pb-8 px-6 md:px-[80px] lg:px-[120px] font-open-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[32px] md:text-[40px] font-montserrat font-bold tracking-tight">
              10-DIMI
            </h2>
            <p className="text-[18px] md:text-[22px] font-medium leading-tight max-w-[300px]">
              {t.footer.slogan}
            </p>

            <div className="mt-4">
              <p className="text-white/60 text-[14px] md:text-[16px] mb-2 font-medium">
                {t.footer.contact}
              </p>
              <a
                href={`tel:${settings.phoneNumber}`}
                className="text-[18px] md:text-[22px] font-bold hover:text-blue-400 transition-colors"
              >
                {settings.phoneNumber}
              </a>
            </div>

            <div className="flex gap-4 mt-4">
              <a
                href={settings.telegramLink}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/40 transition-all group"
              >
                <Send
                  size={22}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href={settings.youtubeLink}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/40 transition-all"
              >
                <Youtube size={22} />
              </a>
              <a
                href={settings.instagramLink}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/40 transition-all"
              >
                <Instagram size={22} />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="flex flex-col gap-8">
            <h3 className="text-[20px] md:text-[24px] font-montserrat font-bold">
              {t.footer.sections}
            </h3>
            <ul className="flex flex-col gap-4 text-white/70 text-[16px] md:text-[18px] font-medium">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {t.navbar.about}
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  {t.navbar.team}
                </a>
              </li>
              <li>
                <a
                  href="#feedbacks"
                  className="hover:text-white transition-colors"
                >
                  {t.navbar.feedbacks}
                </a>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-white transition-colors"
                >
                  {t.navbar.courses}
                </Link>
              </li>
              <li>
                <a href="#news" className="hover:text-white transition-colors">
                  {t.navbar.news}
                </a>
              </li>
              <li>
                <a
                  href="#achievements"
                  className="hover:text-white transition-colors"
                >
                  {t.navbar.achievements}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-[18px] md:text-[20px] font-montserrat font-bold">
              {t.footer.findUs}
            </h3>
            <div className="w-full h-[300px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#04142C]">
              <iframe
                src="https://yandex.com/map-widget/v1/?ll=72.3591%2C40.7821&z=15&l=map&pt=72.3591%2C40.7821%2Cpm2rdl"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen={true}
                className="opacity-90 grayscale-[15%] contrast-[1.2] hover:grayscale-0 transition-all duration-700"
                title="10-DIMI Maktabi Manzili"
              ></iframe>

              <div className="absolute inset-0 bg-[#04142C]/10 pointer-events-none z-10"></div>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/10 mb-8 mt-4"></div>
        <div className="flex flex-col md:flex-row justify-center items-center text-center">
          <p className="text-white/40 text-[14px] md:text-[15px] font-medium tracking-wide">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer_main;
