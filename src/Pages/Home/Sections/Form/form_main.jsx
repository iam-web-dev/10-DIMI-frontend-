import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Send, Check, X as CloseIcon } from "lucide-react";
import { useLanguage } from "../../../../Context/LanguageContext";
import { useData } from "../../../../Context/DataContext";
import { translations } from "../../../../Data/translations";
import bg from "./bg.svg";

const Form_main = () => {
  const { language } = useLanguage();
  const { settings, sendContactRequest } = useData();
  const t = translations[language];
  const location = useLocation();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("998");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (location.state && location.state.prefilledMessage) {
      setMessage(location.state.prefilledMessage);

      // Scroll to form after a short delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById("form");
        if (element) {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || phoneNumber.length < 12) {
      alert(
        language === "uz"
          ? "Iltimos, barcha maydonlarni to'ldiring!"
          : "Пожалуйста, заполните все поля!",
      );
      return;
    }

    setLoading(true);

    try {
      const res = await sendContactRequest({
        name: name,
        phone: `+${phoneNumber}`,
        message: message || "Xabar yo'q",
      });

      if (res) {
        setShowSuccessModal(true);
        setName("");
        setPhoneNumber("998");
        setMessage("");
      } else {
        throw new Error(
          language === "uz" ? "Xatolik yuz berdi" : "Произошла ошибка",
        );
      }
    } catch (error) {
      alert(`Xatolik: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value) => {
    if (!value) return "+998";

    const digits = value.replace(/\D/g, "");
    let res = "+998";

    if (digits.length > 3) {
      res += ` (${digits.substring(3, 5)}`;
    }
    if (digits.length > 5) {
      res += `) ${digits.substring(5, 8)}`;
    }
    if (digits.length > 8) {
      res += ` ${digits.substring(8, 10)}`;
    }
    if (digits.length > 10) {
      res += ` ${digits.substring(10, 12)}`;
    }

    return res;
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (!value.startsWith("998")) {
      value = "998";
    }

    if (value.length <= 12) {
      setPhoneNumber(value);
    }
  };

  return (
    <div className="relative overflow-x-clip">
      <img
        src={bg}
        alt=""
        className="absolute w-full h-auto top-[30%] opacity-50 md:opacity-100"
      />
      <div
        id="form"
        className="relative pt-12 md:pt-[100px] mb-10 px-6 md:px-[50px]"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#04142C]/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-10 md:mb-16 gap-8 relative">
              <div className="flex flex-col text-center md:text-left items-center md:items-start">
                <h2 className="text-[#04142C] text-[28px] md:text-[32px] font-montserrat font-bold leading-tight mb-4 md:mb-6">
                  {t.form.title}
                </h2>
                <p className="text-[#04142C]/70 text-[16px] md:text-[20px] font-open-sans font-medium max-w-2xl leading-relaxed">
                  {t.form.description}
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-3 md:gap-4 md:absolute md:right-0 md:top-0">
                <div className="bg-[#04142C]/5 backdrop-blur-md border md:rotate-[3deg] border-[#04142C]/10 rounded-full px-5 py-2.5 md:px-6 md:py-3 shadow-[inset_0_2px_12_12px_rgba(0,0,0,0.05)] flex items-center gap-3">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  <span className="text-[#04142C] font-open-sans font-semibold text-[14px] md:text-[16px]">
                    {t.form.workTime}
                  </span>
                </div>
                <p className="text-[#04142C]/55 text-[24px] md:text-[35px] font-caveat md:-rotate-[3deg] md:mr-10 select-none">
                  {t.form.alwaysInTouch}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-8 items-start mb-10 md:mb-16">
              <div className="flex flex-col gap-4 md:gap-5 md:col-span-2">
                <div className="flex flex-col gap-1.5">
                  <label className="font-open-sans font-medium text-[16px] md:text-[20px] text-[#04142C] ml-1">
                    {t.form.labelName}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.form.placeholderName}
                      className="w-full h-[55px] md:h-[75px] bg-[#04142C]/5 backdrop-blur-md border border-[#04142C]/10 rounded-[12px] md:rounded-[15px] px-6 md:px-8 font-open-sans text-[15px] md:text-[18px] text-[#04142C] shadow-[inset_0_2px_12px_rgba(0,0,0,0.08)] focus:outline-none focus:border-[#04142C]/30 transition-all placeholder:text-[#04142C]/30"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-open-sans font-medium text-[16px] md:text-[20px] text-[#04142C] ml-1">
                    {t.form.labelPhone}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formatPhoneNumber(phoneNumber)}
                      onChange={handlePhoneChange}
                      placeholder="+998 ( ) __ ___ __ __"
                      className="w-full h-[55px] md:h-[75px] bg-[#04142C]/5 backdrop-blur-md border border-[#04142C]/10 rounded-[12px] md:rounded-[15px] px-6 md:px-8 font-open-sans text-[15px] md:text-[18px] text-[#04142C] shadow-[inset_0_2px_12px_rgba(0,0,0,0.08)] focus:outline-none focus:border-[#04142C]/30 transition-all placeholder:text-[#04142C]/30"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 h-full">
                <div className="flex flex-col gap-1.5 h-full">
                  <label className="font-open-sans font-medium text-[16px] md:text-[20px] text-[#04142C] ml-1">
                    {t.form.labelMessage}
                  </label>
                  <textarea
                    placeholder={t.form.placeholderMessage}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full min-h-[140px] md:min-h-[200px] bg-[#04142C]/5 backdrop-blur-md border border-[#04142C]/10 rounded-[12px] md:rounded-[15px] p-6 md:p-8 font-open-sans text-[15px] md:text-[18px] text-[#04142C] shadow-[inset_0_2px_12px_rgba(0,0,0,0.08)] focus:outline-none focus:border-[#04142C]/30 transition-all placeholder:text-[#04142C]/30 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-3 px-10 h-[50px] md:h-[60px] bg-[#04142C] rounded-full text-white font-montserrat font-semibold text-[16px] md:text-[18px] hover:bg-[#04142C]/90 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? language === "uz"
                    ? "Yuborilmoqda..."
                    : "Отправка..."
                  : t.form.send}
                {!loading && (
                  <Send
                    size={20}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-[#04142C]/40 backdrop-blur-sm animate-in fade-in duration-500"
            onClick={() => setShowSuccessModal(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-500 text-center">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-6 right-6 text-[#04142C]/20 hover:text-[#04142C] transition-colors p-2"
            >
              <CloseIcon size={24} />
            </button>

            <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-green-500 mx-auto mb-8 animate-bounce transition-all">
              <Check size={40} strokeWidth={3} />
            </div>

            <h3 className="text-3xl font-montserrat font-bold text-[#04142C] mb-4">
              {t.form.successTitle}
            </h3>
            <p className="text-[#04142C]/60 text-lg leading-relaxed mb-10">
              {t.form.successDesc}
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-[#04142C] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#04142C]/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#04142C]/20"
            >
              Tushunarli
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form_main;
