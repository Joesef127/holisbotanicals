import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, SunMedium, Pill, Award } from 'lucide-react';

const MenosetWhySection: React.FC = () => {
  const points = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      title: 'Truly Non-Hormonal & Gentle',
      description:
        'Zero synthetic estrogen or progesterone. It works through natural plant phyto-compounds, eliminating the harsh risks associated with synthetic HRT.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      title: '4-Herb Synergy Formula',
      description:
        'Combines Black Cohosh, Dong Quai, Vitex, and Blue Cohosh in exact proportions for complete physical, temperature, and emotional coverage.',
    },
    {
      icon: <SunMedium className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      title: 'Tailored for Modern Women',
      description:
        'Crafted specifically to handle the demands of work, family life, and hot tropical climates where hot flashes can feel especially debilitating.',
    },
    {
      icon: <Pill className="w-6 h-6 text-primary" />,
      title: 'Convenient Standardized Tablets',
      description:
        'No messy concoctions, boiling bitter roots, or inconsistent dosages. Just two easy-to-swallow tablets daily with guaranteed potency.',
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      title: 'Trusted Holis Standard',
      description:
        'Distributed by Holis Botanical Gardens with certified GMP production, NAFDAC regulatory compliance, and nationwide customer support.',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-card/40 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3 block">
            Why Women Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            5 Reasons Why Menoset Stands Apart
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            A thoughtful, science-backed approach to female hormone transitions and comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-3xl bg-gray-50 dark:bg-card border border-rose-500/10 hover:border-rose-500/30 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-5">
                  {point.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenosetWhySection;
