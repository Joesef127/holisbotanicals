import React from 'react';
import { motion } from 'framer-motion';
import { CalendarRange, HeartPulse, Flame, ShieldAlert, Flower2, Heart } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { SectionHeader } from '../prostanone/shared';

const BENEFITS = [
  {
    icon: CalendarRange,
    title: 'Menstrual Cycle Support',
    desc: 'Helps support menstrual regularity and comfort when cycles become unpredictable.',
    tag: 'Rhythm & Predictability',
  },
  {
    icon: HeartPulse,
    title: 'Mood & Emotional Support',
    desc: 'Supports wellbeing and emotional harmony during periods of hormonal fluctuation.',
    tag: 'Calm & Equilibrium',
  },
  {
    icon: Flame,
    title: 'Hot Flash Support',
    desc: 'Black Cohosh is traditionally used for menopausal symptom support, particularly hot flashes.',
    tag: 'Thermoregulation',
  },
  {
    icon: ShieldAlert,
    title: 'Non-Hormonal Support',
    desc: "A herbal, non-hormonal option for women's wellness during menstrual and menopause transitions.",
    tag: 'Safe & Clean',
  },
  {
    icon: Flower2,
    title: 'Menstrual Comfort',
    desc: 'Provides herbal support for menstrual discomfort, soothing pelvic aches and cramps.',
    tag: 'Daily Ease',
  },
  {
    icon: Heart,
    title: "Women's Wellness & Libido",
    desc: "Supports overall women's wellness, including sexual wellbeing during periods of change.",
    tag: 'Vitality & Intimacy',
  },
];

export const MenosetBenefitsSection: React.FC = () => {
  return (
    <section id="benefits" className="py-24 bg-tertiary relative overflow-hidden">
      {/* Decorative ambient blurred shapes */}
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-tertiary/30 rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-tertiary/30 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <SectionHeader
            eyebrow="Targeted Botanical Action"
            title="Support For The Changes You Feel"
            subtitle="Formulated with synergistic botanical actives studied for their multi-system support across every stage of the female transition."
          />
        </FadeIn>

        {/* Modern 6-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#9d3d65]/40 hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-tertiary group-hover:bg-secondary group-hover:text-[#f4cf80] transition-colors duration-300 shadow-sm">
                      <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="rounded-full bg-tertiary px-3 py-1 text-[11px] font-bold text-primary uppercase tracking-wider">
                      {benefit.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm text-text-muted leading-relaxed">
                    {benefit.desc}
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

export default MenosetBenefitsSection;
