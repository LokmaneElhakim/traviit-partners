
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const StatsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white dark:bg-midnight relative overflow-hidden transition-colors duration-300">
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-20">
          <div className="flex flex-col items-center group">
            <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              +700
            </div>
            <div className="h-1 w-12 bg-electric-blue rounded-full mb-4"></div>
            <div className="text-lg font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
              {t('stats.jobs.total')}
            </div>
          </div>

          <div className="flex flex-col items-center group">
            <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              +14k
            </div>
            <div className="h-1 w-12 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
            <div className="text-lg font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
              {t('stats.community')}
            </div>
          </div>

          <div className="flex flex-col items-center group">
            <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              +50
            </div>
            <div className="h-1 w-12 bg-electric-blue rounded-full mb-4"></div>
            <div className="text-lg font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
              {t('stats.active_hr')}
            </div>
          </div>
        </div>

        {/* WhatsApp Community Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-white/5 shadow-2xl p-8 md:p-12 text-center max-w-5xl mx-auto group">
            {/* Decorative Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#25D366]/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#25D366]/30 transition-colors duration-500"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-electric-blue/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white mb-6 shadow-lg shadow-green-500/30 transform group-hover:rotate-6 transition-transform duration-300">
                    <WhatsAppIcon className="w-10 h-10" />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('stats.whatsapp.title')}
                </h3>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                    {t('stats.whatsapp.desc')}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
                    {/* Full Time Jobs Button */}
                    <a 
                        href="https://whatsapp.com/channel/0029Vb1PlGo3rZZj90KU933m" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group/btn relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#25D366] dark:hover:border-[#25D366] text-gray-900 dark:text-white font-bold transition-all shadow-sm hover:shadow-lg hover:shadow-green-500/10 overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-[#25D366]/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></span>
                        <span className="material-symbols-outlined text-[#25D366] group-hover/btn:scale-110 transition-transform">business_center</span>
                        <span className="relative z-10">{t('stats.btn.fulltime')}</span>
                        <span className="material-symbols-outlined text-gray-400 text-sm rtl-mirror group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform">arrow_forward</span>
                    </a>
                    
                    {/* Student Jobs Button */}
                    <a 
                        href="https://whatsapp.com/channel/0029VavwTpGF1Ylb1a9Su83w" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group/btn relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-1"
                    >
                        <span className="material-symbols-outlined group-hover/btn:rotate-12 transition-transform">school</span>
                        <span>{t('stats.btn.student')}</span>
                    </a>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
