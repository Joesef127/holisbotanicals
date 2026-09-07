import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Moon, Calendar, HeartCrack, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MenosetProblemSection: React.FC = () => {
  const symptomCards = [
    {
      icon: <Calendar className="w-6 h-6 text-[#9d3d65]" />,
      title: 'Erratic Cycle Timing',
      description: 'One month your period is unexpectedly early. The next, it is noticeably late or arrives with unusual heaviness and cramping.',
    },
    {
      icon: <Flame className="w-6 h-6 text-amber-600" />,
      title: 'Sudden Hot Flashes',
      description: 'Intense rushes of heat across your face and chest during busy workdays, meetings, or tropical commutes that feel difficult to manage.',
    },
    {
      icon: <Moon className="w-6 h-6 text-indigo-600" />,
      title: 'Night Sweats & Broken Sleep',
      description: 'Waking up repeatedly drenched, tossing off blankets, and feeling exhausted before the new day has even started.',
    },
    {
      icon: <HeartCrack className="w-6 h-6 text-rose-600" />,
      title: 'Hormonal Mood Shifts',
      description: 'Feeling unusually irritable, emotionally drained, or foggy as fluctuating hormones impact your daily nervous system balance.',
    },
  ];

  return (
    <section className="py-24 bg-[#fffaf7] dark:bg-[#150611] text-[#33242d] dark:text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Official PDF Copy */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f6e5ed] dark:bg-rose-950/60 text-[#9d3d65] dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>A Transition You Don't Have to Face Alone</span>
            </div>

            {/* Headline from PDF Section 3 */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4e1939] dark:text-white tracking-tight leading-tight mb-6">
              YOUR BODY IS CHANGING.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9d3d65] to-[#d47892]">
                YOU DON'T HAVE TO SIMPLY PUT UP WITH IT.
              </span>
            </h2>

            {/* Body paragraph 1 from PDF Section 3 */}
            <p className="text-base sm:text-lg text-[#624b57] dark:text-rose-100/85 leading-relaxed mb-4">
              One month your period is early. The next, it's late. You may feel more irritable than usual, experience menstrual discomfort, sleep less predictably or suddenly deal with hot flashes and night sweats.
            </p>

            {/* Body paragraph 2 & 3 from PDF Section 3 */}
            <p className="text-sm sm:text-base text-[#7c6371] dark:text-rose-200/70 leading-relaxed max-w-2xl mx-auto">
              These changes can begin during perimenopause, years before menopause itself. Every woman's experience is different — but you deserve support through the transition. Menoset was formulated to provide herbal support for women navigating menstrual changes, perimenopause and menopause.
            </p>
          </motion.div>
        </div>

        {/* 4 Empathy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {symptomCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-7 rounded-3xl bg-white dark:bg-[#1e0a19] border border-[#ead7df] dark:border-rose-950/60 shadow-lg shadow-rose-950/5 hover:border-[#d77892] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#fbeff1] dark:bg-rose-950/40 flex items-center justify-center mb-5">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-[#4e1939] dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-[#624b57] dark:text-rose-200/75 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-r from-[#4e1939] via-[#64254a] to-[#4e1939] text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-[#ffd98e]">
              A natural, non-hormonal path to feeling like yourself again.
            </h3>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              You do not have to accept exhaustion and sudden heat surges as an unavoidable everyday burden. Menoset brings 4 time-tested botanicals into one convenient daily ritual.
            </p>
          </div>

          <Link to="/menoset-check" className="shrink-0 w-full md:w-auto">
            <button className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-[#ffd98e] hover:bg-white text-[#380b24] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md">
              <span>Take the 60-Second Check</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MenosetProblemSection;
