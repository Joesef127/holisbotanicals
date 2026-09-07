import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Package, Calendar, AlertCircle, ShieldCheck } from 'lucide-react';

const MenosetUsageSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#fcf8fa] dark:bg-[#150611] text-[#33242d] dark:text-white border-b border-[#ead7df] dark:border-rose-950/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Official PDF Copy */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbeff1] dark:bg-rose-950/60 text-[#9d3d65] dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Section 8 · How to Use</span>
            </div>

            {/* Headline from PDF Section 8 */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4e1939] dark:text-white tracking-tight leading-tight mb-4">
              SIMPLE. DAILY. CONSISTENT.
            </h2>

            <p className="text-base sm:text-lg text-[#624b57] dark:text-rose-100/80 leading-relaxed max-w-xl mx-auto">
              A smooth twice-daily routine formulated to fit effortlessly into your everyday schedule without disruption.
            </p>
          </motion.div>
        </div>

        {/* 3 Step Usage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Morning Routine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-white dark:bg-[#1e0a19] border border-[#ead7df] dark:border-rose-950/60 shadow-lg flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 flex items-center justify-center mb-6 shadow-xs">
              <Sun className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#9d3d65] dark:text-[#ffd98e] mb-1">
              Morning Dose
            </span>
            <h3 className="text-xl font-bold text-[#4e1939] dark:text-white mb-2">
              1 Tablet with Water
            </h3>
            <p className="text-sm text-[#624b57] dark:text-rose-200/80 leading-relaxed">
              Take your first tablet in the morning after breakfast to provide sustained daytime temperature comfort and emotional poise.
            </p>
          </motion.div>

          {/* Evening Routine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-3xl bg-white dark:bg-[#1e0a19] border border-[#ead7df] dark:border-rose-950/60 shadow-lg flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 flex items-center justify-center mb-6 shadow-xs">
              <Moon className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#9d3d65] dark:text-[#ffd98e] mb-1">
              Evening Dose
            </span>
            <h3 className="text-xl font-bold text-[#4e1939] dark:text-white mb-2">
              1 Tablet with Dinner
            </h3>
            <p className="text-sm text-[#624b57] dark:text-rose-200/80 leading-relaxed">
              Take your second tablet with dinner to maintain overnight stability, supporting calm, restful sleep free from sudden night sweats.
            </p>
          </motion.div>

          {/* Pack Specifications from PDF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-3xl bg-white dark:bg-[#1e0a19] border border-[#ead7df] dark:border-rose-950/60 shadow-lg flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-[#9d3d65] flex items-center justify-center mb-6 shadow-xs">
              <Package className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#9d3d65] dark:text-[#ffd98e] mb-1">
              Standardized Pack Size
            </span>
            <h3 className="text-xl font-bold text-[#4e1939] dark:text-white mb-2">
              60 Tablets · 30 Days
            </h3>
            <p className="text-sm text-[#624b57] dark:text-rose-200/80 leading-relaxed">
              Each sealed box provides exactly 30 days of consistent botanical support at the recommended 2-tablet daily dosage.
            </p>
          </motion.div>
        </div>

        {/* Tip & Guidance from PDF Section 8 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-2xl bg-white dark:bg-[#1e0a19] border border-[#ead7df] dark:border-rose-950/60 max-w-3xl mx-auto flex items-start gap-4 shadow-sm"
        >
          <AlertCircle className="w-5 h-5 text-[#9d3d65] dark:text-[#ffd98e] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#624b57] dark:text-rose-100/90 leading-relaxed">
            <strong className="text-[#4e1939] dark:text-white font-bold">Usage Tip: </strong>
            Take consistently as directed. If you are pregnant, breastfeeding, taking medication or have an existing medical condition, speak with a healthcare professional before use.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenosetUsageSection;
