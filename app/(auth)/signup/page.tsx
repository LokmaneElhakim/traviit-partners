
"use client";

import React from 'react';
import { useRouter } from '../../../lib/router';
import CandidateWizard from '../../../components/auth/CandidateWizard';

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50 dark:bg-[#020408] overflow-hidden transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-gray-50 dark:from-transparent dark:via-[#0B1120]/80 dark:to-[#020408] z-0"></div>
      <div className="absolute inset-0 circuit-grid opacity-10 dark:opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen z-0"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-blue/10 dark:bg-electric-blue/15 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/4 z-0"></div>
      
      <div className="w-full max-w-7xl relative z-10 flex justify-center">
        <CandidateWizard 
            onLogout={() => router.push('/')} 
        />
      </div>
    </div>
  );
}