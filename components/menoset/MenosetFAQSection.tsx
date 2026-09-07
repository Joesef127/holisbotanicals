import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { MENOSET_FAQS } from '../../lib/constants';

const MenosetFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white dark:bg-card/40 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Clear, transparent answers about Menoset&apos;s ingredients, safety, dosage, and results.
          </p>
        </div>

        <div className="space-y-4">
          {MENOSET_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentId = `menoset-faq-answer-${index}`;
            const headerId = `menoset-faq-header-${index}`;

            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/30 shadow-md'
                    : 'bg-white dark:bg-card border-gray-100 dark:border-gray-800 hover:border-rose-200'
                }`}
              >
                <button
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-2xl"
                >
                  <span className="font-bold text-base sm:text-lg text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-rose-500/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MenosetFAQSection;
