import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Flower2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { images } from '@/lib';
import { MENOSET_NAFDAC_REG_NO } from '../../lib/constants';

export const MenosetFinalCTA: React.FC = () => {
  const handleOrderScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-[#240a1c] via-[#3a0f2b] to-[#1c0615] text-white overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#f4cf80]/15 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full bg-[#d77892]/20 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* NAFDAC & Herbal Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2.5 rounded-full border border-[#f4cf80]/30 bg-white/10 px-5 py-2 backdrop-blur-md mb-8"
        >
          <img
            src={images.nafdac_approved_badge}
            alt="NAFDAC"
            className="h-5 w-5 rounded-full object-cover bg-white p-0.5"
          />
          <span className="text-xs font-semibold tracking-wider text-[#f4cf80] uppercase">
            Reg. No. {MENOSET_NAFDAC_REG_NO} · 100% Herbal
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
        >
          Your Next Chapter{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd393] via-[#ffb4c5] to-[#f4cf80]">
            Deserves Support.
          </span>
        </motion.h2>

        {/* Subhead & Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 text-lg sm:text-2xl font-light text-[#fbe1ea] tracking-wide max-w-2xl mx-auto"
        >
          Your cycle may change. Your body may change. But you can still feel like you.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto font-normal"
        >
          Menoset provides herbal, non-hormonal support for women navigating menstrual
          irregularities, perimenopause and menopause.
        </motion.p>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#pricing"
            onClick={handleOrderScroll}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#f4cf80] via-[#ffd68a] to-[#f4cf80] px-9 py-4 text-base font-bold text-[#350f27] shadow-xl shadow-[#f4cf80]/20 hover:scale-105 transition-all duration-300"
          >
            <span>GET YOUR MENOSET PACK TODAY — FROM ₦15,000</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>

          <Link
            to="/menoset-check"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-medium text-white backdrop-blur-md hover:bg-white/20 transition-all"
          >
            <Sparkles className="h-4 w-4 text-[#f4cf80]" />
            <span>Take The 60-Second Menoset Check</span>
          </Link>
        </motion.div>

        {/* Official Trust Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-12 pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold tracking-wide text-white/70"
        >
          <span>60 Tablets</span>
          <span className="text-[#f4cf80]">•</span>
          <span>Herbal Product</span>
          <span className="text-[#f4cf80]">•</span>
          <span>Non-Hormonal</span>
          <span className="text-[#f4cf80]">•</span>
          <span>NAFDAC Registered*</span>
        </motion.div>

      </div>
    </section>
  );
};

export default MenosetFinalCTA;
