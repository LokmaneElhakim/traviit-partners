
"use client";

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from '../../../lib/router';
import RecruiterForm from '../../../components/auth/RecruiterForm';
import Button from '../../../components/ui/Button';
import { useLanguage } from '../../../context/LanguageContext';

const RecruiterSignupPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  
  const showDashboard = searchParams.get('mode') === 'dashboard';

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50 dark:bg-[#020408] overflow-hidden transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-gray-50 dark:from-transparent dark:via-[#0B1120]/80 dark:to-[#020408] z-0"></div>
      <div className="absolute inset-0 circuit-grid opacity-10 dark:opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen z-0"></div>
      
      {/* Hide back button if we are in dashboard mode to simulate full app feel */}
      {!showDashboard && (
        <Button 
            variant="ghost" 
            className="absolute top-8 left-8 z-50 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            onClick={() => router.push('/')}
            leftIcon={<span className="material-symbols-outlined rtl-mirror">arrow_back</span>}
        >
            {t('nav.back')}
        </Button>
      )}

      <div className="w-full max-w-7xl relative z-10 flex justify-center">
        <RecruiterForm 
            onLogout={() => router.push('/')} 
            initialDashboard={showDashboard}
        />
      </div>
    </div>
  );
};

export default function RecruiterSignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecruiterSignupPageContent />
    </Suspense>
  );
}