
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Button from './ui/Button';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white dark:bg-midnight relative">
        {/* Deprecated Component - Use components/home/ContactSection.tsx instead */}
        <div className="text-center text-red-500 font-bold">DEPRECATED COMPONENT</div>
    </section>
  );
};

export default ContactSection;
