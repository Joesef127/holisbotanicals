import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Is Menoset a hormone replacement therapy?',
    answer: 'No. Menoset is a non-hormonal herbal product, not hormone replacement therapy.',
    category: 'Product Nature',
  },
  {
    question: 'Who is Menoset for?',
    answer: 'Adult women seeking herbal support for menstrual irregularities, menstrual discomfort or symptoms associated with perimenopause and menopause.',
    category: 'Suitability',
  },
  {
    question: 'What symptoms does Menoset support?',
    answer: 'The product is positioned to support menstrual irregularities and discomfort, mood changes, hot flashes and other symptoms associated with the menstrual and menopause transition.',
    category: 'Benefits',
  },
  {
    question: 'How do I take Menoset?',
    answer: '1 tablet twice daily, following the directions on the product label.',
    category: 'Dosage',
  },
  {
    question: 'How many tablets are in a pack?',
    answer: '60 tablets, equivalent to a 30-day supply at the stated dosage.',
    category: 'Packaging',
  },
  {
    question: 'Can I take Menoset with other medicines?',
    answer: 'If you take prescription medicines, are pregnant or breastfeeding, or have an existing medical condition, speak with your doctor or pharmacist before use.',
    category: 'Safety',
  },
  {
    question: 'Is Menoset a medical treatment?',
    answer: "No. It is a herbal product intended to support women's wellness. It is not a substitute for diagnosis or medical treatment.",
    category: 'Compliance',
  },
];

export const MenosetFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-[#4e1939]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#4e1939] mb-4"
          >
            <HelpCircle className="h-3.5 w-3.5 text-[#9d3d65]" />
            <span>Clear Answers</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#3d132b] leading-tight"
          >
            Common Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#664b5b] leading-relaxed max-w-xl mx-auto"
          >
            Useful information, plainly put. Everything you need to know about Menoset's herbal
            formula, dosage, and usage.
          </motion.p>
        </div>

        {/* Expandable Accordions List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-[#9d3d65] bg-[#fffafc] shadow-md shadow-[#4e1939]/5'
                    : 'border-[#eedde5] bg-white hover:border-[#d77892]/50 hover:bg-[#fffdfd]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#9d3d65] uppercase tracking-wider hidden sm:inline-block">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#3d132b]">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#4e1939] text-[#f4cf80] rotate-180'
                        : 'bg-[#f4e6ec] text-[#4e1939]'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-7 border-t border-[#f4e6ec]/80">
                        <p className="text-sm sm:text-base text-[#614757] leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Have More Questions Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 rounded-3xl border border-[#eedde5] bg-[#faf4f2] p-8 text-center"
        >
          <h4 className="font-serif text-xl font-bold text-[#3d132b]">
            Have additional questions before ordering?
          </h4>
          <p className="mt-2 text-sm text-[#6f4f5f] max-w-md mx-auto">
            Our dedicated wellness advisors are available to answer queries regarding delivery,
            dosage guidance, and routine planning.
          </p>
          <div className="mt-5">
            <a
              href="https://wa.me/2348000000000?text=Hello,%20I%20have%20a%20question%20about%20Menoset"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#4e1939] px-6 py-3 text-xs sm:text-sm font-bold text-[#f4cf80] hover:bg-[#68234e] transition-colors shadow-sm"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat With A Care Representative</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default MenosetFAQSection;
