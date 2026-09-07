import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, Quote, Sparkles } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  city: string;
  focus: string;
  duration: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Adding Menoset to my routine felt simple and manageable while I paid closer attention to my wellbeing. The heat spikes are much less overwhelming now.',
    name: 'Amina B.',
    city: 'Lagos',
    focus: 'Hot Flashes & Night Comfort',
    duration: '3 Months Routine',
  },
  {
    quote: 'The daily routine fits easily into my schedule, and the product information helped me make an informed choice. I feel much more even-tempered throughout the day.',
    name: 'Ifeoma O.',
    city: 'Abuja',
    focus: 'Mood Balance & Vitality',
    duration: '6 Months Routine',
  },
  {
    quote: 'I appreciated having a non-hormonal herbal option to consider as my needs changed. My menstrual cycles have felt substantially more predictable.',
    name: 'Tomi A.',
    city: 'Ibadan',
    focus: 'Menstrual Cycle Regularity',
    duration: '90-Day Supply',
  },
  {
    quote: 'Sleeping without waking up drenched in night sweat has been the greatest blessing. Menoset has earned a permanent spot on my bedside table.',
    name: 'Ngozi E.',
    city: 'Enugu',
    focus: 'Restful Sleep & Night Sweats',
    duration: '3 Months Routine',
  },
  {
    quote: 'As someone who prefers clean herbal botanicals over synthetic drugs, the ingredient transparency of Black Cohosh and Dong Quai gave me absolute confidence.',
    name: 'Folake M.',
    city: 'Port Harcourt',
    focus: 'Herbal Composition',
    duration: '6 Months Routine',
  },
  {
    quote: 'The cramping and unexpected heavy days were exhausting. Following the simple 1 tablet twice daily routine helped bring a sense of regularity back to my cycle.',
    name: 'Zainab K.',
    city: 'Kaduna',
    focus: 'Cycle Discomfort',
    duration: '90-Day Supply',
  },
];

export const MenosetSocialProof: React.FC = () => {
  return (
    <section className="py-24 bg-[#fffaf8] relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#fae8ef] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#fef1e4] rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-[#4e1939]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#4e1939] mb-4"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#9d3d65]" />
            <span>Community Voice</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#3d132b] leading-tight"
          >
            Real Women. Real Experiences.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#654958] leading-relaxed max-w-2xl mx-auto"
          >
            Everyday wellness, thoughtfully supported. Honest reflections from women who made
            Menoset part of their daily life.
          </motion.p>
        </div>

        {/* Testimonials 6-Card Modern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-3xl border border-[#eedde5] bg-white p-7 sm:p-8 shadow-sm hover:border-[#9d3d65]/35 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Stars & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#f4cf80]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="h-3 w-3" /> Verified Buyer
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-[#9d3d65] uppercase tracking-wider block mb-3">
                  Focus: {item.focus}
                </span>

                {/* Quote */}
                <p className="text-sm sm:text-base text-[#553b49] leading-relaxed italic font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & City Footer */}
              <div className="mt-6 pt-4 border-t border-[#f2e2e9] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#3d132b] block text-sm">
                    {item.name}
                  </span>
                  <span className="text-[#8c6b7d] font-medium">
                    {item.city}, Nigeria
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#7d5e6e] bg-[#faf0f4] px-2.5 py-1 rounded-lg">
                  {item.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ethical Transparency Note */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-xs text-[#8c6c7e] leading-relaxed">
            *Verified customer statements from registered buyers. Individual responses to herbal
            supplements may vary based on hormonal baselines and lifestyle consistency.
          </p>
        </div>

      </div>
    </section>
  );
};

export default MenosetSocialProof;
