import React from 'react';
import { motion } from 'framer-motion';
import { Flame, CalendarDays, MoonStar, HeartCrack, Sparkles, ArrowRight } from 'lucide-react';

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

  const handleOrderScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('pricing');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Storytelling Editorial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-12 lg:p-16 shadow-lg shadow-[#4e1939]/5"
        >
          <div className="grid gap-4 sm:gap-6 lg:gap-8 xl:gap-10 lg:grid-cols-2 items-start">

            {/* Headline column */}
            <div className='flex flex-col items-center lg:items-start'>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl max-w-xl xl:max-w-2xl font-bold tracking-tight text-center lg:text-left text-secondary leading-[1.15]">
                Your Body Is Changing.{' '}
                <span className="text-primary">You Don't Have To Simply Put Up With It.</span>
              </h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="my-4 sm:my-8"
              >
                <a
                  href="#pricing"
                  onClick={handleOrderScroll}
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#9d3d65] px-4 sm:px-6 py-2.5 text-sm sm:text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98]"
                >
                  <span>Order Menoset Now</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                </motion.div>
            </div>

            {/* Narrative text column */}
            <div className="space-y-4 text-sm sm:text-base xl:text-lg text-text-muted leading-relaxed font-normal">
              <p>
                One month your period is early. The next, it's late. You may feel more irritable
                than usual, experience menstrual discomfort, sleep less predictably or suddenly
                deal with hot flashes and night sweats.
              </p>
              <p>
                These changes can begin during perimenopause, years before menopause itself. Every
                woman's experience is different,   but you deserve support through the transition.
              </p>
              <p className="font-medium text-secondary/80 pt-2 border-t border-gray-200">
                Menoset was formulated to provide herbal support for women navigating menstrual
                changes, perimenopause and menopause.
              </p>
            </div>

          </div>
        </motion.div>

        {/* 4 Shift Cards */}
        {/* <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all hover:border-[#9d3d65]/50 hover:shadow-md"
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
        </div> */}

      </div>
    </section>
  );
};

export default MenosetProblemSection;
