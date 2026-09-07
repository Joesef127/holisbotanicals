import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, HeartPulse, Sparkles, Clock2, CheckCircle } from 'lucide-react';
import { images } from '@/lib';
import { MENOSET_NAFDAC_REG_NO } from '../../lib/constants';

const PILLARS = [
  {
    icon: Leaf,
    title: 'Herbal Formulation',
    desc: "A synergistic combination of four botanicals traditionally used and studied in women's wellness.",
  },
  {
    icon: HeartPulse,
    title: '100% Non-Hormonal',
    desc: 'Formulated as a non-hormonal herbal product that respects your body’s natural endocrine rhythm.',
  },
  {
    icon: ShieldCheck,
    title: 'NAFDAC Registered*',
    desc: `Fully certified and registered with the National Agency for Food and Drug Administration and Control (Reg. No. ${MENOSET_NAFDAC_REG_NO}).`,
  },
  {
    icon: Sparkles,
    title: "Made For Women's Changing Needs",
    desc: 'From menstrual cycle irregularities to the natural transition through perimenopause and menopause.',
  },
  {
    icon: Clock2,
    title: 'Easy Daily Routine',
    desc: 'A simple daily regimen of 1 tablet twice daily designed to fit effortlessly into everyday life.',
  },
];

export const MenosetWhyChooseSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#faf4f1] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-[#4e1939]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#4e1939] mb-4"
          >
            <CheckCircle className="h-3.5 w-3.5 text-[#9d3d65]" />
            <span>The Menoset Standard</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#3d132b] leading-tight"
          >
            Why Women Choose Menoset
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#684c5c] leading-relaxed max-w-2xl mx-auto"
          >
            Formulated for peace of mind, daily comfort, and natural botanical integrity.
          </motion.p>
        </div>

        {/* 5 Pillars Layout with Multi-Pack Showcase */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          
          {/* Left Column: Visual Pack Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#ead7df] shadow-2xl bg-white p-4">
              <img
                src={images.Menoset_multi}
                alt="Menoset multi packs bundle display"
                className="w-full h-auto rounded-2xl object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl flex items-end p-6">
                <div className="text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#f4cf80]">
                    Botanical Women's Wellness
                  </p>
                  <p className="text-lg font-serif font-bold">
                    One Formula. Multiple Stages.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 5 Core Value Pillars */}
          <div className="lg:col-span-7 space-y-4">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="rounded-2xl border border-[#eedde5] bg-white p-5 sm:p-6 shadow-sm flex items-start gap-4 hover:border-[#9d3d65]/40 transition-colors"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4e1939] to-[#782356] text-[#f4cf80] shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#3d132b]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#674b5b] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default MenosetWhyChooseSection;
