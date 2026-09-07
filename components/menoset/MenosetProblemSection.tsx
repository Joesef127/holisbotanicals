import React from 'react';
import { motion } from 'framer-motion';
import { Flame, MoonStar, Activity, SmilePlus, Sparkles } from 'lucide-react';

const MenosetProblemSection: React.FC = () => {
  const problems = [
    {
      icon: <Flame className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      title: 'Sudden Hot Flashes in Public',
      description: 'Sudden, intense rushes of heat across your neck and face during important meetings, events, or hot commutes.',
    },
    {
      icon: <MoonStar className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      title: 'Drenching Night Sweats',
      description: 'Waking up repeatedly soaked in sweat, shivering, and unable to get uninterrupted restorative sleep.',
    },
    {
      icon: <Activity className="w-6 h-6 text-primary" />,
      title: 'Unpredictable Cycles & Cramps',
      description: 'Periods arriving too early, unexpectedly late, or with unusually intense pelvic discomfort and heaviness.',
    },
    {
      icon: <SmilePlus className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
      title: 'Unexplained Mood Shifts',
      description: 'Feeling quick to anger, overwhelmed by minor stress, or experiencing brain fog and emotional exhaustion.',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-card/40 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Understanding Your Changing Body</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Is Your Body Sending You Signals You Can’t Ignore?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            For women in their late 30s, 40s, and 50s, fluctuating hormone levels can make everyday life feel unpredictable. Your body isn’t broken — it simply needs targeted botanical nourishment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-gray-50 dark:bg-card border border-rose-500/10 dark:border-gray-800 flex flex-col hover:border-rose-500/30 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenosetProblemSection;
