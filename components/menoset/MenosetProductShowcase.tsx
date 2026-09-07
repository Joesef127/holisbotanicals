import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, Sparkles, Pill, Heart, Leaf } from 'lucide-react';
import { images } from '@/lib';
import { MENOSET_NAFDAC_REG_NO } from '../../lib/constants';

const MenosetProductShowcase: React.FC = () => {
  const galleryImages = [
    { src: images.menoset, alt: 'Menoset Product Box Front View' },
    { src: images.menoset_display, alt: 'Menoset Official Pack Display' },
    { src: images.menoset_with_pill, alt: 'Menoset Tablets & Blister Pack Inspection' },
    { src: images.Menoset_multi, alt: 'Menoset Multi-Pack Routine Bundles' },
    { src: images.menoset_preview, alt: 'Menoset Pack Overview' },
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const productChecks = [
    '60 tablets per box, equivalent to a 30-day supply at stated dosage',
    'Dosage: 1 tablet twice daily, following directions on the product label',
    'Synergistic combination of 4 researched female botanicals',
    '100% non-hormonal, free from synthetic estrogens and progesterone',
    'Hermetically sealed blister packs ensuring ingredient potency and hygiene',
    `Registered with NAFDAC (Reg. No. ${MENOSET_NAFDAC_REG_NO})`,
    'Distributed exclusively by Holis Botanical Gardens',
  ];

  return (
    <section id="formula" className="py-24 bg-[#fffaf7] dark:bg-[#150611] text-[#33242d] dark:text-white border-b border-[#ead7df] dark:border-rose-950/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Official PDF Section 5 Copy */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbeff1] dark:bg-rose-950/60 text-[#9d3d65] dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Leaf className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Section 5 · What is Menoset?</span>
            </div>

            {/* Headline from PDF Section 5 */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4e1939] dark:text-white tracking-tight leading-tight mb-4">
              HERBAL SUPPORT DESIGNED FOR WOMEN
            </h2>

            {/* Tagline from PDF Section 5 */}
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#9d3d65] dark:text-[#ffd98e] mb-4">
              ONE FORMULA. MULTIPLE STAGES OF A WOMAN'S JOURNEY.
            </p>

            {/* Body from PDF Section 5 */}
            <p className="text-base sm:text-lg text-[#624b57] dark:text-rose-100/85 leading-relaxed">
              Menoset is a herbal composition combining Black Cohosh, Dong Quai, Vitex agnus-castus and Blue Cohosh — botanicals traditionally used and studied in different areas of women's menstrual and menopausal wellness.
            </p>
          </motion.div>
        </div>

        {/* Interactive 2-Column Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Gallery with Main Image & Thumbnails */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-white dark:bg-[#1e0a19] border border-[#ead7df] dark:border-rose-950/60 p-6 sm:p-8 shadow-xl">
              {/* Main Image Frame */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-rose-50/50 to-white dark:from-[#2a0e23] dark:to-[#1a0715] flex items-center justify-center p-6 mb-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={galleryImages[activeImageIndex].src}
                    alt={galleryImages[activeImageIndex].alt}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="max-h-full max-w-full object-contain drop-shadow-xl"
                  />
                </AnimatePresence>

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#4e1939]/80 backdrop-blur-sm text-white text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#ffd98e]" />
                  <span>Verified Authentic</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-5 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square rounded-xl p-1.5 transition-all cursor-pointer overflow-hidden border-2 ${
                      activeImageIndex === idx
                        ? 'border-[#9d3d65] shadow-md ring-2 ring-[#9d3d65]/20 bg-white dark:bg-[#2a0e23]'
                        : 'border-transparent bg-rose-50/60 dark:bg-rose-950/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Detailed Product Copy & Checklist */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#9d3d65] dark:text-[#ffd98e] block mb-2">
                Pure Botanical Composition
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#4e1939] dark:text-white leading-tight mb-4">
                Non-Hormonal Daily Support for Transitional Stages
              </h3>
              <p className="text-base text-[#624b57] dark:text-rose-100/80 leading-relaxed mb-6">
                Menoset is non-hormonal and designed to provide daily herbal support for women experiencing menstrual irregularities, menstrual discomfort and symptoms associated with perimenopause and menopause.
              </p>

              {/* Check items list */}
              <ul className="space-y-3.5 mb-8">
                {productChecks.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#4e1939] dark:text-rose-100/90 leading-snug">
                    <div className="w-5 h-5 rounded-full bg-[#fbeff1] dark:bg-rose-950/60 text-[#9d3d65] dark:text-[#ffd98e] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* NAFDAC Certificate Trust Box */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1e0a19] border border-[#ead7df] dark:border-rose-950/60 flex items-center gap-4 shadow-sm">
                <img
                  src={images.nafdac_approved_badge}
                  alt="NAFDAC Approved Badge"
                  className="w-14 h-14 rounded-full object-cover shrink-0 bg-white p-1 border border-emerald-500/30"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#4e1939] dark:text-white">
                    National Agency for Food and Drug Administration &amp; Control
                  </h4>
                  <p className="text-xs text-[#624b57] dark:text-rose-200/70 mt-0.5">
                    NAFDAC Reg. No. {MENOSET_NAFDAC_REG_NO} · Verified herbal product status ensuring consumer safety and regulatory manufacturing standards.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenosetProductShowcase;
