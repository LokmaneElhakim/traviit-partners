
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Timeline: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gray-50 dark:bg-midnight">
        {/* Deprecated Component - Use components/home/Timeline.tsx instead */}
        <div className="text-center text-red-500 font-bold">DEPRECATED COMPONENT</div>
    </section>
  );
};

export default Timeline;
