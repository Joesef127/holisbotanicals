import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, MessageSquareHeart } from 'lucide-react';
import { MENOSET_TESTIMONIALS } from '../../lib/constants';

const MenosetTestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-[#180914] text-[#33242d] dark:text-white border-b border-[#ead7df] dark:border-rose-950/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Official PDF Section 11 Copy */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbeff1] dark:bg-rose-950/60 text-[#9d3d65] dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              <MessageSquareHeart className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Section 11 · Social Proof</span>
            </div>

            {/* Headline from PDF Section 11 */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4e1939] dark:text-white tracking-tight leading-tight mb-4">
              REAL WOMEN. REAL EXPERIENCES.
            </h2>

            <p className="text-base sm:text-lg text-[#624b57] dark:text-rose-100/80 leading-relaxed max-w-xl mx-auto">
              Verified statements from Nigerian women who incorporated Menoset’s botanical routine into their lives.
            </p>
          </motion.div>
        </div>

        {/* Clean Modern Feedback Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {MENOSET_TESTIMONIALS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-[#fffaf7] dark:bg-[#1e0a19] border border-[#ead7df] dark:border-rose-950/60 shadow-lg shadow-rose-950/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#9d3d65]/30 dark:text-rose-800" />
                </div>

                <p className="text-sm text-[#4e1939] dark:text-rose-100/90 leading-relaxed mb-6 font-medium italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#ead7df] dark:border-rose-950/40 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#4e1939] dark:text-white">
                    {review.name}
                  </h3>
                  <p className="text-xs text-[#7c6371] dark:text-rose-300/70">
                    {review.location ? review.location : 'Nigeria'} {review.age ? `· Age ${review.age}` : ''}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Buyer</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Microcopy disclaimer per PDF guidelines */}
        <p className="text-center text-xs text-[#7c6371] dark:text-rose-200/60 max-w-2xl mx-auto italic">
          Individual experiences and results may vary. Genuine customer feedback collected from verified buyers.
        </p>
      </div>
    </section>
  );
};

export default MenosetTestimonialsSection;
