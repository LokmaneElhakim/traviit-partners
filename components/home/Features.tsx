
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Features: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-32 bg-white dark:bg-deep-navy relative overflow-hidden border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
      <div className="absolute top-1/2 left-0 w-full h-[600px] -translate-y-1/2 bg-electric-blue/5 blur-[120px] pointer-events-none"></div>
      
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8 relative z-10">
        <div className="mb-24 md:text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            {t('features.title.prefix')} <span className="text-electric-blue">{t('features.title.highlight')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('features.description')}
          </p>
        </div>

        <div className="bg-gray-50/50 dark:bg-midnight/30 border border-gray-200 dark:border-white/10 rounded-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse lg:divide-x divide-gray-200 dark:divide-white/10 overflow-hidden shadow-xl dark:shadow-2xl backdrop-blur-sm transition-colors duration-300">
          {/* Feature 1 - Career Dashboard */}
          <div className="group relative p-8 hover:bg-white dark:hover:bg-white/[0.02] transition-colors duration-500 flex flex-col justify-between">
            <div>
              <div className="icon-3d-wrapper w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500 shadow-inner-glow">
                <span className="material-symbols-outlined text-2xl text-gray-700 dark:text-white">
                  dashboard
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-electric-blue transition-colors">
                {t('features.1.title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('features.1.desc')}
              </p>
            </div>
            <div className="w-full h-1 bg-gray-200 dark:bg-white/5 rounded-full mt-6 overflow-hidden">
              <div className="h-full bg-electric-blue w-0 group-hover:w-full transition-all duration-700 ease-out rtl:origin-right"></div>
            </div>
          </div>

          {/* Feature 2 - Secure Environment */}
          <div className="group relative p-8 hover:bg-white dark:hover:bg-white/[0.02] transition-colors duration-500 flex flex-col justify-between">
            <div>
              <div className="icon-3d-wrapper w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500 shadow-inner-glow">
                <span className="material-symbols-outlined text-2xl text-gray-700 dark:text-white">
                  lock_person
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-electric-blue transition-colors">
                 {t('features.2.title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                 {t('features.2.desc')}
              </p>
            </div>
            <div className="w-full h-1 bg-gray-200 dark:bg-white/5 rounded-full mt-6 overflow-hidden">
              <div className="h-full bg-electric-blue w-0 group-hover:w-full transition-all duration-700 ease-out rtl:origin-right"></div>
            </div>
          </div>

          {/* Feature 3 - Direct Connection */}
          <div className="group relative p-8 hover:bg-white dark:hover:bg-white/[0.02] transition-colors duration-500 flex flex-col justify-between">
            <div>
              <div className="icon-3d-wrapper w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500 shadow-inner-glow">
                <span className="material-symbols-outlined text-2xl text-gray-700 dark:text-white">
                  handshake
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-electric-blue transition-colors">
                {t('features.3.title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('features.3.desc')}
              </p>
            </div>
            <div className="w-full h-1 bg-gray-200 dark:bg-white/5 rounded-full mt-6 overflow-hidden">
              <div className="h-full bg-electric-blue w-0 group-hover:w-full transition-all duration-700 ease-out rtl:origin-right"></div>
            </div>
          </div>

          {/* Feature 4 - Smart Matching */}
          <div className="group relative p-8 hover:bg-white dark:hover:bg-white/[0.02] transition-colors duration-500 flex flex-col justify-between">
            <div>
              <div className="icon-3d-wrapper w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500 shadow-inner-glow">
                <span className="material-symbols-outlined text-2xl text-gray-700 dark:text-white">
                  psychology_alt
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-electric-blue transition-colors">
                {t('features.4.title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('features.4.desc')}
              </p>
            </div>
            <div className="w-full h-1 bg-gray-200 dark:bg-white/5 rounded-full mt-6 overflow-hidden">
              <div className="h-full bg-electric-blue w-0 group-hover:w-full transition-all duration-700 ease-out rtl:origin-right"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
