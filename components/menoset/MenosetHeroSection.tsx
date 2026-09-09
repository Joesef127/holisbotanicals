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
  const bgY = useTransform(scrollY, [0, 800], ['0%', '20%']);
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
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#1e0717] text-white pt-32 pb-24 lg:pt-36 lg:pb-32">

      <motion.div
        style={{ y: reduceMotion ? 0 : bgY }}
        className="absolute inset-0 -top-24 -bottom-24 z-0 pointer-events-none"
      >
        <motion.img
          src={images.menoset_model}
          alt="Menoset Herbal Tablets Display"
          className="w-full h-full object-cover object-center will-change-transform"
          loading="eager"
          initial={{ scale: 1 }}
          animate={
            reduceMotion
              ? { scale: 1 }
              : {
                  scale: [1, 1.05, 1],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      <div className="absolute inset-0 z-10 bg-linear-to-t from-black/70 via-black/80 to-black/55" />
      <div className="absolute inset-0 z-10 bg-linear-to-r from-secondary/0 via-transparent to-transparent" />

      <div
        className="absolute inset-0 opacity-15 pointer-events-none z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(244, 207, 128, 0.35) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Centered Content: Typography, CTAs & Badges on Top */}
      <div className="relative z-20 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          style={{ y: reduceMotion ? 0 : contentY, opacity: contentOpacity }}
          className="flex flex-col items-center text-center"
        >
          {/* NAFDAC pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <img src={images.nafdac_approved_badge} alt="NAFDAC" className="h-5 w-5 rounded-full object-cover bg-white p-0.5" loading="lazy" />
            <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-accent">
              NAFDAC Registered · Reg. No. {MENOSET_NAFDAC_REG_NO}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl xl:text-[80px] font-bold tracking-tight text-white leading-[1.1] max-w-3xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
          >
            No More Dealing With{' '}
            <span className="relative inline-block text-[#ffd393]">
              Hot Flashes.
              <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-transparent via-[#f4cf80]/70 to-transparent rounded-full" />
            </span>
          </motion.h1>

          {/* Subheadline */}
          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-xl sm:text-2xl font-light text-[#f9d7e3] tracking-wide max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          >
            Feel more comfortable. Feel more balanced. Feel like yourself again.
          </motion.p> */}

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-base sm:text-lg text-white/90 leading-relaxed font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
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
            className="mt-9 flex flex-col sm:flex-row gap-4 justify-center items-center w-auto"
          >
            <a
              href="#pricing"
              onClick={handleOrderScroll}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#f4cf80] via-[#ffd68a] to-[#f4cf80] px-4 sm:px-6 py-3 text-base font-bold text-[#350f27] shadow-xl shadow-[#f4cf80]/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#f4cf80]/30 active:scale-[0.98] w-full sm:w-auto"
            >
              <span>Order Menoset Now</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#assessment"
              onClick={handleAssessmentScroll}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-base font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-[#f4cf80] hover:bg-white/20 active:scale-[0.98] w-full sm:w-auto"
            >
              <span>Take a 60-Second Test</span>
              <span className="text-[#f4cf80] text-sm">↓</span>
            </a>
          </motion.div>

          {/* Key Benefits Pill Row */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-11 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/85"
          >
            <div className="flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 backdrop-blur-md shadow-md">
              <ShieldCheck className="h-4 w-4 text-[#f4cf80]" />
              <span>NAFDAC Reg. Verified</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 backdrop-blur-md shadow-md">
              <Flower2 className="h-4 w-4 text-[#f4cf80]" />
              <span>100% Herbal Actives</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 backdrop-blur-md shadow-md">
              <Sparkles className="h-4 w-4 text-[#f4cf80]" />
              <span>60 Tablets / 30-Day Supply</span>
            </div>
          </motion.div> */}
        </motion.div>
      </div>

      {/* Gentle Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 hover:text-[#f4cf80] transition-colors cursor-pointer hidden md:flex flex-col items-center gap-1 z-20"
        onClick={() => {
          document.getElementById('trust-bar')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[11px] uppercase tracking-widest text-white/60">Explore</span>
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </section>
  );
};

export default MenosetHeroSection;
