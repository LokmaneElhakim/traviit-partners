
"use client";

import React from 'react';
import { useRouter } from '../../../lib/router';
import RecruiterLogin from '../../../components/auth/RecruiterLogin';
import Button from '../../../components/ui/Button';
import { useLanguage } from '../../../context/LanguageContext';

export default function RecruiterLoginPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50 dark:bg-[#020408] overflow-hidden transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-gray-50 dark:from-transparent dark:via-[#0B1120]/80 dark:to-[#020408] z-0"></div>
      <div className="absolute inset-0 circuit-grid opacity-10 dark:opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen z-0"></div>
      
      <Button 
          variant="ghost" 
          className="absolute top-8 left-8 z-50 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          onClick={() => router.push('/')}
          leftIcon={<span className="material-symbols-outlined rtl-mirror">arrow_back</span>}
      >
          {t('nav.back')}
      </Button>

      <div className="w-full max-w-md relative z-10">
        <RecruiterLogin 
            onSwitchToSignup={() => router.push('/recruiter/signup')}
            onLoginSuccess={() => router.push('/recruiter/signup?mode=dashboard')} // Redirect to dashboard logic
        />
      </div>
    </div>
  );
}