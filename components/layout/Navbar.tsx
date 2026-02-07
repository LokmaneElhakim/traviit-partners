import React, { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import Button from "../ui/Button";

interface NavbarProps {
  onAuthClick: (mode: "login" | "signup" | "recruiter") => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAuthClick }) => {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toggleLanguage, language, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const getLangLabel = (lang: string) => {
    switch (lang) {
      case "en":
        return "EN";
      case "fr":
        return "FR";
      case "ar":
        return "AR";
      default:
        return "EN";
    }
  };

  const setLanguage = (lang: "en" | "fr" | "ar") => {
    if (language !== lang) {
      toggleLanguage();
    }
    setIsLangMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <div className="fixed top-4 sm:top-6 left-0 right-0 z-[1000] flex justify-center px-6 lg:px-8 transition-all duration-300">
        <nav className="w-full max-w-7xl bg-white/90 dark:bg-[#0F1623]/90 backdrop-blur-2xl rounded-full border border-gray-200/50 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-300">
          <div className="flex h-[72px] items-center justify-between px-4 sm:px-6 relative">
            {/* Logo Section */}
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 cursor-pointer group select-none z-50"
            >
              <div className="w-10 h-10 min-w-[40px] rounded-full overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm group-hover:scale-105 transition-transform duration-300 bg-white dark:bg-black relative">
                <img
                  src="/image.png"
                  alt="Traviit Logo"
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white hidden sm:block">
                Traviit
              </span>
            </div>

            {/* Desktop Links - Centered */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100/50 dark:bg-white/5 p-1.5 rounded-full border border-gray-200/50 dark:border-white/5">
              <button
                onClick={() => scrollToSection("companies")}
                className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all"
              >
                {t("nav.companies")}
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all"
              >
                {t("nav.features")}
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all"
              >
                {t("nav.faq")}
              </button>
            </div>

            {/* Desktop Actions - Right */}
            <div
              className={`hidden lg:flex items-center ${
                language === "ar" ? "gap-1" : "gap-2"
              } relative`}
            >
              <button
                onClick={() => setIsLangMenuOpen((open) => !open)}
                className={`h-9 min-w-[96px] px-4 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-xs font-bold text-gray-600 dark:text-gray-300 transition-colors flex items-center justify-between gap-2 border border-gray-200/70 dark:border-white/10 whitespace-nowrap ${
                  language === "ar" ? "mr-2" : ""
                }`}
              >
                <span>{getLangLabel(language)}</span>
                <span className="material-symbols-outlined text-[16px]">
                  expand_more
                </span>
              </button>
              {isLangMenuOpen && (
                <div className="absolute top-12 left-0 rtl:left-auto rtl:right-0 z-[1200] min-w-[170px] rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white/95 dark:bg-[#0F1623]/95 backdrop-blur-xl shadow-xl p-2">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      language === "en"
                        ? "bg-electric-blue/10 text-electric-blue"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                  >
                    English
                    <span className="text-xs font-bold">EN</span>
                  </button>
                  <button
                    onClick={() => setLanguage("fr")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      language === "fr"
                        ? "bg-electric-blue/10 text-electric-blue"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                  >
                    Français
                    <span className="text-xs font-bold">FR</span>
                  </button>
                  <button
                    onClick={() => setLanguage("ar")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      language === "ar"
                        ? "bg-electric-blue/10 text-electric-blue"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                  >
                    العربية
                    <span className="text-xs font-bold">AR</span>
                  </button>
                </div>
              )}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-white/10"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {mounted && isDark ? "light_mode" : "dark_mode"}
                </span>
              </button>

              <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-2"></div>

              <button
                onClick={() => onAuthClick("login")}
                className="px-4 py-2 text-sm font-bold text-gray-700 dark:text-white hover:text-electric-blue transition-colors"
              >
                {t("nav.login")}
              </button>
              <Button
                onClick={() => onAuthClick("signup")}
                size="sm"
                className="rounded-full px-6 shadow-neon"
              >
                {t("nav.joinTalent")}
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-3 relative">
              <button
                onClick={() => setIsLangMenuOpen((open) => !open)}
                className="h-8 min-w-[86px] px-3 rounded-full bg-gray-100 dark:bg-white/5 text-[10px] font-bold text-gray-600 dark:text-gray-300 flex items-center justify-between gap-1 border border-transparent hover:border-gray-200 dark:hover:border-white/10 whitespace-nowrap"
              >
                {getLangLabel(language)}
                <span className="material-symbols-outlined text-[14px]">
                  expand_more
                </span>
              </button>
              {isLangMenuOpen && (
                <div className="absolute top-10 left-0 rtl:left-auto rtl:right-0 z-[1200] min-w-[160px] rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white/95 dark:bg-[#0F1623]/95 backdrop-blur-xl shadow-xl p-2">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      language === "en"
                        ? "bg-electric-blue/10 text-electric-blue"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                  >
                    English
                    <span className="text-[10px] font-bold">EN</span>
                  </button>
                  <button
                    onClick={() => setLanguage("fr")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      language === "fr"
                        ? "bg-electric-blue/10 text-electric-blue"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                  >
                    Français
                    <span className="text-[10px] font-bold">FR</span>
                  </button>
                  <button
                    onClick={() => setLanguage("ar")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      language === "ar"
                        ? "bg-electric-blue/10 text-electric-blue"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                  >
                    العربية
                    <span className="text-[10px] font-bold">AR</span>
                  </button>
                </div>
              )}
              <button
                className="p-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-white/10"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <span className="material-symbols-outlined text-xl block">
                  menu
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar (Sheet) */}
      <div
        className={`fixed inset-0 z-[2000] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Sidebar Content */}
        <div
          className={`absolute top-0 right-0 h-full w-[280px] bg-white dark:bg-[#0B1120] border-l border-gray-200 dark:border-white/10 shadow-2xl p-6 flex flex-col transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} rtl:right-auto rtl:left-0 rtl:border-l-0 rtl:border-r rtl:${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm bg-white dark:bg-black">
                <img
                  src="/image.png"
                  alt="Traviit Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                Traviit
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-red-500 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <button
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
              onClick={() => scrollToSection("companies")}
            >
              <span className="material-symbols-outlined text-gray-400 text-xl">
                business
              </span>
              {t("nav.companies")}
            </button>
            <button
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
              onClick={() => scrollToSection("features")}
            >
              <span className="material-symbols-outlined text-gray-400 text-xl">
                star
              </span>
              {t("nav.features")}
            </button>
            <button
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
              onClick={() => scrollToSection("faq")}
            >
              <span className="material-symbols-outlined text-gray-400 text-xl">
                help
              </span>
              {t("nav.faq")}
            </button>

            <div className="h-px w-full bg-gray-100 dark:bg-white/5 my-4"></div>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
            >
              <span className="material-symbols-outlined text-gray-400 text-xl">
                {mounted && isDark ? "light_mode" : "dark_mode"}
              </span>
              {mounted && isDark ? t("nav.mode.light") : t("nav.mode.dark")}
            </button>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <Button
              fullWidth
              variant="outline"
              className="rounded-xl py-3 justify-center"
              onClick={() => {
                onAuthClick("login");
                setIsMobileMenuOpen(false);
              }}
            >
              {t("nav.login")}
            </Button>
            <Button
              fullWidth
              className="rounded-xl py-3 justify-center shadow-lg shadow-blue-500/20"
              onClick={() => {
                onAuthClick("signup");
                setIsMobileMenuOpen(false);
              }}
            >
              {t("nav.joinTalent")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
