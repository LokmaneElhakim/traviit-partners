
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const DashboardPreview: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white dark:bg-deep-navy">
        {/* Deprecated Component - Use components/home/DashboardPreview.tsx instead */}
        <div className="text-center text-red-500 font-bold">DEPRECATED COMPONENT</div>
    </section>
  );
};

export default DashboardPreview;
