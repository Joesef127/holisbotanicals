import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Award, HeartHandshake, Clock, Sparkles } from 'lucide-react';
import { MENOSET_NAFDAC_REG_NO } from '../../lib/constants';

const MenosetWhySection: React.FC = () => {
  const pillars = [
    {
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      title: 'HERBAL FORMULATION',
      description: "A combination of four botanicals traditionally used in women's wellness.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#9d3d65]" />,
      title: 'NON-HORMONAL',
      description: 'Formulated as a non-hormonal herbal product without synthetic steroids.',
    },
    {
      icon: <Award className="w-6 h-6 text-amber-600" />,
      title: 'NAFDAC REGISTERED',
      description: `Registered with the National Agency for Food and Drug Administration and Control (Reg. No. ${MENOSET_NAFDAC_REG_NO}).*`,
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-rose-600" />,
      title: "MADE FOR WOMEN'S CHANGING NEEDS",
      description: 'From menstrual irregularities to the transition through perimenopause and menopause.',
    },
    {
      icon: <Clock className="w-6 h-6 text-indigo-600" />,
      title: 'EASY DAILY ROUTINE',
      description: 'A simple daily regimen designed to fit seamlessly into everyday life.',
    },
  ];

  return (
    <section className="py-24 bg-[#fffaf7] dark:bg-[#150611] text-[#33242d] dark:text-white border-b border-[#ead7df] dark:border-rose-950/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Official PDF Section 10 Copy */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbeff1] dark:bg-rose-950/60 text-[#9d3d65] dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Section 10 · The Standard</span>
            </div>

            {/* Headline from PDF Section 10 */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4e1939] dark:text-white tracking-tight leading-tight mb-4">
              WHY WOMEN CHOOSE MENOSET
            </h2>

            <p className="text-base sm:text-lg text-[#624b57] dark:text-rose-100/80 leading-relaxed max-w-xl mx-auto">
              Rooted in botanical wisdom, verified by regulatory standards, and formulated for real everyday peace of mind.
            </p>
          </motion.div>
        </div>

        {/* 5 Pillars Modern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pillars.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl bg-white dark:bg-[#1e0a19] border border-[#ead7df] dark:border-rose-950/60 shadow-md hover:border-[#9d3d65] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#fffaf7] dark:bg-[#2a0e23] border border-[#ead7df] dark:border-rose-900/30 flex items-center justify-center mb-5 shadow-xs">
                  {item.icon}
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-[#4e1939] dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#624b57] dark:text-rose-200/80 leading-relaxed">
                  {item.description}
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
