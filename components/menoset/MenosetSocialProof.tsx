import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { SectionHeader } from '../prostanone/shared';

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
    <section className="py-24 bg-tertiary relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <FadeIn>
            <SectionHeader
              eyebrow="Community Voice"
              title="Real Women. Real Experiences."
              subtitle="Everyday wellness, thoughtfully supported. Honest reflections from women who made Menoset part of their daily life."
            />
          </FadeIn>
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
              className="rounded-3xl border border-gray-100 bg-surface p-7 sm:p-8 shadow-sm hover:border-primary/35 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Stars & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-600 bg-green-50/10 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="h-3 w-3" /> Verified Buyer
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-text-muted leading-relaxed italic font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & City Footer */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-primary block text-sm">
                    {item.name}
                  </span>
                  <span className="text-text-muted font-medium">
                    {item.city}, Nigeria
                  </span>
                </div>
                {/* <span className="text-[11px] font-medium text-text bg-text/10 px-2.5 py-1 rounded-lg">
                  {item.duration}
                </span> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenosetSocialProof;
