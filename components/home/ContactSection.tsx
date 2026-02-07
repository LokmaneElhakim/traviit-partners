import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../ui/Button';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white dark:bg-midnight relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {t('contact.desc')}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Email Us</div>
                  <div className="text-gray-600 dark:text-gray-400">hello@traviit.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Visit Us</div>
                  <div className="text-gray-600 dark:text-gray-400">Algiers, Algeria</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-[#0B1120]/50 backdrop-blur-xl shadow-2xl relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/10 rounded-full blur-3xl -z-10"></div>
             
             <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">{t('contact.form.name')}</label>
                    <input type="text" className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-electric-blue outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">{t('contact.form.email')}</label>
                    <input type="email" className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-electric-blue outline-none transition-all" />
                  </div>
                </div>
                
                <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">{t('contact.form.subject')}</label>
                    <input type="text" className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-electric-blue outline-none transition-all" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">{t('contact.form.message')}</label>
                    <textarea rows={4} className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-electric-blue outline-none transition-all"></textarea>
                </div>

                <Button fullWidth size="lg" className="mt-4" rightIcon={<span className="material-symbols-outlined text-sm rtl-mirror">send</span>}>
                  {t('contact.btn.send')}
                </Button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;