
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const DashboardPreview: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white dark:bg-deep-navy relative overflow-hidden border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
      <div className="absolute right-0 rtl:right-auto rtl:left-0 top-0 bottom-0 w-1/3 bg-gradient-to-l rtl:bg-gradient-to-r from-electric-blue/5 to-transparent z-0"></div>
      
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* UI Mockup Side */}
          <div className="order-2 md:order-1 relative">
            <div className="rounded-xl bg-gray-50 dark:bg-[#0F1623] border border-gray-200 dark:border-white/10 shadow-2xl p-6 relative overflow-hidden group transition-colors duration-300">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-white/5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('dashboard.whoViewed')}</h3>
                <div className="px-3 py-1 bg-blue-500/10 rounded-full text-[10px] text-electric-blue dark:text-blue-400 font-bold border border-electric-blue/20">
                  {t('dashboard.realTime')}
                </div>
              </div>
              
              <div className="space-y-4">
                {/* List Item 1 */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border border-gray-100 dark:border-transparent hover:border-gray-200 dark:hover:border-white/10 shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center overflow-hidden border border-gray-100 dark:border-none">
                      {/* Prophex Logo Placeholder */}
                      <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">P</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{t('dashboard.mock.company1')}</div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400">{t('dashboard.mock.desc1')}</div>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t('dashboard.mock.time1')}</div>
                    <div className="text-[10px] text-green-600 dark:text-green-400 font-medium">{t('dashboard.unlocked')}</div>
                  </div>
                </div>

                {/* List Item 2 */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border border-gray-100 dark:border-transparent hover:border-gray-200 dark:hover:border-white/10 shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-orange-500 flex items-center justify-center text-white font-bold text-xs">
                      T
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{t('dashboard.mock.company2')}</div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400">{t('dashboard.mock.desc2')}</div>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t('dashboard.mock.time2')}</div>
                    <div className="text-[10px] text-yellow-600 dark:text-yellow-400 font-medium">{t('dashboard.pending')}</div>
                  </div>
                </div>

                {/* List Item 3 */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border border-gray-100 dark:border-transparent hover:border-gray-200 dark:hover:border-white/10 opacity-60 shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                      C
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t('dashboard.mock.company3')}</div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-500">{t('dashboard.mock.desc3')}</div>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t('dashboard.mock.time3')}</div>
                    <div className="text-[10px] text-red-500 dark:text-red-400 font-medium">{t('dashboard.denied')}</div>
                  </div>
                </div>
              </div>

              {/* Tooltip Overlay */}
              <div className="absolute -right-4 rtl:right-auto rtl:-left-4 top-20 bg-electric-blue p-4 rounded-xl shadow-neon z-20 max-w-[180px] transform rotate-3 rtl:-rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <div className="flex gap-2 items-start">
                  <span className="material-symbols-outlined text-white text-lg">
                    verified_user
                  </span>
                  <p className="text-xs font-bold text-white leading-tight">
                    {t('dashboard.tooltip')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content Side */}
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('dashboard.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {t('dashboard.desc')}
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 dark:text-green-400 mt-1 rtl-mirror">
                  check_circle
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {t('dashboard.list1')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 dark:text-green-400 mt-1 rtl-mirror">
                  check_circle
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {t('dashboard.list2')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 dark:text-green-400 mt-1 rtl-mirror">
                  check_circle
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {t('dashboard.list3')}
                </span>
              </li>
            </ul>
            <a
              className="text-electric-blue font-semibold hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-2 group"
              href="#"
            >
              {t('dashboard.cta')}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl-mirror">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
