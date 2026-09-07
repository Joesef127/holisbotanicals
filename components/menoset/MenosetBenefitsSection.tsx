import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Smile, Flame, Shield, HeartHandshake, Sparkles } from 'lucide-react';

const MenosetBenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Flame className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      title: 'Hot Flash & Night Sweat Soothing',
      description:
        'Standardized Black Cohosh and Dong Quai directly help balance hypothalamic temperature control, curbing sudden facial heat surges and drenching nighttime sweats.',
    },
    {
      icon: <CalendarCheck className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
      title: 'Menstrual Cycle Regularity',
      description:
        'Vitex agnus-castus assists your pituitary-ovarian axis in stabilizing cycle rhythm, helping reduce the anxiety of erratic, surprise, or spaced-out periods.',
    },
    {
      icon: <Smile className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      title: 'Mood & Emotional Stability',
      description:
        'Supports neurotransmitter balance to gently ease sudden irritability, anxiety spikes, tearfulness, and the brain fog commonly linked with hormone fluctuations.',
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: '100% Non-Hormonal Support',
      description:
        'Does not contain synthetic estrogen, progesterone, or harsh chemical compounds. Operates safely via natural plant adaptogens and gentle phyto-compounds.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-rose-700 dark:text-rose-300" />,
      title: 'Menstrual Cramp & Pelvic Comfort',
      description:
        'Blue Cohosh and Dong Quai promote healthy uterine smooth muscle relaxation, relieving intense abdominal cramping and cyclical pelvic heaviness.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      title: 'Feminine Vitality & Libido',
      description:
        'Restores daily physical energy, nourishes tissue comfort, and supports intimacy drive, helping you feel revitalized and confident in your own skin.',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-card/40 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3 block">
            Targeted Physiological Care
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            How Menoset Restores Your Natural Balance
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            A synergistic multi-botanical matrix engineered to address the complete spectrum of feminine hormonal transitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-gray-50 dark:bg-card border border-gray-100 dark:border-gray-800 hover:border-rose-500/30 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenosetBenefitsSection;
