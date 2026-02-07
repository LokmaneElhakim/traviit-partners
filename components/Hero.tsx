
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from './ui/Button';

interface HeroProps {
  onAuthClick?: (mode?: 'login' | 'signup' | 'recruiter') => void;
}

const Hero: React.FC<HeroProps> = ({ onAuthClick }) => {
  const { t } = useLanguage();

  return (
    <header className="relative min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20 flex items-center overflow-hidden bg-gray-50 dark:bg-[#020408] transition-colors duration-300">
        {/* Deprecated Component - Use components/home/Hero.tsx instead */}
        <div className="absolute inset-0 flex items-center justify-center text-red-500 font-bold">
            DEPRECATED COMPONENT
        </div>
    </header>
  );
};

export default Hero;
