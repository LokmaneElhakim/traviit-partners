
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../lib/translations';

type Language = 'en' | 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Initial load
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      updateLanguage(savedLang);
    }
  }, []);

  const updateLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Update HTML attributes
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    // Cycle: en -> fr -> ar -> en
    let newLang: Language = 'en';
    if (language === 'en') newLang = 'fr';
    else if (language === 'fr') newLang = 'ar';
    else newLang = 'en';
    
    updateLanguage(newLang);
  };

  const t = (key: string) => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage: updateLanguage, t, dir: language === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
