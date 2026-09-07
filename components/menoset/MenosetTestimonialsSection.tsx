import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { MENOSET_TESTIMONIALS } from '../../lib/constants';

const MenosetTestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-rose-500/5 dark:bg-rose-950/20 border-b border-rose-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3 block">
            Real Stories, Real Relief
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Hear From Women Who Restored Their Balance
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Verified feedback from Nigerian women who took charge of their hot flashes, cycles, and emotional vitality with Menoset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MENOSET_TESTIMONIALS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white dark:bg-card border border-rose-500/15 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-rose-300 dark:text-rose-800" />
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">
                    {review.name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {review.age ? `Age ${review.age}` : ''} {review.location ? `· ${review.location}` : ''}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Buyer</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenosetTestimonialsSection;
