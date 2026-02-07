
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from './ui/Button';

const RecruiterLandingSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white dark:bg-deep-navy relative">
        {/* Deprecated Component - Use components/home/RecruiterLandingSection.tsx instead */}
        <div className="text-center text-red-500 font-bold">DEPRECATED COMPONENT</div>
    </section>
  );
};

export default RecruiterLandingSection;
