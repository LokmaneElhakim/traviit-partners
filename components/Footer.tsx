
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-midnight border-t border-gray-100 dark:border-white/5 pt-16 pb-12">
        {/* Deprecated Component - Use components/layout/Footer.tsx instead */}
        <div className="text-center text-red-500 font-bold">DEPRECATED COMPONENT</div>
    </footer>
  );
};

export default Footer;
