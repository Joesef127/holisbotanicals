import React, { useEffect, useState } from "react";
import { X, Save, Package, Trash2, Check, ArrowRight, Eye, Edit3, ShieldCheck } from "lucide-react";
import { ProductPackage } from "../../types";
import { usePackageForm } from "../../hooks/usePackageForm";
import Button from "../Button";

interface Props {
  pkg: ProductPackage | null; // null = create mode
  defaultProductId?: 'prostanone' | 'menoset';
  onClose: () => void;
  onSaved: (updated: ProductPackage) => void;
  onDeleted?: (id: string) => void;
}

// ── Primitives ────────────────────────────────────────────────────────────────

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-text text-xs sm:text-sm " +
  "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors " +
  "placeholder:text-text-muted";

const Field: React.FC<{
  id?: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}> = ({ id, label, hint, children }) => (
  <div>
    <label htmlFor={id} className="block text-[11px] font-semibold text-text uppercase tracking-wider mb-1.5">
      {label}
      {hint && (
        <span className="normal-case font-normal ml-1 opacity-60">
          ({hint})
        </span>
      )}
    </label>
    {children}
  </div>
);

const Section: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-2 pt-1">
    <span className="text-[10px] font-bold uppercase tracking-widest text-text/50 whitespace-nowrap">
      {label}
    </span>
    <div className="flex-1 h-px bg-border" />
  </div>
);

// ── Live Preview Card Component ───────────────────────────────────────────────

const LiveCardPreview: React.FC<{
  product: 'prostanone' | 'menoset';
  form: {
    name: string;
    containers: string;
    price: string;
    originalPrice: string;
    description: string;
    subtitle: string;
    savingsText: string;
    deliveryText: string;
    usageNote: string;
    badge: string;
    recommendedFor: string;
  };
}> = ({ product, form }) => {
  const containers = Math.max(1, parseInt(form.containers, 10) || 1);
  const priceNum = parseInt(form.price, 10) || 0;
  const originalPriceNum = form.originalPrice ? parseInt(form.originalPrice, 10) : undefined;
  const name = form.name.trim() || (product === 'menoset' ? 'Menoset Plan' : 'Prostanone Package');

  if (product === 'menoset') {
    const isMostPopular = form.badge?.toUpperCase() === 'MOST POPULAR';
    const isBestValue = form.badge?.toUpperCase() === 'BEST VALUE';
    const daysCount = containers * 30;
    const tabletCount = containers * 60;
    const displayName = name.replace(/^Menoset\s+/i, '');

    return (
      <div className="w-full max-w-sm mx-auto">
        <div
          className={`relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 bg-white border ${
            isMostPopular
              ? 'border-2 border-primary/40 shadow-xl ring-1 ring-primary/20'
              : isBestValue
              ? 'border-2 border-accent/40 shadow-lg'
              : 'border-gray-200 shadow-sm'
          }`}
        >
          {/* Top Badge */}
          {form.badge?.trim() && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md ${
                  isMostPopular
                    ? 'bg-gradient-to-r from-secondary to-primary'
                    : 'bg-gradient-to-r from-accent to-primary'
                }`}
              >
                {form.badge.trim()}
              </span>
            </div>
          )}

          <div>
            {/* Title & Supply */}
            <div className="pt-2">
              <h4 className="text-lg font-bold text-secondary">{displayName}</h4>
              <p className="mt-0.5 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                {containers} {containers === 1 ? 'Pack' : 'Packs'} · {daysCount} Days Supply
              </p>
            </div>

            {/* Price Row */}
            <div className="mt-4 pb-4 border-b border-gray-100">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-secondary">
                  ₦{priceNum.toLocaleString()}
                </span>
                {originalPriceNum && originalPriceNum > priceNum && (
                  <span className="text-xs text-text-muted line-through">
                    ₦{originalPriceNum.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="mt-1.5 flex items-center justify-between">
                {form.savingsText?.trim() ? (
                  <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    {form.savingsText.trim()}
                  </span>
                ) : (
                  <span className="text-[10px] text-text-muted">Standard Rate</span>
                )}
              </div>
            </div>

            {/* Specifications & Usage */}
            <div className="mt-4 space-y-2 text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Check className="h-2 w-2 stroke-[3]" />
                </div>
                <span>{tabletCount} Total Herbal Tablets</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Check className="h-2 w-2 stroke-[3]" />
                </div>
                <span>1 tablet twice daily dosage</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Check className="h-2 w-2 stroke-[3]" />
                </div>
                <span className="truncate">{form.deliveryText?.trim() || 'Nationwide delivery available'}</span>
              </div>

              {form.usageNote?.trim() && (
                <div className="mt-3 rounded-xl bg-tertiary p-2.5 text-[10px] text-text-muted leading-relaxed border border-gray-100">
                  {form.usageNote.trim()}
                </div>
              )}
            </div>
          </div>

          {/* CTA Preview */}
          <div className="mt-6">
            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center gap-1.5 rounded-full py-2.5 px-4 text-xs font-bold bg-secondary text-white shadow-sm opacity-90 cursor-default"
            >
              <span>Select This Pack</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Prostanone Preview Card
  const isBest = Boolean(form.badge?.trim());
  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        className={`relative flex flex-col rounded-3xl overflow-hidden border-2 shadow-sm bg-white transition-all duration-300 ${
          isBest ? 'border-primary' : 'border-gray-200'
        }`}
      >
        {isBest && (
          <div className="bg-primary text-white text-[10px] font-bold tracking-widest uppercase text-center py-1.5">
            {form.badge.trim()}
          </div>
        )}

        <div className="flex flex-col grow p-5">
          <h4 className="text-lg font-bold text-secondary mb-0.5">{name}</h4>
          <p className="text-text-muted text-xs mb-3">
            {form.description?.trim() || `${containers} Pack${containers > 1 ? 's' : ''} · ${containers * 20} Days Supply`}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-2xl font-bold text-primary">
              ₦{priceNum.toLocaleString()}
            </span>
            {originalPriceNum && originalPriceNum !== priceNum && (
              <span className="text-xs text-text-muted line-through">
                ₦{originalPriceNum.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {form.savingsText?.trim() && (
              <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                {form.savingsText.trim()}
              </span>
            )}
            <span className="inline-block bg-amber-50 text-amber-700 border border-amber-200 text-[10px] px-2 py-0.5 rounded-full font-medium">
              Pay on Delivery Available
            </span>
          </div>

          {/* Bullet Items */}
          <ul className="space-y-1.5 text-xs text-text-muted mb-4 grow">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{containers} Box{containers > 1 ? 'es' : ''} · {containers * 60} Tablets</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{form.deliveryText?.trim() || 'Free delivery within Lagos'}</span>
            </li>
            {form.usageNote?.trim() && (
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate">{form.usageNote.trim()}</span>
              </li>
            )}
          </ul>

          <Button
            size="sm"
            fullWidth
            variant={isBest ? 'primary' : 'outline'}
            className="pointer-events-none opacity-90 text-xs py-2"
          >
            Order Package
          </Button>
        </div>
      </div>
    </div>
  );
};

// ── Modal ─────────────────────────────────────────────────────────────────────

const PackageEditModal: React.FC<Props> = ({
  pkg,
  defaultProductId = 'prostanone',
  onClose,
  onSaved,
  onDeleted,
}) => {
  const { form, set, isEdit, saving, error, save } =
    usePackageForm({
      pkg,
      defaultProductId,
      onSaved,
      onDeleted,
      onClose,
    });

  // Mobile tab state: 'edit' or 'preview'
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isMenoset = defaultProductId === 'menoset';
  const productLabel = isMenoset ? 'Menoset' : 'Prostanone';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-2xl lg:max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col mt-22 max-h-[90vh] my-auto">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between px-4 sm:px-6 py-4 border-b border-border shrink-0 bg-white relative">
          <div className="flex flex-col sm:flex-row items-start sm:justify-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-bold text-text text-base leading-tight truncate">
                  {isEdit ? `Edit ${productLabel} Package` : `Add New ${productLabel} Package`}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary">
                  {productLabel}
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5 truncate">
                {isEdit ? pkg!.name : "Configure package details with live preview"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile / Tablet Tab Toggle */}
            <div className="lg:hidden flex items-center bg-gray-100 p-0.5 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMobileTab('edit')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  mobileTab === 'edit' ? 'bg-white text-primary shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" /> Form
              </button>
              <button
                type="button"
                onClick={() => setMobileTab('preview')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  mobileTab === 'preview' ? 'bg-white text-primary shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
            </div>

            <button
              onClick={onClose}
              className="absolute right-2 top-2 w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-white bg-background hover:bg-secondary transition-colors shrink-0 ml-1"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Main Content (Split on desktop, Tabbed on mobile) ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border">
            
            {/* Left Column: Form Fields */}
            <div className={`lg:col-span-7 p-6 space-y-4 ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              {/* Basic Info */}
              <Section label="Basic Information" />
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <Field id="pkg-name" label="Package Name">
                    <input
                      id="pkg-name"
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder={isMenoset ? "e.g. Essentials Pack" : "e.g. Starter Pack"}
                      className={inputClass}
                    />
                  </Field>
                </div>
                <div>
                  <Field
                    id="pkg-containers"
                    label={isMenoset ? "Packs" : "Boxes"}
                    hint={isMenoset ? "30d / pack" : "20d / box"}
                  >
                    <input
                      id="pkg-containers"
                      type="number"
                      value={form.containers}
                      onChange={set("containers")}
                      min={1}
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>

              <Field id="pkg-description" label="Description / Supply Note">
                <input
                  id="pkg-description"
                  type="text"
                  value={form.description}
                  onChange={set("description")}
                  placeholder={
                    isMenoset
                      ? "e.g. 3 Packs · 90 Days Supply"
                      : "e.g. 1 Pack · 20 Days Supply"
                  }
                  className={inputClass}
                />
              </Field>

              {/* Pricing */}
              <Section label="Pricing & Badges" />
              <div className="grid sm:grid-cols-2 gap-3">
                <Field id="pkg-price" label="Price (₦)">
                  <input
                    id="pkg-price"
                    type="number"
                    value={form.price}
                    onChange={set("price")}
                    placeholder="45000"
                    className={inputClass}
                  />
                </Field>
                <Field id="pkg-originalPrice" label="Original Price (₦)" hint="optional">
                  <input
                    id="pkg-originalPrice"
                    type="number"
                    value={form.originalPrice}
                    onChange={set("originalPrice")}
                    placeholder="51000"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field id="pkg-savingsText" label="Savings Text" hint='e.g. "Save ₦6,000"'>
                  <input
                    id="pkg-savingsText"
                    type="text"
                    value={`${(Number(form.originalPrice) - Number(form.price)).toLocaleString()}`}
                    onChange={set("savingsText")}
                    placeholder="Save ₦5,000"
                    className={inputClass}
                  />
                </Field>
                <Field id="pkg-badge" label="Top Badge" hint={isMenoset ? 'e.g. "MOST POPULAR"' : 'e.g. "RECOMMENDED"'}>
                  <input
                    id="pkg-badge"
                    type="text"
                    value={form.badge}
                    onChange={set("badge")}
                    placeholder={isMenoset ? "MOST POPULAR" : "RECOMMENDED"}
                    className={inputClass}
                  />
                </Field>
              </div>

              {/* Delivery & Usage */}
              <Section label="Delivery & Usage Details" />
              <Field id="pkg-deliveryText" label="Delivery Text">
                <input
                  id="pkg-deliveryText"
                  type="text"
                  value={form.deliveryText}
                  onChange={set("deliveryText")}
                  placeholder={
                    isMenoset
                      ? "Nationwide delivery available"
                      : "Free delivery within Lagos (except Badagry & Epe)"
                  }
                  className={inputClass}
                />
              </Field>

              <Field id="pkg-usageNote" label="Usage Note">
                <input
                  id="pkg-usageNote"
                  type="text"
                  value={form.usageNote}
                  onChange={set("usageNote")}
                  placeholder={
                    isMenoset
                      ? "1 tablet twice daily, following the product label."
                      : "For best results, use consistently for at least 2 months"
                  }
                  className={inputClass}
                />
              </Field>
            </div>

            {/* Right Column: Live Card Preview */}
            <div
              className={`lg:col-span-5 bg-surface/50 p-6 flex flex-col justify-center items-center ${
                mobileTab === 'edit' ? 'hidden lg:flex' : 'flex'
              }`}
            >
              <div className="w-full flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-primary" /> Live Card Preview
                </span>
              </div>

              <div className="w-full flex items-center justify-center py-2">
                <LiveCardPreview product={defaultProductId} form={form} />
              </div>

              <p className="text-[11px] text-text-muted text-center mt-3 max-w-xs">
                This preview updates in real-time as you fill the form and reflects exactly how the package will render on the {productLabel} page.
              </p>
            </div>

          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-background shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl border border-border text-text-muted text-sm font-medium hover:text-text hover:border-gray-400 transition-colors"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={save}
            disabled={saving}
            className="py-2.5 px-6 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Package"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageEditModal;
