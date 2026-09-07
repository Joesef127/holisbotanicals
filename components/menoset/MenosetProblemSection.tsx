import React from 'react';
import { motion } from 'framer-motion';
import { Flame, CalendarDays, MoonStar, HeartCrack, Sparkles } from 'lucide-react';

export const MenosetProblemSection: React.FC = () => {
  const shifts = [
    {
      icon: CalendarDays,
      title: 'Cycle Unpredictability',
      desc: 'One month early, the next late. Skipped cycles or sudden flow variations.',
    },
    {
      icon: Flame,
      title: 'Sudden Hot Flashes',
      desc: 'Intense warmth in the chest, neck, and face, followed by chilly sweats.',
    },
    {
      icon: MoonStar,
      title: 'Disrupted Night Rest',
      desc: 'Waking up overheated and restless, leaving you drained the following day.',
    },
    {
      icon: HeartCrack,
      title: 'Emotional & Physical Tension',
      desc: 'Unexplained mood fluctuations, heightened irritability, and pelvic discomfort.',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Soft background petal accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#faebf0] blur-3xl opacity-70" />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#fdf2e9] blur-3xl opacity-60" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Storytelling Editorial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-[#eedde5] bg-gradient-to-br from-[#fdf7f9] via-white to-[#fff8f5] p-8 sm:p-12 lg:p-16 shadow-lg shadow-[#4e1939]/5"
        >
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            
            {/* Headline column */}
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#9d3d65]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#9d3d65] mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                The Physical & Emotional Reality
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#3d132b] leading-[1.15]">
                Your Body Is Changing.{' '}
                <span className="text-[#9d3d65]">You Don't Have To Simply Put Up With It.</span>
              </h2>
            </div>

            {/* Narrative text column */}
            <div className="lg:col-span-6 space-y-4 text-base sm:text-lg text-[#624857] leading-relaxed font-normal">
              <p>
                One month your period is early. The next, it's late. You may feel more irritable
                than usual, experience menstrual discomfort, sleep less predictably or suddenly
                deal with hot flashes and night sweats.
              </p>
              <p>
                These changes can begin during perimenopause, years before menopause itself. Every
                woman's experience is different — but you deserve support through the transition.
              </p>
              <p className="font-medium text-[#4e1939] pt-2 border-t border-[#ead7df]">
                Menoset was formulated to provide herbal support for women navigating menstrual
                changes, perimenopause and menopause.
              </p>
            </div>

          </div>
        </motion.div>

        {/* 4 Shift Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shifts.map((shift, idx) => {
            const Icon = shift.icon;
            return (
              <motion.div
                key={shift.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-[#ead7df] bg-white p-7 shadow-sm transition-all hover:border-[#9d3d65]/50 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fbeaf0] to-[#f8dfe7] text-[#9d3d65] group-hover:scale-105 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#3d132b]">
                  {shift.title}
                </h3>
                <p className="mt-2 text-sm text-[#725463] leading-relaxed">
                  {shift.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MenosetProblemSection;
