import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Sparkles, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MENOSET_PACKAGES } from '../../lib/constants';

export const MenosetPricingSection: React.FC = () => {
  const { addToCart } = useApp();
  const navigate = useNavigate();

  const handleSelectPackage = (packageId: string) => {
    addToCart(packageId, 1);
    navigate('/summary');
  };

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#fdedf3] rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#fff2e5] rounded-full blur-3xl opacity-60" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-[#4e1939]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#4e1939] mb-4"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#9d3d65]" />
            <span>Select Your Routine</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#3d132b] leading-tight"
          >
            Choose Your Menoset Plan
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#664b5b] leading-relaxed max-w-2xl mx-auto"
          >
            Choose the pack that fits your routine and budget. Bundle pricing gives you more
            convenience and savings.
          </motion.p>
        </div>

        {/* 4-Column Modern Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {MENOSET_PACKAGES.map((pkg, index) => {
            const isMostPopular = pkg.badge === 'MOST POPULAR';
            const isBestValue = pkg.badge === 'BEST VALUE';
            const daysCount = pkg.containers * 30;
            const tabletCount = pkg.containers * 60;
            const perDayCost = Math.round(pkg.price / daysCount);

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 ${isMostPopular
                    ? 'border-2 border-[#9d3d65] bg-gradient-to-b from-[#fff7fa] to-white shadow-xl shadow-[#4e1939]/10 ring-1 ring-[#9d3d65]/20'
                    : isBestValue
                      ? 'border-2 border-[#cfa352] bg-gradient-to-b from-[#fffbf4] to-white shadow-lg shadow-[#cfa352]/10'
                      : 'border border-[#ead7df] bg-white shadow-sm hover:border-[#9d3d65]/40 hover:shadow-md'
                  }`}
              >
                {/* Top Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md ${isMostPopular
                          ? 'bg-gradient-to-r from-[#4e1939] to-[#8c2e5a]'
                          : 'bg-gradient-to-r from-[#b3862b] to-[#d4af37]'
                        }`}
                    >
                      <Sparkles className="h-3 w-3" />
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Pack Title & Supply */}
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-[#3d132b]">
                      {pkg.name.replace('Menoset ', '')}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#8c315a] uppercase tracking-wider">
                      {pkg.containers} {pkg.containers === 1 ? 'Pack' : 'Packs'} · {daysCount} Days Supply
                    </p>
                  </div>

                  {/* Price Row */}
                  <div className="mt-5 pb-5 border-b border-[#eedde5]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#3d132b]">
                        ₦{pkg.price.toLocaleString()}
                      </span>
                      {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                        <span className="text-sm text-[#947887] line-through">
                          ₦{pkg.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      {pkg.savingsText ? (
                        <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                          {pkg.savingsText}
                        </span>
                      ) : (
                        <span className="text-xs text-[#8c6d7d]">Standard Rate</span>
                      )}
                      <span className="text-[11px] text-[#8c6d7d] font-medium">
                        ≈ ₦{perDayCost}/day
                      </span>
                    </div>
                  </div>

                  {/* Specifications & Usage */}
                  <div className="mt-5 space-y-2.5 text-xs text-[#634958]">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-rose-100 text-[#9d3d65] flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>{tabletCount} Total Herbal Tablets</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-rose-100 text-[#9d3d65] flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>1 tablet twice daily dosage</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-rose-100 text-[#9d3d65] flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>{pkg.deliveryText || 'Nationwide delivery available'}</span>
                    </div>

                    <div className="mt-4 rounded-xl bg-[#fff8fa] p-3 text-[11px] text-[#785366] leading-relaxed border border-[#f0dfe6]">
                      {pkg.usageNote}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => handleSelectPackage(pkg.id)}
                    className={`group w-full flex items-center justify-center gap-2 rounded-full py-3.5 px-5 text-sm font-bold transition-all shadow-md active:scale-[0.98] ${isMostPopular
                        ? 'bg-gradient-to-r from-[#4e1939] to-[#782356] text-white hover:bg-[#631e47]'
                        : isBestValue
                          ? 'bg-gradient-to-r from-[#b3862b] to-[#d4af37] text-white hover:opacity-95'
                          : 'bg-[#3d132b] text-white hover:bg-[#571c3e]'
                      }`}
                  >
                    <span>Select This Pack</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Supporting Copy from document */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-[#8c6b7d] leading-relaxed">
            Supporting Copy: Bundles are designed for convenience and savings. They should not be
            interpreted as a medical recommendation for a specific duration. Individual experiences may
            vary.
          </p>
        </div>

        {/* Trust Badges Footer Strip */}
        <div className="mt-10 border-t border-[#eedde5] pt-8 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs font-semibold text-[#664b5b]">
          <span className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-[#9d3d65]" /> Nationwide Delivery
          </span>
          <span className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-[#9d3d65]" /> Card / Bank Transfer / Pay on Delivery
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#9d3d65]" /> Verified NAFDAC Certified
          </span>
        </div>

      </div>
    </section>
  );
};

export default MenosetPricingSection;
