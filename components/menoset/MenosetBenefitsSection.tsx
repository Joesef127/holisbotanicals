import React from 'react';
import { motion } from 'framer-motion';
import { CalendarRange, HeartPulse, Flame, ShieldAlert, Sparkles, Heart } from 'lucide-react';

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
    icon: Sparkles,
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
    <section id="benefits" className="py-24 bg-[#fffaf8] relative overflow-hidden">
      {/* Decorative ambient blurred shapes */}
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-[#fdebf1] rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#fbf0e4] rounded-full blur-3xl opacity-60 pointer-events-none" />

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
            <span>Targeted Botanical Action</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#3d132b] leading-tight"
          >
            Support For The Changes You Feel
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#654958] leading-relaxed max-w-2xl mx-auto"
          >
            Formulated with synergistic botanical actives studied for their multi-system support
            across every stage of the female transition.
          </motion.p>
        </div>

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
                className="group relative rounded-3xl border border-[#eedde5] bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#9d3d65]/40 hover:shadow-xl hover:shadow-[#4e1939]/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fcf0f4] to-[#f8dfe7] text-[#9d3d65] group-hover:bg-[#4e1939] group-hover:text-[#f4cf80] transition-colors duration-300 shadow-sm">
                      <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="rounded-full bg-[#faf1f5] px-3 py-1 text-[11px] font-bold text-[#8d325a] uppercase tracking-wider">
                      {benefit.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#3d132b] group-hover:text-[#4e1939] transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#664b5a] leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#f4e8ee] flex items-center text-xs font-semibold text-[#9d3d65]">
                  <span>Proven Botanical Support</span>
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
