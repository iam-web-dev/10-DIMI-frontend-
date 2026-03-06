import React from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronRight, Calendar } from "lucide-react";
import { useLanguage } from "../../Context/LanguageContext";
import { useData } from "../../Context/DataContext";
import { translations } from "../../Data/translations";

const News_page = () => {
  const { language } = useLanguage();
  const { news } = useData();
  const t = translations[language];

  return (
    <div className="bg-[#F3F4F6] min-h-screen font-open-sans pt-10 md:pt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-[50px]">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[#04142C]/40 text-[14px] md:text-[16px] mb-4 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to="/" className="hover:text-[#04142C] transition-colors">
            {t.breadcrumbs.home}
          </Link>
          <ChevronRight size={16} />
          <span className="text-[#04142C] font-medium">{t.news.title}</span>
        </div>

        {/* Page Title */}
        <h1 className="text-[#04142C] text-[32px] md:text-[45px] font-montserrat font-bold mb-12">
          {t.news.title}
        </h1>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          {news.map((item) => {
            const content = item[language] || item.uz;
            return (
              <div
                key={item.id}
                className="bg-white rounded-[20px] overflow-hidden border border-[#04142C]/10 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <Link
                  to={`/news/${item.id}`}
                  className="w-full aspect-video bg-[#E5E7EB] relative overflow-hidden"
                >
                  <img
                    src={item.media[0].url}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#04142C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={16} className="text-[#04142C]/50" />
                    <span className="text-[#04142C]/60 text-[14px] font-medium">
                      {item.date || content.date}
                    </span>
                  </div>

                  <Link to={`/news/${item.id}`}>
                    <h3 className="text-[#04142C] text-[22px] md:text-[24px] font-montserrat font-bold mb-3 leading-tight group-hover:text-[#04142C]/80 transition-colors line-clamp-2">
                      {content.title}
                    </h3>
                  </Link>

                  <p className="text-[#04142C]/70 text-[15px] md:text-[16px] leading-relaxed mb-6 flex-1 line-clamp-3">
                    {content.shortDescription}
                  </p>

                  <Link
                    to={`/news/${item.id}`}
                    className="flex items-center gap-2 text-[#04142C] font-montserrat font-bold text-[16px] group/btn cursor-pointer w-fit overflow-hidden pt-4 border-t border-[#04142C]/5 w-full"
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
      </div>
    </div>
  );
};

export default News_page;
