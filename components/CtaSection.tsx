
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from './ui/Button';

interface CtaProps {
  onAuthClick?: () => void;
}

const CtaSection: React.FC<CtaProps> = ({ onAuthClick }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gray-50 dark:bg-black py-32">
        {/* Deprecated Component - Use components/home/CtaSection.tsx instead */}
        <div className="text-center text-red-500 font-bold">DEPRECATED COMPONENT</div>
    </section>
  );
};

export default CtaSection;
