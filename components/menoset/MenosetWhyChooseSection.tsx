import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, HeartPulse, Sparkles, Clock2, CheckCircle, Flower2 } from 'lucide-react';
import { images } from '@/lib';
import { MENOSET_NAFDAC_REG_NO } from '../../lib/constants';
import FadeIn from '../ui/FadeIn';
import { SectionHeader } from '../prostanone/shared';

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
    icon: Flower2,
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
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="mx-auto max-w-3xl text-center mb-16">
          <FadeIn>
            <SectionHeader
              eyebrow="Menoset Standard"
              title="Why Women Choose Menoset"
              subtitle="Formulated for peace of mind, daily comfort, and natural botanical integrity."
            />
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">

          {/* Block 1: Visual Pack Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col justify-end p-5 sm:p-6 min-h-[190px] h-full group hover:border-[#9d3d65]/40 transition-all duration-300"
          >
            <img
              src={images.Menoset_multi}
              alt="Menoset multi packs bundle display"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="relative z-10 text-white">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#f4cf80]">
                Botanical Women's Wellness
              </p>
              <p className="text-base sm:text-lg font-bold leading-tight mt-1">
                One Formula. Multiple Stages.
              </p>
            </div>
          </motion.div>

          {/* Blocks 2 - 6: 5 Core Value Pillars */}
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.85,
                  delay: 0.15 + (idx + 1) * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm flex items-start gap-4 hover:border-[#9d3d65]/40 transition-all duration-300 h-full"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-primary text-accent shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-secondary">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-text-muted leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default MenosetWhyChooseSection;
