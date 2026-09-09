import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ShieldCheck, Truck, CreditCard, MoreVertical, Pencil, Trash2, PlusCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import { usePackages } from '../../hooks/usePackages';
import { API_BASE } from '../../lib/constants';
import { ProductPackage } from '../../types';
import FadeIn from '../ui/FadeIn';
import { SectionHeader } from '../prostanone/shared';
import PackageEditModal from '../prostanone/PackageEditModal';

export const MenosetPricingSection: React.FC = () => {
  const { addToCart } = useApp();
  const navigate = useNavigate();
  const { isAdmin, token } = useAuth();
  const { showConfirm } = useModal();
  const { packages, refetch } = usePackages('menoset');
  const [editingPkg, setEditingPkg] = useState<ProductPackage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    if (!openMenuId) return;
    const closeMenu = () => setOpenMenuId(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [openMenuId]);

  const handleSelectPackage = (packageId: string) => {
    addToCart(packageId, 1);
    navigate('/summary');
  };

  const openEdit = (pkg: ProductPackage) => {
    setEditingPkg(pkg);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingPkg(null);
    setModalOpen(true);
  };

  const handleDelete = async (pkg: ProductPackage) => {
    setOpenMenuId(null);
    const confirmed = await showConfirm({
      title: 'Delete Package',
      message: `Delete "${pkg.name}"? This cannot be undone.`,
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      destructive: true,
    });
    if (!confirmed) return;
    await fetch(`${API_BASE}/api/packages/${pkg.id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    refetch();
  };

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-tertiary rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-tertiary rounded-full blur-3xl opacity-60" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <SectionHeader
            eyebrow="Select Your Routine"
            title="Choose Your Menoset Plan"
            subtitle="Choose the pack that fits your routine and budget. Bundle pricing gives you more convenience and savings."
          />
        </FadeIn>

        {isAdmin && (
          <div className="flex justify-center items-center mt-6 mb-10">
            <button
              type="button"
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Add Package
            </button>
          </div>
        )}

        {/* 4-Column Modern Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-stretch">
          {packages.map((pkg, index) => {
            const isMostPopular = pkg.badge === 'MOST POPULAR';
            const isBestValue = pkg.badge === 'BEST VALUE';
            const daysCount = pkg.containers * 30;
            const tabletCount = pkg.containers * 60;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 ${isMostPopular
                  ? 'border-2 border-primary/30 bg-gradient-to-b from-surface to-surface shadow-xl shadow-primary/10 ring-1 ring-primary/20'
                  : isBestValue
                    ? 'border-2 border-accent/30 bg-gradient-to-b from-surface to-surface shadow-lg shadow-accent/10'
                    : 'border border-gray-100 bg-white shadow-sm hover:border-primary/40 hover:shadow-md'
                  }`}
              >
                {/* Admin Menu */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 z-20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === pkg.id ? null : pkg.id);
                      }}
                      className="p-1.5 rounded-full bg-white/90 hover:bg-white shadow text-gray-500 hover:text-gray-800 transition-colors border border-gray-100"
                      title="Package options"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openMenuId === pkg.id && (
                      <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-30">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEdit(pkg);
                            setOpenMenuId(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Pencil size={14} className="text-primary" /> Edit Package
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(pkg);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Top Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md ${isMostPopular
                        ? 'bg-gradient-to-r from-secondary to-primary'
                        : 'bg-gradient-to-r from-accent to-primary'
                        }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Pack Title & Supply */}
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-secondary">
                      {pkg.name.replace('Menoset ', '')}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-text-muted uppercase tracking-wider">
                      {pkg.containers} {pkg.containers === 1 ? 'Pack' : 'Packs'} · {daysCount} Days Supply
                    </p>
                  </div>

                  {/* Price Row */}
                  <div className="mt-5 pb-5 border-b border-gray-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-secondary">
                        ₦{pkg.price.toLocaleString()}
                      </span>
                      {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                        <span className="text-sm text-text-muted line-through">
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
                        <span className="text-xs text-text-muted">Standard Rate</span>
                      )}
                    </div>
                  </div>

                  {/* Specifications & Usage */}
                  <div className="mt-5 space-y-2.5 text-xs text-text-muted">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>{tabletCount} Total Herbal Tablets</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>1 tablet twice daily dosage</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>{pkg.deliveryText || 'Nationwide delivery available'}</span>
                    </div>

                    {pkg.usageNote && (
                      <div className="mt-4 rounded-xl bg-tertiary p-3 text-[11px] text-text-muted leading-relaxed border border-gray-100">
                        {pkg.usageNote}
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => handleSelectPackage(pkg.id)}
                    className={`group w-full flex items-center justify-center gap-2 rounded-full py-3.5 px-5 text-sm font-bold transition-all shadow-md active:scale-[0.98] ${isMostPopular
                      ? 'bg-gradient-to-r from-secondary to-primary text-white hover:bg-primary'
                      : isBestValue
                        ? 'bg-gradient-to-r from-secondary to-accent text-white hover:bg-primary'
                        : 'bg-secondary text-white hover:bg-primary'
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
          <p className="text-xs sm:text-sm text-shadow-text-muted leading-relaxed">
            Bundles are designed for convenience and savings. They should not be interpreted as a
            medical recommendation for a specific duration. Individual experiences may vary.
          </p>
        </div>

        {/* Trust Badges Footer Strip */}
        <div className="mt-6 border-t border-gray-100 pt-6 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs font-semibold text-primary">
          <span className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" /> Nationwide Delivery
          </span>
          <span className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" /> Card / Bank Transfer / Pay on Delivery
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" /> Verified NAFDAC Certified
          </span>
        </div>

        {modalOpen && (
          <PackageEditModal
            pkg={editingPkg}
            defaultProductId="menoset"
            onClose={() => setModalOpen(false)}
            onSaved={() => { refetch(); setModalOpen(false); }}
            onDeleted={() => { refetch(); setModalOpen(false); }}
          />
        )}
      </div>
    </section>
  );
};

export default MenosetPricingSection;
