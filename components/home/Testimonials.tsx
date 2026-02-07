
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Testimonials: React.FC = () => {
  const { t, dir } = useLanguage();

  const testimonials = [
    {
      text: t('testimonials.1.text'),
      name: "Yassine Bouhlel",
      role: t('testimonials.1.role'),
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPjCI2eW_LPkH3Y8CigiQIvILVcx4Nxm2rOVrVokrEitAagmjFYYQ5FiM3AWjNLucRIxTcUkXdbDh2PUKsnAZpvFWgU1Gk6RJoUARaAumsjrBgcudG1EEckyHy4r1GwC3U8uJ6C8mDS-IPPSL6LcAXqKG6M-blY8Ce5-aefxNVUrlYl17AkrtQ5yalob74hwiy5XJQjLCbxLHWf5jU4ukGLMFhqolMSo6y4t8DHrh34T79_9a7Nrsl7pLlL3_gbZffHncl6_wFyfk"
    },
    {
      text: t('testimonials.2.text'),
      name: "Sarah Kaddour",
      role: t('testimonials.2.role'),
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuADGLb1-jROXYMw5dnu3JZpDUw-BiKZ6847hwdEHE6ymoZlAepbBahgGjIGdcjemOQgWmeOsUbQqMnKEaMXJSOxxRO__RdQ3Mut8V8hy0ZgRwtRZtZm3Ek0CwW-Z2rRK6OlsV1lC24xlxxqyQb4EXcCbLU3rHkqJnjGj4QYiQKIx9kQ2dRG3IiDoUOQ0jNngHQYYvFkvNgah3qvRopoYrtXGwVa_Xl5I4PbB1ePtvJXnau-JfKh1tFfEQ9OIA2IAZY09AHe8GETJNQ"
    },
    {
      text: t('testimonials.3.text'),
      name: "Ahmed Ziani",
      role: t('testimonials.3.role'),
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3gWtVPUs3cmrbFu23embKjvs1kjIvasxlv1A5HOgFw54yZbK56qKZWA_DpnG3UxIukYzFs2k0G5rI6mAXEDlP4M1oF-fKHoNmH6nbkNdRRVutXhPG5y-eNJHkQwxpN5y4znC2FWNBaBFpPja6zPXvIweo4TagrzEYylSbwT9jfiXR9PTohnE1UBEGTq31_IvEjImPr9MM3azPLGJRVfmQ3b9XxrOTPA7GdKn4FYK-EDOwxtOvBilbZ46PZ-hZE0X7tc0GJhOcKTw"
    },
    {
      text: t('testimonials.4.text'),
      name: "Mehdi Fekir",
      role: t('testimonials.4.role'),
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeKdNZQgxuzSBcZkuVFHUbcazDNkm5iopEAycUHKOLygZCGm-UvABTTYf3tXWCUavcvPSMxlSEwZbhrWE6cd9Y9BPuqQ_lunH1enP-y4oqLyssGGwZiwoPLMUA2aLgi_1hh6r6z5tHcT9uHZzQd8ZkSM0KZRLR0gjsARTj4N4whWU8F7DsIwIypn1MYbESO7ya9ZyMsiLP4HtmxOwx5RECPoHSQVVazp9C3nrfLIna4J0OGosTSvqKEsL16sSOrmu-SvDiYdQF1YY"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-midnight border-t border-gray-100 dark:border-white/5 overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {t('testimonials.title')}
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {t('testimonials.desc')}
        </p>
      </div>

      <div className="relative w-full marquee-container">
        {/* Scroll animation direction depends on LTR/RTL implicitly if using transformX */}
        <div 
          className={`flex w-max hover:[animation-play-state:paused] gap-6 ${dir === 'rtl' ? 'animate-scroll-right' : 'animate-scroll-left'}`}
        >
          {[...testimonials, ...testimonials].map((item, idx) => (
            <div
              key={idx}
              className="w-[380px] md:w-[420px] p-8 rounded-2xl bg-white dark:bg-[#0F1623] border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.04] hover:border-gray-300 dark:hover:border-white/10 transition-all duration-300 flex flex-col justify-between shrink-0 h-[240px] group shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="material-symbols-outlined text-gray-200 dark:text-white/20 text-3xl group-hover:text-electric-blue/40 transition-colors">
                  format_quote
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed mb-6 font-light line-clamp-3">
                {item.text}
              </p>
              
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                <img
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ring-2 ring-gray-100 dark:ring-white/10 group-hover:ring-electric-blue"
                  src={item.img}
                />
                <div>
                  <div className="text-gray-900 dark:text-white text-sm font-bold">{item.name}</div>
                  <div className="text-xs text-electric-blue font-medium">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
    