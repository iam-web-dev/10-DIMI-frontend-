import React from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router";
import { useLanguage } from "../../../../Context/LanguageContext";
import { useData } from "../../../../Context/DataContext";
import { translations } from "../../../../Data/translations";

const News_main = () => {
  const { language } = useLanguage();
  const { news } = useData();
  const t = translations[language];

  return (
    <div id="news" className="md:pt-[45px] mb-10 md:mb-16 px-6 md:px-[50px]">
      <div className="flex flex-row items-center justify-center mb-12 md:mb-15 relative">
        <h2 className="text-[#04142C] text-[28px] md:text-[40px] font-montserrat font-bold text-center">
          {t.news.title}
        </h2>

        <Link
          to="/news"
          className="absolute md:flex hidden right-[5%] translate-x-[5%] md:right-[5%] md:translate-x-[5%] items-center gap-2 px-4 h-[40px] md:h-[45px] border border-[#04142C]/20 rounded-[6px] text-[#04142C] font-open-sans font-semibold text-[14px] md:text-[16px] hover:bg-[#04142C] hover:text-white transition-all duration-300 group cursor-pointer"
        >
          {t.news.all}
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {news.slice(0, 4).map((item, index) => {
          const content = item[language] || item["uz"];
          return (
            <div
              key={item.id}
              className={`flex flex-col group w-full 
                ${index === 2 ? "flex md:hidden lg:flex" : ""} 
                ${index === 3 ? "hidden xl:flex" : ""}
                ${index < 2 ? "flex" : ""}
              `}
            >
              <Link
                to={`/news/${item.id}`}
                className="w-full aspect-video bg-[#E5E7EB] border border-[#04142C]/10 rounded-[12px] overflow-hidden mb-5 relative shadow-sm group-hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={item.image || item.media?.[0]?.url}
                  alt={content.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#04142C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>

              <div className="flex flex-col flex-1 px-1">
                <span className="font-open-sans text-[14px] md:text-[16px] text-[#04142C]/60 font-medium mb-2 flex items-center gap-2">
                  <Calendar size={14} />
                  {item.date || content.date}
                </span>
                <Link to={`/news/${item.id}`}>
                  <h3 className="font-montserrat font-bold text-[20px] md:text-[24px] text-[#04142C] leading-[1.3] mb-3 group-hover:text-[#04142C]/80 transition-colors">
                    {content.title}
                  </h3>
                </Link>
                <p className="font-open-sans text-[15px] md:text-[17px] text-[#04142C]/70 leading-[1.4] mb-5 line-clamp-3">
                  {content.shortDescription}
                </p>

                <Link
                  to={`/news/${item.id}`}
                  className="mt-auto flex items-center gap-2 text-[#04142C] font-montserrat font-bold text-[16px] group/btn cursor-pointer w-fit overflow-hidden"
                >
                  <span className="relative">
                    {t.news.more}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#04142C] transition-transform duration-300 origin-left scale-x-0 group-hover/btn:scale-x-100"></span>
                  </span>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full group-hover/btn:bg-[#04142C] group-hover/btn:text-white transition-all duration-300">
                    <ArrowRight size={16} />
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        to="/news"
        className="md:hidden flex items-center mx-auto gap-2 px-4 mt-7 h-[40px] border border-[#04142C]/20 rounded-[6px] text-[#04142C] font-open-sans font-semibold text-[14px] hover:bg-[#04142C] hover:text-white transition-all duration-300 group cursor-pointer w-fit"
      >
        {t.news.all}
        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </div>
  );
};

export default News_main;
