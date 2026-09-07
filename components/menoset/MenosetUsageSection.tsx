import React from 'react';
import { motion } from 'framer-motion';
import { Pill, Sun, Moon, Calendar, AlertCircle, ShieldCheck } from 'lucide-react';

const MenosetUsageSection: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-card/40 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3 block">
            Simple Daily Routine
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            How to Take Menoset
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Convenient, easy-to-swallow tablets crafted for seamless integration into your morning and evening wellness routines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Step 1: Morning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-gray-50 dark:bg-card border border-rose-500/15 shadow-sm flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
              <Sun className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
              Morning Dose
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              1 Tablet with Breakfast
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Take 1 tablet in the morning with a glass of water after your meal to provide sustained daytime temperature control and energy.
            </p>
          </motion.div>

          {/* Step 2: Evening */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-3xl bg-gray-50 dark:bg-card border border-rose-500/15 shadow-sm flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
              <Moon className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
              Evening Dose
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              1 Tablet with Dinner
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Take your second tablet with dinner to support overnight hypothalamic stability, preventing sudden drenching night sweats.
            </p>
          </motion.div>

          {/* Step 3: Consistency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-3xl bg-gray-50 dark:bg-card border border-rose-500/15 shadow-sm flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-6">
              <Calendar className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
              Consistency Runway
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              60 to 90 Days Recommended
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Botanical phytonutrients build cellular reserves over time. Continuous usage across 2 to 3 cycles yields optimal stability.
            </p>
          </motion.div>
        </div>

        {/* Safety Note */}
        <div className="p-6 rounded-3xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 max-w-3xl mx-auto flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
            <strong>Important Safety Guidance:</strong> Menoset is intended for adult women. If you are pregnant, nursing, taking prescription blood thinners, or undergoing medical therapy for hormone-sensitive conditions, please consult your healthcare physician prior to use.
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenosetUsageSection;
