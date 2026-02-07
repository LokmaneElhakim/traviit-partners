
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../ui/Button';

interface RecruiterSectionProps {
  onAuthClick: () => void;
}

const RecruiterLandingSection: React.FC<RecruiterSectionProps> = ({ onAuthClick }) => {
  const { t } = useLanguage();

  return (
    <section id="companies" className="py-24 bg-white dark:bg-deep-navy relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-5"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric-blue/10 dark:bg-electric-blue/20 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-xs font-bold uppercase tracking-wider mb-6">
                For Recruiters
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {t('recruiter.landing.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {t('recruiter.landing.desc')}
            </p>
            <Button 
                onClick={onAuthClick}
                size="lg"
                className="bg-electric-blue hover:bg-blue-600 text-white border-transparent shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20"
                rightIcon={<span className="material-symbols-outlined text-sm rtl-mirror">arrow_forward</span>}
            >
                {t('recruiter.landing.cta')}
            </Button>
          </div>
          
          <div className="md:w-1/2 relative">
             <div className="relative z-10 glass-card bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10 p-2 rounded-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 shadow-2xl">
                 <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Recruiter Dashboard" 
                    className="rounded-xl shadow-inner"
                 />
                 <div className="absolute -bottom-6 -left-6 bg-white dark:bg-[#1a202c] p-4 rounded-xl shadow-xl border border-gray-100 dark:border-white/5 flex items-center gap-4 animate-float-3d">
                     <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                         <span className="material-symbols-outlined">check_circle</span>
                     </div>
                     <div>
                         <div className="text-sm font-bold text-gray-900 dark:text-white">Verified Talent</div>
                         <div className="text-xs text-gray-500">Skills & Identity Checked</div>
                     </div>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruiterLandingSection;
