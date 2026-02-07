
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../ui/Button';

interface CtaProps {
  onAuthClick: () => void;
}

const CtaSection: React.FC<CtaProps> = ({ onAuthClick }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gray-50 dark:bg-black py-32 border-t border-gray-200 dark:border-white/5 transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl opacity-30 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-electric-blue/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-normal"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-electric-blue/20 dark:bg-blue-900 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-normal"></div>
      </div>
      
      <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white mb-8 drop-shadow-sm">
          {t('cta.title')}
        </h2>
        <p className="mx-auto max-w-2xl text-xl leading-8 text-gray-600 dark:text-gray-400 mb-12 font-light">
          {t('cta.desc')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button 
            onClick={onAuthClick}
            variant="primary"
            size="lg"
            className="px-12 py-5 text-lg min-w-[200px] rounded-full bg-electric-blue text-white hover:bg-blue-600 shadow-xl shadow-blue-500/20 transition-all duration-300 transform hover:scale-105"
          >
             {t('cta.join')}
          </Button>
          <a
            className="text-lg font-semibold leading-6 text-gray-900 dark:text-white hover:text-electric-blue transition-colors flex items-center gap-2"
            href="#"
          >
             {t('cta.contact')}
            <span className="material-symbols-outlined text-sm rtl-mirror">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
