
"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import CandidateWizard from './CandidateWizard';
import LoginForm from './LoginForm';
import RecruiterForm from './RecruiterForm';
import RecruiterLogin from './RecruiterLogin';
import Button from '../ui/Button';

type AuthView = 'login' | 'wizard' | 'recruiter-login' | 'recruiter-signup';

interface AuthPageProps {
  onBack: () => void;
  initialMode?: 'login' | 'signup' | 'recruiter' | 'recruiter_signup';
}

const AuthPage: React.FC<AuthPageProps> = ({ onBack, initialMode = 'signup' }) => {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<AuthView>('wizard');
  const [showBackButton, setShowBackButton] = useState(true);
  const [startRecruiterDashboard, setStartRecruiterDashboard] = useState(false);

  useEffect(() => {
    if (initialMode === 'login') setCurrentView('login');
    else if (initialMode === 'recruiter') setCurrentView('recruiter-login');
    else if (initialMode === 'recruiter_signup') setCurrentView('recruiter-signup');
    else setCurrentView('wizard');
    
    setShowBackButton(true);
    setStartRecruiterDashboard(false);
  }, [initialMode]);

  // Reset back button when changing views, unless specifically entering dashboard flow
  useEffect(() => {
      // If we switched views, default to showing back button
      // The child component will hide it again if it mounts directly into dashboard mode
      if (currentView !== 'recruiter-signup' || !startRecruiterDashboard) {
          setShowBackButton(true);
      }
  }, [currentView, startRecruiterDashboard]);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50 dark:bg-[#020408] overflow-hidden transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-gray-50 dark:from-transparent dark:via-[#0B1120]/80 dark:to-[#020408] z-0"></div>
      <div className="absolute inset-0 circuit-grid opacity-10 dark:opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen z-0"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-blue/10 dark:bg-electric-blue/15 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/4 z-0"></div>
      
      {/* Back Button - Hidden when showBackButton is false (on Dashboards) */}
      {showBackButton && (
        <Button 
            variant="ghost" 
            className="absolute top-8 left-8 z-50 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            onClick={onBack}
            leftIcon={<span className="material-symbols-outlined rtl-mirror">arrow_back</span>}
        >
            {t('nav.back')}
        </Button>
      )}

      <div className="w-full max-w-7xl relative z-10 flex justify-center">
        
        {currentView === 'login' && (
            <LoginForm onSwitchToSignup={() => setCurrentView('wizard')} />
        )}

        {currentView === 'wizard' && (
            <CandidateWizard 
                onLogout={onBack} 
                onDashboardEnter={() => setShowBackButton(false)} 
            />
        )}

        {currentView === 'recruiter-login' && (
            <RecruiterLogin 
                onSwitchToSignup={() => setCurrentView('recruiter-signup')}
                onLoginSuccess={() => {
                    setStartRecruiterDashboard(true);
                    setCurrentView('recruiter-signup');
                }}
            />
        )}

        {currentView === 'recruiter-signup' && (
            <RecruiterForm 
                onLogout={onBack} 
                onDashboardEnter={() => setShowBackButton(false)}
                initialDashboard={startRecruiterDashboard}
            />
        )}

      </div>
    </div>
  );
};

export default AuthPage;
