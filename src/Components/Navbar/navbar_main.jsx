import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useLanguage } from "../../Context/LanguageContext";
import { translations } from "../../Data/translations";
import "./navbar.css";

const Navbar_main = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const languages = [
    { code: "uz", label: "UZ", flag: "https://flagcdn.com/w40/uz.png" },
    { code: "ru", label: "RU", flag: "https://flagcdn.com/w40/ru.png" },
    { code: "en", label: "EN", flag: "https://flagcdn.com/w40/gb.png" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/" + "#" + id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 120;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (location.hash && location.pathname === "/") {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const offset = 90;
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [location]);

  const menuItems = [
    { name: t.navbar.about, id: "about" },
    { name: t.navbar.team, id: "team" },
    { name: t.navbar.feedbacks, id: "feedbacks" },
    { name: t.navbar.courses, path: "/courses" },
    { name: t.navbar.news, id: "news" },
    { name: t.navbar.achievements, id: "achievements" }
  ];

  return (
    <nav className={`navbar shadow-lg ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-logo"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsMobileMenuOpen(false);
          }}
        >
          <span className="font-montserrat font-bold text-[32px] md:text-[40px] text-[#04142C]">
            10-DIMI
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.name} className="nav-item">
              {item.path ? (
                <Link to={item.path} className="nav-links">
                  {item.name}
                </Link>
              ) : (
                <button
                  onClick={() => handleNavClick(item.id)}
                  className="nav-links-btn"
                >
                  {item.name}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Actions Section */}
        <div className="nav-actions flex items-center gap-[15px]">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-[5px] border border-[#04142C] pl-[12px] pr-[9px] h-[40px] rounded-[6px] cursor-pointer transition-colors"
            >
              <img
                src={languages.find((l) => l.code === language).flag}
                alt={language}
                className="w-[20px] h-[14px] object-cover rounded-[2px]"
              />
              <svg
                className={`w-[16px] h-[16px] transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isLangOpen && (
              <div className="lang-dropdown absolute right-0 mt-[8px] w-[67px] bg-white shadow-xl rounded-[8px] overflow-hidden z-50 border border-gray-100">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className="flex items-center gap-[10px] w-full px-[13%] py-[7px] hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <img
                      src={lang.flag}
                      alt={lang.code}
                      className="w-[20px] h-[14px] object-cover rounded-[2px]"
                    />
                    <span className="text-black">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick("form")}
            className="ariza-btn cursor-pointer relative flex items-center justify-center border border-[#04142C] rounded-[6px] w-[170px] h-[40px] overflow-hidden transition-all duration-300 hover:scale-101 active:scale-99 group"
          >
            <div className="absolute w-[50px] -translate-x-[180px] h-[200px] rotate-[45deg] bg-[#04142C] opacity-0 transition-opacity duration-400 transition-transform group-hover:translate-x-[185px] group-hover:opacity-10"></div>
            <span className="relative z-10 text-[#04142C] text-[16px] font-open-sans font-medium">
              {t.navbar.apply}
            </span>
          </button>
        </div>

        <div
          className="mobile-icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <div className="mobile-menu-inner p-6">
            {menuItems.map((item) => (
              <div key={item.name} className="mobile-item">
                {item.path ? (
                  <Link
                    to={item.path}
                    className="mobile-links"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="mobile-links-btn"
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}

            {/* Mobile Language Selector */}
            <div className="mt-10">
              <p className="text-[#04142C]/40 text-[11px] font-open-sans font-bold tracking-[2px] mb-4">
                Tilni tanlang / Язык / Language
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-5 py-2.5 rounded-[12px] border transition-all duration-300 cursor-pointer ${
                      language === lang.code
                        ? "bg-[#04142C] border-[#04142C] text-white shadow-lg scale-105"
                        : "bg-white border-[#04142C]/10 text-[#04142C] hover:border-[#04142C]/30"
                    }`}
                  >
                    <img
                      src={lang.flag}
                      alt={lang.label}
                      className="w-5 h-3.5 object-cover rounded-[1px]"
                    />
                    <span className="font-montserrat font-bold text-[14px]">
                      {lang.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Mobile Action Button */}
              <button
                onClick={() => handleNavClick("form")}
                className="w-full bg-[#04142C] text-white py-4 rounded-[12px] font-montserrat font-bold text-[16px] shadow-xl active:scale-95 transition-all cursor-pointer"
              >
                {t.navbar.apply}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#04142C] py-1 md:py-1.5 overflow-hidden whitespace-nowrap border-t border-white/10 mt-auto">
        <div className="flex animate-[marquee_35s_linear_infinite] w-max">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2 px-10">
              <span className="text-white/80 text-[13px] md:text-[13px] font-open-sans">
                {t.testMode.text}
              </span>
              <a
                href="https://t.me/iam_web_dev"
                target="_blank"
                className="text-[11px] md:text-[13px] font-bold text-white underline hover:text-white/80 transition-all font-open-sans"
              >
                @iam_web_dev
              </a>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar_main;
