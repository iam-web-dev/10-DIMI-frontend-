import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import {
  ChevronRight,
  Calendar,
  Eye,
  ArrowRight,
  Play,
  Image as ImageIcon,
  ZoomIn,
  X,
} from "lucide-react";
import { useLanguage } from "../../Context/LanguageContext";
import { useData } from "../../Context/DataContext";
import { translations } from "../../Data/translations";

const NewsDetail = () => {
  const { language } = useLanguage();
  const { news: allNewsData, incrementNewsViews } = useData();
  const t = translations[language];
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [activeMedia, setActiveMedia] = useState(0);
  const [selectedZoomMedia, setSelectedZoomMedia] = useState(null);

  useEffect(() => {
    const numericId = parseInt(id);
    const item = allNewsData.find((n) => n.id === numericId);
    if (item) {
      setNewsItem(item);
      setActiveMedia(0);
      window.scrollTo(0, 0);
    }
  }, [id, allNewsData]);

  useEffect(() => {
    if (id) {
      incrementNewsViews(parseInt(id));
    }
  }, [id]); // Only increment when the ID changes

  if (!newsItem)
    return (
      <div className="min-h-screen flex items-center justify-center font-montserrat font-bold text-[#04142C]">
        Yuklanmoqda...
      </div>
    );

  const content = newsItem[language] || newsItem.uz;

  // Combine main image with media list
  const allMedia = [];
  if (newsItem.image) {
    allMedia.push({ type: "image", url: newsItem.image });
  }
  if (newsItem.media && newsItem.media.length > 0) {
    allMedia.push(...newsItem.media);
  }

  const otherNews = allNewsData
    .filter((item) => item.id !== newsItem.id)
    .slice(0, 3);

  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const renderMedia = (media) => {
    if (!media) return null;
    if (media.type === "image") {
      return (
        <div
          className="relative w-full h-full group/main cursor-zoom-in"
          onClick={() => setSelectedZoomMedia(media)}
        >
          <img
            src={media.url}
            alt={content.title}
            className="w-full h-full object-cover animate-fade-in"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/main:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <ZoomIn className="text-white w-12 h-12 transform scale-90 group-hover/main:scale-100 transition-transform duration-300" />
          </div>
        </div>
      );
    }

    const youtubeId = getYouTubeId(media.url);
    if (youtubeId) {
      return (
        <iframe
          className="w-full h-full border-0"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      );
    }

    return (
      <video
        src={media.url}
        controls
        className="w-full h-full object-cover"
      ></video>
    );
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen font-open-sans pt-10 md:pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-[50px]">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[#04142C]/40 text-[14px] md:text-[16px] mb-6 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to="/" className="hover:text-[#04142C] transition-colors">
            {t.breadcrumbs.home}
          </Link>
          <ChevronRight size={16} />
          <Link to="/news" className="hover:text-[#04142C] transition-colors">
            {t.news.title}
          </Link>
          <ChevronRight size={16} />
          <span className="text-[#04142C] font-medium line-clamp-1">
            {content.title}
          </span>
        </div>

        {/* Content Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-[#04142C]/50 text-[14px] font-medium">
              <Calendar size={16} />
              {newsItem.date || content.date}
            </div>
            <div className="w-1 h-1 rounded-full bg-[#04142C]/20"></div>
            <div className="flex items-center gap-1.5 text-[#04142C]/50 text-[14px] font-medium">
              <Eye size={16} />
              {newsItem.views} {t.news.views}
            </div>
          </div>
          <h1 className="text-[#04142C] text-[28px] md:text-[45px] font-montserrat font-bold leading-tight mb-8">
            {content.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Media Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[30px] p-4 md:p-6 shadow-sm border border-[#04142C]/5">
              {/* Main Media Display */}
              <div className="relative aspect-video w-full rounded-[20px] overflow-hidden bg-gray-100 mb-4 group">
                {renderMedia(allMedia[activeMedia])}

                {/* Media Badge */}
                {allMedia.length > 0 && (
                  <div className="absolute md:top-6 md:left-6 top-4 left-4 px-2 md:px-4 py-1 md:py-2 bg-black/40 backdrop-blur-md rounded-full text-white text-[10px] md:text-[12px] font-bold flex items-center gap-2 z-10">
                    {allMedia[activeMedia]?.type === "image" ? (
                      <ImageIcon size={14} />
                    ) : (
                      <Play size={14} fill="currentColor" />
                    )}
                    {activeMedia + 1} / {allMedia.length}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {allMedia.length > 1 && (
                <div className="flex gap-4 overflow-x-auto p-2">
                  {allMedia.map((item, idx) => {
                    const youtubeId =
                      item.type === "video" ? getYouTubeId(item.url) : null;
                    const thumbUrl =
                      item.type === "image"
                        ? item.url
                        : youtubeId
                          ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
                          : "";

                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveMedia(idx)}
                        className={`relative shrink-0 w-24 md:w-32 aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer
                        ${activeMedia === idx ? "border-[#04142C] scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"}
                      `}
                      >
                        {thumbUrl ? (
                          <img
                            src={thumbUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-black flex items-center justify-center">
                            <Play
                              className="text-white"
                              size={20}
                              fill="currentColor"
                            />
                          </div>
                        )}
                        {item.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Play
                              className="text-white"
                              size={16}
                              fill="currentColor"
                            />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Full Content */}
            <div className="mt-10 mb-16">
              <div className="prose prose-lg max-w-none text-[#04142C]/80 font-open-sans leading-relaxed whitespace-pre-line text-[16px] md:text-[19px]">
                {content.description}
              </div>
            </div>
          </div>

          {/* Right Column: Other News */}
          <div className="lg:col-span-1">
            <h3 className="text-[#04142C] text-[24px] font-montserrat font-bold mb-8 flex items-center gap-3">
              {t.news.otherNews}
              <div className="flex-1 h-[2px] bg-[#04142C]/5"></div>
            </h3>

            <div className="flex flex-col gap-8">
              {otherNews.map((item) => {
                const otherContent = item[language] || item.uz;
                return (
                  <Link
                    key={item.id}
                    to={`/news/${item.id}`}
                    className="group flex flex-col gap-4 bg-white p-4 rounded-[20px] border border-[#04142C]/5 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-video w-full rounded-[12px] overflow-hidden bg-gray-100">
                      <img
                        src={
                          item.image ||
                          (item.media && item.media[0] ? item.media[0].url : "")
                        }
                        alt={otherContent.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <span className="text-[#04142C]/40 text-[13px] font-medium flex items-center gap-1.5 mb-2">
                        <Calendar size={14} />
                        {item.date || otherContent.date}
                      </span>
                      <h4 className="text-[#04142C] font-montserrat font-bold text-[18px] leading-snug group-hover:text-[#04142C]/80 line-clamp-2 transition-colors">
                        {otherContent.title}
                      </h4>
                    </div>
                  </Link>
                );
              })}

              <Link
                to="/news"
                className="w-full mt-4 h-[60px] border-2 border-[#04142C]/10 rounded-[15px] text-[#04142C] font-montserrat font-bold text-[16px] flex items-center justify-center gap-3 hover:bg-[#04142C] hover:text-white transition-all duration-300"
              >
                {t.news.allNews}
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedZoomMedia && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
          <div
            className="absolute inset-0 bg-[#04142C]/90 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out_forwards]"
            onClick={() => setSelectedZoomMedia(null)}
          ></div>

          <button
            onClick={() => setSelectedZoomMedia(null)}
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white cursor-pointer z-20"
          >
            <X size={32} />
          </button>

          <div className="relative z-10 max-w-[90vw] w-full max-h-full flex flex-col items-center animate-[modalScaleIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
            <div className="bg-white p-1 md:p-2 rounded-[20px] shadow-2xl flex items-center justify-center max-h-[85vh] w-auto">
              <img
                src={selectedZoomMedia.url}
                alt=""
                className="max-w-full max-h-[80vh] object-contain rounded-[15px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default NewsDetail;
