import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ShieldCheck, Truck, Sparkles, ShoppingBag } from 'lucide-react';
import Button from '../Button';
import { MENOSET_PACKAGES } from '../../lib/constants';
import { useApp } from '../../context/AppContext';

const MenosetPricingSection: React.FC = () => {
  const { addToCart } = useApp();
  const navigate = useNavigate();
  const [selectedPkgId, setSelectedPkgId] = useState<string>('menoset-wellness');

  const handleOrder = (pkgId: string) => {
    addToCart(pkgId, 1);
    navigate('/summary');
  };

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-[#180914] text-[#33242d] dark:text-white border-b border-[#ead7df] dark:border-rose-950/40 relative overflow-hidden scroll-mt-16">
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
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Section 9 · Pricing &amp; Bundles</span>
            </div>

            {/* Headline from PDF Section 9 */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4e1939] dark:text-white tracking-tight leading-tight mb-4">
              CHOOSE YOUR MENOSET PLAN
            </h2>

            {/* Subheadline from PDF Section 9 */}
            <p className="text-base sm:text-lg text-[#624b57] dark:text-rose-100/80 leading-relaxed max-w-2xl mx-auto">
              Choose the pack that fits your routine and budget. Bundle pricing gives you more convenience and savings.
            </p>
          </motion.div>
        </div>

        {/* 4 Plans Modern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 items-stretch">
          {MENOSET_PACKAGES.map((pkg) => {
            const isSelected = selectedPkgId === pkg.id;
            const isPopular = pkg.badge === 'MOST POPULAR';
            const isBestValue = pkg.badge === 'BEST VALUE';

            return (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedPkgId(pkg.id)}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all cursor-pointer ${
                  isPopular
                    ? 'bg-[#fffaf7] dark:bg-[#200b1a] border-2 border-[#9d3d65] shadow-2xl shadow-rose-950/15 ring-4 ring-[#9d3d65]/10'
                    : isSelected
                    ? 'bg-[#fffaf7] dark:bg-[#1e0a19] border-2 border-[#9d3d65] shadow-xl'
                    : 'bg-white dark:bg-[#180914] border border-[#ead7df] dark:border-rose-950/60 shadow-md hover:border-[#d77892]'
                }`}
              >
                {/* Badge if available */}
                {pkg.badge && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-md ${
                      isPopular
                        ? 'bg-[#9d3d65]'
                        : 'bg-gradient-to-r from-amber-600 to-[#9d3d65]'
                    }`}
                  >
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="pb-5 border-b border-[#f0e2e8] dark:border-rose-950/40 mb-5">
                    <span className="text-[11px] font-bold tracking-widest text-[#9d3d65] dark:text-[#ffd98e] uppercase block mb-1">
                      {pkg.containers === 1 ? 'Single Pack' : `${pkg.containers} Packs Bundle`}
                    </span>
                    <h3 className="text-xl font-black text-[#4e1939] dark:text-white">
                      {pkg.name.replace('Menoset ', '')}
                    </h3>
                    <p className="text-xs text-[#7c6371] dark:text-rose-200/70 mt-1">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-[#4e1939] dark:text-white">
                        ₦{pkg.price.toLocaleString()}
                      </span>
                    </div>

                    {pkg.savingsText ? (
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                          {pkg.savingsText}
                        </span>
                        {pkg.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₦{pkg.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 block mt-1">Standard Unit Price</span>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 text-xs text-[#624b57] dark:text-rose-100/80 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{pkg.containers * 60} Tablets ({pkg.containers * 30} Days Supply)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Free delivery in Lagos State</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Pay on delivery option available</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>100% Sealed &amp; Authentic NAFDAC product</span>
                    </li>
                  </ul>
                </div>

                {/* Order Button */}
                <div className="mt-auto pt-4 border-t border-[#f0e2e8] dark:border-rose-950/40">
                  <Button
                    fullWidth
                    size="md"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrder(pkg.id);
                    }}
                    className={`gap-2 font-bold text-xs shadow-md transition-all ${
                      isPopular
                        ? 'bg-[#9d3d65] hover:bg-[#832e52] text-white'
                        : 'bg-[#4e1939] hover:bg-[#6d274e] text-white'
                    }`}
                  >
                    <span>SELECT THIS PACK</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Supporting Copy from PDF Section 9 */}
        <p className="text-center text-xs text-[#7c6371] dark:text-rose-200/70 max-w-3xl mx-auto mb-10 italic">
          Bundles are designed for convenience and savings. They should not be interpreted as a medical recommendation for a specific duration. Individual experiences may vary.
        </p>

        {/* Dispatch & Assurance Strip */}
        <div className="p-6 rounded-3xl bg-[#fffaf7] dark:bg-[#1e0a19] border border-[#ead7df] dark:border-rose-950/60 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center shadow-sm">
          <div className="flex items-center justify-center gap-3">
            <Truck className="w-5 h-5 text-[#9d3d65] shrink-0" />
            <div className="text-left">
              <h4 className="text-xs font-bold text-[#4e1939] dark:text-white">Fast Nationwide Dispatch</h4>
              <p className="text-[11px] text-[#7c6371] dark:text-rose-200/70">1–2 days Lagos · 3–5 days other states</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-left">
              <h4 className="text-xs font-bold text-[#4e1939] dark:text-white">Pay On Delivery</h4>
              <p className="text-[11px] text-[#7c6371] dark:text-rose-200/70">Cash or POS upon order arrival</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-left">
              <h4 className="text-xs font-bold text-[#4e1939] dark:text-white">Authentic Holis Standard</h4>
              <p className="text-[11px] text-[#7c6371] dark:text-rose-200/70">100% Genuine, sealed boxes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenosetPricingSection;
