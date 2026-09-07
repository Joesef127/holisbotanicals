import React from 'react';
import { ShieldCheck, Leaf, HeartPulse, CheckCircle2, Truck, CreditCard } from 'lucide-react';
import { images } from '@/lib';
import { MENOSET_NAFDAC_REG_NO } from '../../lib/constants';

const MenosetTrustBar: React.FC = () => {
  const trustPoints = [
    {
      icon: (
        <img
          src={images.nafdac_approved_badge}
          alt="NAFDAC Badge"
          className="w-5 h-5 rounded-full object-cover bg-white p-0.5"
          loading="lazy"
        />
      ),
      label: `NAFDAC Reg. No. ${MENOSET_NAFDAC_REG_NO}`,
      sub: 'Verified Regulatory Clearance',
    },
    {
      icon: <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      label: '100% Herbal Matrix',
      sub: 'Synergistic 4-Plant Botanical',
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
      label: 'Non-Hormonal Support',
      sub: 'Zero Synthetic Estrogens',
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-[#9d3d65]" />,
      label: '60 Tablets / Box',
      sub: 'Exact 30-Day Regimen',
    },
    {
      icon: <Truck className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      label: 'Fast Nationwide Shipping',
      sub: 'Free in Lagos (Standard)',
    },
    {
      icon: <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      label: 'Flexible Payment Options',
      sub: 'Card, Transfer or Delivery',
    },
  ];

  return (
    <section id="trust-bar" className="border-y border-[#ead7df] dark:border-rose-950/40 bg-white/95 dark:bg-[#180914] py-6 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-4">
          {trustPoints.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-2 rounded-2xl hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center shrink-0 shadow-xs">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                  {item.label}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenosetTrustBar;
