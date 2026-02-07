
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Timeline: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'seeker' | 'recruiter'>('seeker');

  const steps = activeTab === 'seeker' ? [
      { title: t('timeline.seeker.step1.title'), desc: t('timeline.seeker.step1.desc'), icon: 'edit_note' },
      { title: t('timeline.seeker.step2.title'), desc: t('timeline.seeker.step2.desc'), icon: 'dashboard_customize' },
      { title: t('timeline.seeker.step3.title'), desc: t('timeline.seeker.step3.desc'), icon: 'download' }
  ] : [
      { title: t('timeline.recruiter.step1.title'), desc: t('timeline.recruiter.step1.desc'), icon: 'filter_alt' },
      { title: t('timeline.recruiter.step2.title'), desc: t('timeline.recruiter.step2.desc'), icon: 'manage_accounts' },
      { title: t('timeline.recruiter.step3.title'), desc: t('timeline.recruiter.step3.desc'), icon: 'description' }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-midnight relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-electric-blue font-semibold tracking-wide uppercase text-sm">
            {t('timeline.badge')}
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t('timeline.title')}
          </h2>
          
          {/* Custom Toggle */}
          <div className="mt-8 inline-flex bg-white dark:bg-white/5 p-1 rounded-full border border-gray-200 dark:border-white/10 relative">
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-electric-blue rounded-full transition-all duration-300 ${activeTab === 'seeker' ? 'left-1 rtl:right-1 rtl:left-auto' : 'left-[calc(50%+2px)] rtl:right-[calc(50%+2px)] rtl:left-auto'}`}
              ></div>
              <button 
                onClick={() => setActiveTab('seeker')}
                className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'seeker' ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}
              >
                  {t('timeline.toggle.seeker')}
              </button>
              <button 
                onClick={() => setActiveTab('recruiter')}
                className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'recruiter' ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}
              >
                  {t('timeline.toggle.recruiter')}
              </button>
          </div>

          <h3 className="mt-8 text-xl font-bold text-gray-900 dark:text-white">
              {activeTab === 'seeker' ? t('timeline.seeker.title') : t('timeline.recruiter.title')}
          </h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* The vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-electric-blue/30 dark:via-electric-blue/50 to-transparent transform -translate-x-1/2 hidden md:block z-0"></div>

          <div className="space-y-12 md:space-y-24">
            
            {steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
                  <div className={`md:w-[42%] ${idx % 2 !== 0 ? 'hidden md:block' : ''} ${idx % 2 === 0 ? 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 rounded-2xl md:text-end hover:shadow-lg dark:hover:bg-white/[0.08] transition-all relative group shadow-sm animate-fadeIn' : ''}`}>
                    {idx % 2 === 0 && (
                        <>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-electric-blue transition-colors">
                            {step.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {step.desc}
                            </p>
                        </>
                    )}
                  </div>
                  
                  <div className="relative z-10 w-12 h-12 rounded-full bg-white dark:bg-deep-navy border-4 border-electric-blue flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] transform transition-transform hover:scale-110">
                    <span className="material-symbols-outlined text-gray-700 dark:text-white text-sm">
                      {step.icon}
                    </span>
                  </div>

                  <div className={`md:w-[42%] ${idx % 2 === 0 ? 'hidden md:block' : ''} ${idx % 2 !== 0 ? 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 rounded-2xl hover:shadow-lg dark:hover:bg-white/[0.08] transition-all relative group shadow-sm animate-fadeIn' : ''}`}>
                    {idx % 2 !== 0 && (
                        <>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-electric-blue transition-colors">
                            {step.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {step.desc}
                            </p>
                        </>
                    )}
                  </div>
                </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
