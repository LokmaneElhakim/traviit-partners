
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../ui/Button';

interface HeroProps {
  onAuthClick: (mode: 'login' | 'signup' | 'recruiter') => void;
}

const Hero: React.FC<HeroProps> = ({ onAuthClick }) => {
  const { t } = useLanguage();

  return (
    <header className="relative min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20 flex items-center overflow-hidden bg-gray-50 dark:bg-[#020408] transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-gray-50 dark:from-transparent dark:via-[#0B1120]/80 dark:to-[#020408] z-0 transition-colors duration-300"></div>
      <div className="absolute inset-0 circuit-grid opacity-10 dark:opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen z-0"></div>
      <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-electric-blue/10 dark:bg-electric-blue/15 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none translate-x-1/2 rtl:-translate-x-1/2 -translate-y-1/4 z-0"></div>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 w-full relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-start lg:rtl:text-right">
          <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md mb-6 sm:mb-8 hover:border-electric-blue/50 dark:hover:border-electric-blue/50 transition-all duration-300 cursor-default group shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
              {t('hero.badge')}
            </span>
            <span className="material-symbols-outlined text-sm text-gray-400 group-hover:text-electric-blue transition-colors rtl-mirror -ml-1">
              arrow_forward
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-[800] leading-[1.1] tracking-tight text-gray-900 dark:text-white mb-6 sm:mb-8 drop-shadow-xl dark:drop-shadow-2xl transition-colors duration-300">
            {t('hero.title.prefix')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-blue-400 to-electric-blue dark:from-white dark:via-blue-200 dark:to-blue-500">
              {t('hero.title.highlight')}
            </span>
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 font-light drop-shadow-sm transition-colors duration-300">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start">
            <Button 
              onClick={() => onAuthClick('signup')}
              size="lg"
              variant="primary"
              className="group shadow-neon w-full sm:w-auto"
              rightIcon={
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl-mirror">
                  arrow_forward
                </span>
              }
            >
              {t('hero.cta.join')}
            </Button>
            
            <Button 
              onClick={() => onAuthClick('login')}
              size="lg"
              variant="outline"
              className="bg-white/50 dark:bg-white/5 backdrop-blur-md w-full sm:w-auto"
            >
              {t('hero.cta.login')}
            </Button>
          </div>
        </div>

        {/* Right 3D Visual */}
        <div className="relative w-full h-[450px] sm:h-[600px] flex items-center justify-center mt-8 lg:mt-0 group">
            
          {/* Animated Glow Behind */}
          <div className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-electric-blue/20 rounded-full blur-[60px] sm:blur-[90px] -z-10 animate-pulse"></div>

          {/* The 3D Container */}
          <div className="w-[300px] h-[450px] sm:w-[380px] sm:h-[520px] card-3d-container transition-all duration-300">
            <div className="card-3d-body">
              
              {/* Card Shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-electric-blue/20 blur-xl rounded-full z-0"></div>

              {/* Main Profile Card */}
              <div className="absolute inset-0 glass-card rounded-[32px] flex flex-col overflow-hidden z-10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)] border border-white/50 dark:border-white/10 bg-gradient-to-br from-white/80 to-white/20 dark:from-[#1e293b]/40 dark:to-transparent backdrop-blur-2xl">
                <div className="relative h-28 sm:h-32 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-white/5 dark:to-transparent p-6 flex justify-between items-start border-b border-gray-100 dark:border-white/5">
                  <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-40 h-40 bg-electric-blue/10 dark:bg-electric-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2"></div>
                  <div className="relative px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/40 text-electric-blue text-[10px] font-bold tracking-widest backdrop-blur-md flex items-center gap-2 glow-aura shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue"></span>
                    </span>
                    {t('hero.card.verified')}
                  </div>
                  <span className="material-symbols-outlined text-gray-400 dark:text-white/30 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                    more_vert
                  </span>
                </div>

                <div className="px-6 sm:px-8 -mt-14 sm:-mt-16 flex flex-col items-center text-center relative z-10">
                  <div className="relative group-hover:scale-105 transition-transform duration-500 ease-out">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[3px] bg-gradient-to-br from-white via-blue-400 to-electric-blue shadow-2xl">
                      <img
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover border-[4px] border-white dark:border-[#0B1120]"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                      />
                    </div>
                    <div className="absolute bottom-1 right-1 rtl:right-auto rtl:left-1 w-8 h-8 sm:w-9 sm:h-9 bg-electric-blue rounded-full border-[4px] border-white dark:border-[#0B1120] flex items-center justify-center text-white shadow-lg">
                      <span className="material-symbols-outlined text-[14px] sm:text-[16px] font-bold">
                        lock
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {t('hero.mock.name')}
                  </h3>
                  <p className="text-xs sm:text-sm text-electric-blue dark:text-blue-300 font-medium mt-1 mb-4 sm:mb-6">
                    {t('hero.mock.role')}
                  </p>

                  <div className="w-full grid grid-cols-2 gap-3 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 bg-white/50 dark:bg-white/5 rounded-xl border border-white/60 dark:border-white/5 flex flex-col items-center justify-center gap-1 group/stat hover:bg-white/80 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none">
                      <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">6</span>
                      <span className="text-[8px] sm:text-[9px] text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        {t('hero.card.exp')}
                      </span>
                    </div>
                    <div className="p-2 sm:p-3 bg-white/50 dark:bg-white/5 rounded-xl border border-white/60 dark:border-white/5 flex flex-col items-center justify-center gap-1 group/stat hover:bg-white/80 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none">
                      <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">18</span>
                      <span className="text-[8px] sm:text-[9px] text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        {t('hero.card.projects')}
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex flex-wrap justify-center gap-2 mb-4 sm:mb-6">
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/40 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[9px] sm:text-[10px] text-gray-600 dark:text-gray-300 font-medium">
                      React
                    </span>
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/40 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[9px] sm:text-[10px] text-gray-600 dark:text-gray-300 font-medium">
                      Node.js
                    </span>
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/40 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[9px] sm:text-[10px] text-gray-600 dark:text-gray-300 font-medium">
                      TypeScript
                    </span>
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/40 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[9px] sm:text-[10px] text-gray-600 dark:text-gray-300 font-medium">
                      AWS
                    </span>
                  </div>

                  <div className="w-full pt-4 border-t border-gray-200 dark:border-white/10 flex justify-between items-center text-xs">
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400 uppercase tracking-wider font-bold text-[7px] sm:text-[8px]">{t('hero.mock.preference')}</span>
                        <span className="font-bold text-gray-700 dark:text-gray-200 text-[10px] sm:text-xs">{t('hero.mock.remote')}</span>
                    </div>
                    <div className="w-px h-6 bg-gray-200 dark:bg-white/10"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400 uppercase tracking-wider font-bold text-[7px] sm:text-[8px]">{t('hero.mock.location')}</span>
                        <span className="font-bold text-gray-700 dark:text-gray-200 text-[10px] sm:text-xs">{t('hero.mock.city')}</span>
                    </div>
                    <div className="w-px h-6 bg-gray-200 dark:bg-white/10"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-gray-400 uppercase tracking-wider font-bold text-[7px] sm:text-[8px]">{t('hero.mock.status')}</span>
                        <span className="font-bold text-green-500 text-[10px] sm:text-xs">{t('hero.mock.available')}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating Element: Match Score */}
              <div 
                className="absolute -left-2 sm:-left-12 rtl:left-auto rtl:-right-2 sm:rtl:-right-12 top-8 sm:top-10 w-24 h-24 sm:w-32 sm:h-32 glass-card rounded-full flex items-center justify-center z-40 shadow-[0_0_40px_rgba(59,130,246,0.15)] dark:shadow-[0_0_40px_rgba(59,130,246,0.25)] animate-float-3d border border-white/40 dark:border-white/10"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="relative w-16 h-16 sm:w-24 sm:h-24">
                  <svg className="w-full h-full transform -rotate-90 rtl:rotate-90" viewBox="0 0 96 96">
                    <circle
                      className="text-gray-200 dark:text-white/5"
                      cx="48"
                      cy="48"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="6"
                    ></circle>
                    <circle
                      className="text-electric-blue drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                      cx="48"
                      cy="48"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      strokeDasharray="251.2"
                      strokeDashoffset="25"
                      strokeLinecap="round"
                      strokeWidth="6"
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white drop-shadow-md">
                      98
                    </span>
                    <span className="text-[6px] sm:text-[8px] uppercase tracking-wider text-electric-blue dark:text-blue-300 font-bold">
                      {t('hero.card.matchScore')}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Floating Element: Traviit Crew Notification */}
              <div 
                className="absolute -right-4 sm:-right-12 rtl:right-auto rtl:-left-4 sm:rtl:-left-12 top-16 sm:top-20 w-56 sm:w-64 glass-card p-3 sm:p-4 rounded-xl z-50 shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-white/40 dark:border-white/20 animate-float-3d-alt backdrop-blur-xl"
                style={{ transform: 'translateZ(60px)' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-electric-blue flex items-center justify-center text-white font-bold text-xs shadow-inner">
                      <span className="material-symbols-outlined text-xs sm:text-sm">groups</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 rtl:right-auto rtl:-left-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white dark:border-[#0B1120] rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-[8px] sm:text-[10px] text-electric-blue uppercase font-bold tracking-wider">
                      {t('hero.mock.notification')}
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-gray-900 dark:text-white">{t('hero.mock.crew')}</div>
                  </div>
                </div>
                <p className="text-[9px] sm:text-[10px] text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                  {t('hero.mock.welcome')}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="primary" className="text-[9px] sm:text-[10px] py-1 sm:py-1.5 h-auto px-2 sm:px-3">
                    {t('hero.card.view')}
                  </Button>
                  <Button size="sm" variant="ghost" className="text-[9px] sm:text-[10px] py-1 sm:py-1.5 h-auto bg-gray-100 dark:bg-white/5 px-2 sm:px-3">
                    LATER
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
