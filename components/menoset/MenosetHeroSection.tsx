import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, Flower2, HeartHandshake } from 'lucide-react';
import { images } from '@/lib';
import { MENOSET_NAFDAC_REG_NO } from '../../lib/constants';

interface MenosetHeroSectionProps {
  onOrderClick?: () => void;
  onAssessmentClick?: () => void;
}

export const MenosetHeroSection: React.FC<MenosetHeroSectionProps> = ({
  onOrderClick,
  onAssessmentClick,
}) => {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Multi-depth parallax values
  const bgY = useTransform(scrollY, [0, 800], ['0%', '25%']);
  const packY = useTransform(scrollY, [0, 800], ['0%', '-12%']);
  const contentY = useTransform(scrollY, [0, 600], ['0%', '10%']);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0.15]);

  const handleOrderScroll = (e: React.MouseEvent) => {
    if (onOrderClick) {
      onOrderClick();
      return;
    }
    e.preventDefault();
    const el = document.getElementById('pricing');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAssessmentScroll = (e: React.MouseEvent) => {
    if (onAssessmentClick) {
      onAssessmentClick();
      return;
    }
    e.preventDefault();
    const el = document.getElementById('assessment');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#240a1b] via-[#38102a] to-[#200717] text-white pt-28 pb-20 lg:pt-32 lg:pb-28">
      {/* Parallax ambient background layers */}
      <motion.div
        style={{ y: reduceMotion ? 0 : bgY }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      >
        {/* Subtle luxury glow orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#d77892]/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] rounded-full bg-[#f4cf80]/15 blur-[140px]" />
        <div className="absolute -bottom-20 left-1/4 w-[600px] h-[400px] rounded-full bg-[#9d3d65]/25 blur-[130px]" />

        {/* Delicate golden geometric / botanical matrix */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(244, 207, 128, 0.4) 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Typography & CTAs */}
          <motion.div
            style={{ y: reduceMotion ? 0 : contentY, opacity: contentOpacity }}
            className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Verified NAFDAC & Botanical Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#f4cf80]/35 bg-white/10 px-4 py-1.5 backdrop-blur-md shadow-lg shadow-black/20 mb-6"
            >
              <img
                src={images.nafdac_approved_badge}
                alt="NAFDAC Approved"
                className="h-5 w-5 rounded-full object-cover bg-white p-0.5"
                loading="eager"
              />
              <span className="text-xs font-semibold tracking-wider text-[#f4cf80] uppercase">
                NAFDAC Registered · Reg. No. {MENOSET_NAFDAC_REG_NO}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]"
            >
              No More Dealing With{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ffd393] via-[#ffb4c5] to-[#f4cf80]">
                Hot Flashes.
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-transparent via-[#f4cf80]/60 to-transparent rounded-full" />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-xl sm:text-2xl font-light text-[#f9d7e3] tracking-wide"
            >
              Feel more comfortable. Feel more balanced. Feel like yourself again.
            </motion.p>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed font-normal"
            >
              Menoset is a herbal, non-hormonal formula designed to support women experiencing
              menstrual irregularities, menstrual discomfort and symptoms associated with perimenopause
              and menopause.
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a
                href="#pricing"
                onClick={handleOrderScroll}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#f4cf80] via-[#ffd68a] to-[#f4cf80] px-8 py-4 text-base font-bold text-[#350f27] shadow-xl shadow-[#f4cf80]/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#f4cf80]/30 active:scale-[0.98]"
              >
                <span>ORDER MENOSET NOW</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#assessment"
                onClick={handleAssessmentScroll}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-base font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-[#f4cf80] hover:bg-white/20 active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4 text-[#f4cf80] transition-transform duration-300 group-hover:rotate-12" />
                <span>Take The 60-Second Check</span>
                <span className="text-[#f4cf80] text-sm">↓</span>
              </a>
            </motion.div>

            {/* Micro Highlights Pill Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-white/75"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#f4cf80]" />
                <span>NAFDAC Reg. Verified</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1.5">
                <Flower2 className="h-4 w-4 text-[#f4cf80]" />
                <span>100% Herbal Blend</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="h-4 w-4 text-[#f4cf80]" />
                <span>Zero Synthetic Hormones</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Dynamic 3D Product Showcase with Floating Accents */}
          <motion.div
            style={{ y: reduceMotion ? 0 : packY }}
            className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0"
          >
            {/* Background Halo Glow */}
            <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-tr from-[#d77892]/35 via-[#f4cf80]/25 to-transparent blur-3xl" />
            
            {/* Ambient Circular Frame Accent */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/15 animate-[spin_60s_linear_infinite] pointer-events-none" />
            <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-[#f4cf80]/20 pointer-events-none" />

            {/* Main Floating Product Image */}
            <motion.div
              animate={reduceMotion ? {} : { y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px]"
            >
              <div className="relative group">
                <img
                  src={images.menoset}
                  alt="Menoset Herbal Tablets - Menopause & Menstrual Support"
                  className="w-full h-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Floating Pill Badge 1: Non-Hormonal */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -left-4 sm:-left-8 top-1/4 rounded-2xl border border-white/20 bg-[#290d1f]/85 p-3.5 backdrop-blur-xl shadow-xl hidden sm:flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d77892] to-[#9d3d65] text-white">
                  <Flower2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">100% Non-Hormonal</p>
                  <p className="text-[11px] text-[#f4cf80]">Safe Botanical Actives</p>
                </div>
              </motion.div>

              {/* Floating Pill Badge 2: 60 Tablets */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -right-4 sm:-right-8 bottom-1/4 rounded-2xl border border-white/20 bg-[#290d1f]/85 p-3.5 backdrop-blur-xl shadow-xl hidden sm:flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#f4cf80] to-[#d4a849] text-[#350f27]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">60 Tablets Supply</p>
                  <p className="text-[11px] text-white/70">1 Tablet Twice Daily</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Gentle Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 hover:text-[#f4cf80] transition-colors cursor-pointer hidden md:flex flex-col items-center gap-1"
        onClick={() => {
          document.getElementById('trust-bar')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[11px] uppercase tracking-widest text-white/50">Explore</span>
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </section>
  );
};

export default MenosetHeroSection;
