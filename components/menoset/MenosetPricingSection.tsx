import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, ShoppingCart, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import Button from '../Button';
import { MENOSET_PACKAGES } from '../../lib/constants';
import { useApp } from '../../context/AppContext';

const MenosetPricingSection: React.FC = () => {
  const { addToCart } = useApp();
  const navigate = useNavigate();
  const [selectedPkgId, setSelectedPkgId] = useState<string>('menoset-wellness');
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const handleAddToCart = (pkgId: string) => {
    addToCart(pkgId, 1);
    setAddedToast(pkgId);
    setTimeout(() => setAddedToast(null), 2500);
  };

  const handleBuyNow = (pkgId: string) => {
    addToCart(pkgId, 1);
    navigate('/checkout');
  };

  return (
    <section id="pricing" className="py-24 bg-rose-500/5 dark:bg-rose-950/20 border-b border-rose-500/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Manufacturer Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Choose Your Menoset Support Plan
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Select the consistency bundle that aligns with your wellness goals. Every order includes nationwide dispatch and discreet packaging.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {MENOSET_PACKAGES.map((pkg) => {
            const isFeatured = pkg.badge === 'MOST POPULAR';
            const isBestValue = pkg.badge === 'BEST VALUE';

            return (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedPkgId(pkg.id)}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all cursor-pointer ${
                  selectedPkgId === pkg.id
                    ? 'bg-white dark:bg-card border-2 border-rose-600 shadow-2xl ring-4 ring-rose-500/10'
                    : 'bg-white/80 dark:bg-card/80 border border-rose-500/15 shadow-md hover:border-rose-300'
                }`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="text-center pb-6 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                      {pkg.description}
                    </p>

                    <div className="flex items-baseline justify-center gap-1.5">
                      <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
                        ₦{pkg.price.toLocaleString()}
                      </span>
                    </div>

                    {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-xs text-gray-400 line-through">
                          ₦{pkg.originalPrice.toLocaleString()}
                        </span>
                        {pkg.savingsText && (
                          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                            {pkg.savingsText}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <ul className="py-6 space-y-3 text-xs text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span>{pkg.containers * 60} Total Herbal Tablets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span>{pkg.usageNote || 'Full non-hormonal botanical formula'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span>100% Discreet Packaging</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span>Free Delivery in Lagos State</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyNow(pkg.id);
                    }}
                    fullWidth
                    size="md"
                    className="bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs"
                  >
                    <span>BUY NOW</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(pkg.id);
                    }}
                    fullWidth
                    size="sm"
                    className="text-xs border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                    <span>{addedToast === pkg.id ? 'Added to Cart ✓' : 'Add to Cart'}</span>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Delivery & Assurance Strip */}
        <div className="p-6 rounded-3xl bg-white dark:bg-card border border-rose-500/15 shadow-sm max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <Truck className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
            <div className="text-left">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">Fast Nationwide Dispatch</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">1–2 days Lagos · 3–5 days other states</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
            <div className="text-left">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">Multiple Payment Methods</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Bank Transfer, Card or Pay on Delivery</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
            <div className="text-left">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">Authentic Holis Guarantee</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">100% Genuine, sealed bottles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenosetPricingSection;
