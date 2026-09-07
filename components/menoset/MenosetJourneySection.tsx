import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Sun, CheckCircle } from 'lucide-react';

const MenosetJourneySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'perimenopause' | 'menopause' | 'postmenopause'>('perimenopause');

  const stages = [
    {
      id: 'perimenopause',
      title: '1. Perimenopause',
      subtitle: 'The Hormonal Transition (Late 30s – 40s)',
      description:
        'Estrogen and progesterone production starts fluctuating unpredictably. You may experience cycle timing changes, unexpected heavy or light flows, sleep disruptions, and the first waves of sudden hot flashes.',
      symptoms: [
        'Irregular period cycles & heavy flow days',
        'Early hot flashes and sudden blushing',
        'Night sweats affecting sleep depth',
        'Mood fluctuations and heightened irritability',
      ],
      menosetRole:
        'Menoset provides herbal phytoestrogenic adaptogens that smooth out abrupt hormonal peaks and valleys without synthetic hormones.',
    },
    {
      id: 'menopause',
      title: '2. Menopause',
      subtitle: 'The Biological Milestone (Age 45 – 55)',
      description:
        'Clinically defined as 12 consecutive months without a menstrual period. This is often when vasomotor symptoms (hot flashes and night sweats) reach their peak intensity.',
      symptoms: [
        'Periods have completely ceased',
        'Frequent daytime hot flashes',
        'Intense night sweats & waking up drenched',
        'Vaginal dryness and reduced intimacy comfort',
      ],
      menosetRole:
        'Black Cohosh and Dong Quai directly help modulate hypothalamic temperature control and soothe night sweat frequency.',
    },
    {
      id: 'postmenopause',
      title: '3. Postmenopause',
      subtitle: 'Long-Term Harmony & Vitality',
      description:
        'The years following menopause. Hormone levels settle at a new baseline. While severe hot flashes subside, sustaining emotional calm, bone vitality, and energy remains paramount.',
      symptoms: [
        'Lower baseline estrogen levels',
        'Need for ongoing mood and bone support',
        'Occasional residual temperature warmth',
        'Maintaining daily vitality and skin hydration',
      ],
      menosetRole:
        'Provides continuous non-hormonal nourishment to keep your body balanced, energetic, and comfortable in your new chapter.',
    },
  ];

  const currentStage = stages.find((s) => s.id === activeTab)!;

  return (
    <section className="py-24 bg-rose-500/5 dark:bg-rose-950/20 border-b border-rose-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3 block">
            The Female Lifecycle
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Understanding the 3 Stages of Menopause
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Every woman’s experience is different. Wherever you are along your journey, Menoset provides customized botanical stability.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setActiveTab(stage.id as any)}
              className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                activeTab === stage.id
                  ? 'bg-rose-700 text-white shadow-lg shadow-rose-700/25'
                  : 'bg-white dark:bg-card text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-rose-300'
              }`}
            >
              {stage.title}
            </button>
          ))}
        </div>

        {/* Stage Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-white dark:bg-card border border-rose-500/20 p-8 sm:p-12 shadow-xl max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  {currentStage.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
                  {currentStage.title}
                </h3>
              </div>
              <div className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-700 dark:text-rose-300 font-semibold text-xs flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Lifecycle Phase</span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
              {currentStage.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                  Common Symptoms in this Phase:
                </h4>
                <ul className="space-y-3">
                  {currentStage.symptoms.map((sym) => (
                    <li key={sym} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                      <Sun className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 to-amber-500/10 border border-rose-500/20 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>How Menoset Supports You</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                  {currentStage.menosetRole}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenosetJourneySection;
