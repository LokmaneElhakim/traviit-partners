
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-midnight transition-colors duration-300 border-t border-gray-100 dark:border-white/5">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-12 text-center">
          {t('faq.title')}
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-gray-50 dark:bg-white/5 rounded-2xl border transition-all duration-300 ${openIndex === index ? 'border-electric-blue shadow-md bg-white dark:bg-[#0F1623]' : 'border-gray-200 dark:border-white/10'}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-start flex justify-between items-center p-6 focus:outline-none"
              >
                <h3 className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-electric-blue' : 'text-gray-900 dark:text-white'}`}>
                  {faq.question}
                </h3>
                <span className={`material-symbols-outlined transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-electric-blue' : 'text-gray-400'}`}>
                  expand_more
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/5 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
