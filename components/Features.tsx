
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Features: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 bg-white dark:bg-deep-navy relative overflow-hidden">
        {/* Deprecated Component - Use components/home/Features.tsx instead */}
        <div className="text-center text-red-500 font-bold">DEPRECATED COMPONENT</div>
    </section>
  );
};

export default Features;
