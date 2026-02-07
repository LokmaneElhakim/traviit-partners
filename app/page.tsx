
"use client";

import React from 'react';
import { RouterProvider, usePathname, useRouter } from '../lib/router';
import { LanguageProvider } from '../context/LanguageContext';

// Import Pages (which act as Route Handlers)
import LandingPage from './(marketing)/page';
import LoginCandidatePage from './(auth)/login/page';
import SignupCandidatePage from './(auth)/signup/page';
import LoginRecruiterPage from './(recruiter)/login/page';
import SignupRecruiterPage from './(recruiter)/signup/page';

const AppRoutes = () => {
  const pathname = usePathname();
  const { replace } = useRouter();

  // Normalize path: remove trailing slash if present (except for root)
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;

  // Simple Route Matching Logic
  if (normalizedPath === '/') return <LandingPage />;
  if (normalizedPath === '/auth/login') return <LoginCandidatePage />;
  if (normalizedPath === '/auth/signup') return <SignupCandidatePage />;
  if (normalizedPath === '/recruiter/login') return <LoginRecruiterPage />;
  if (normalizedPath === '/recruiter/signup') return <SignupRecruiterPage />;

  // Redirects for better UX
  if (normalizedPath === '/auth') {
    replace('/auth/login');
    return null;
  }
  if (normalizedPath === '/recruiter') {
    replace('/recruiter/login');
    return null;
  }

  // 404 Fallback
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black text-gray-900 dark:text-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black mb-4 text-gray-200 dark:text-gray-800">404</h1>
        <h2 className="text-2xl font-bold mb-2">Page not found</h2>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist or has been moved.
          <br/>
          <span className="text-xs font-mono mt-2 block opacity-50">Current Path: {pathname}</span>
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => window.history.back()} 
            className="px-6 py-2 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors font-medium"
          >
            Go Back
          </button>
          <a 
            href="/"
            onClick={(e) => { e.preventDefault(); replace('/'); }}
            className="px-6 py-2 rounded-xl bg-electric-blue text-white hover:bg-blue-600 transition-colors font-medium shadow-lg shadow-blue-500/20"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </RouterProvider>
  );
}
