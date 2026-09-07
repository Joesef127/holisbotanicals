import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { MENOSET_FAQS } from '../../lib/constants';

const MenosetFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#fffaf7] dark:bg-[#150611] text-[#33242d] dark:text-white border-b border-[#ead7df] dark:border-rose-950/40 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Official PDF Section 12 Copy */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbeff1] dark:bg-rose-950/60 text-[#9d3d65] dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Section 12 · Common Questions</span>
            </div>

            {/* Headline from PDF Section 12 */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4e1939] dark:text-white tracking-tight leading-tight mb-4">
              USEFUL INFORMATION, PLAINLY PUT.
            </h2>

            <p className="text-base sm:text-lg text-[#624b57] dark:text-rose-100/80 leading-relaxed">
              Clear, transparent answers about Menoset’s botanical formula, dosage, safety, and suitability.
            </p>
          </motion.div>
        </div>

        {/* Expandable Accordions List */}
        <div className="space-y-4">
          {MENOSET_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentId = `menoset-faq-answer-${index}`;
            const headerId = `menoset-faq-header-${index}`;

            return (
              <div
                key={faq.question}
                className={`rounded-2xl sm:rounded-3xl border transition-all ${
                  isOpen
                    ? 'bg-white dark:bg-[#1e0a19] border-[#9d3d65] shadow-lg shadow-rose-950/5 ring-1 ring-[#9d3d65]/20'
                    : 'bg-white/80 dark:bg-[#180914] border-[#ead7df] dark:border-rose-950/60 hover:border-[#d77892]'
                }`}
              >
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9d3d65] rounded-2xl sm:rounded-3xl cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-[#4e1939] dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#9d3d65] text-white rotate-180'
                        : 'bg-[#fbeff1] dark:bg-rose-950/40 text-[#9d3d65] dark:text-rose-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
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
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-7 pt-1 text-sm sm:text-base text-[#624b57] dark:text-rose-100/85 leading-relaxed border-t border-[#f2e2e9] dark:border-rose-950/40">
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
