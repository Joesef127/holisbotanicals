import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, HeartHandshake, CalendarCheck2 } from 'lucide-react';
import { MENOSET_NAFDAC_REG_NO } from '../../lib/constants';

export const MenosetTrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'NAFDAC Registered*',
      detail: `Reg. No. ${MENOSET_NAFDAC_REG_NO}`,
    },
    {
      icon: Leaf,
      title: 'Herbal Product',
      detail: 'Pure botanical composition',
    },
    {
      icon: HeartHandshake,
      title: 'Non-Hormonal',
      detail: 'Gentle, natural body support',
    },
    {
      icon: CalendarCheck2,
      title: '60 Tablets',
      detail: 'Full 30-day daily supply',
    },
  ];

  return (
    <section id="trust-bar" className="relative z-20 border-y border-[#ead7df]/60 bg-gradient-to-r from-[#fff9f6] via-white to-[#fff9f6] py-6 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 p-2 rounded-2xl transition-colors hover:bg-rose-50/40"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4e1939] to-[#7a245a] text-[#f4cf80] shadow-md shadow-[#4e1939]/15 group-hover:scale-105 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight text-[#4e1939] sm:text-base">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-[#7d5e6e] font-medium">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MenosetTrustBar;
