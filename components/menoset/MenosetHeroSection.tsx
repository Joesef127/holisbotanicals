import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Leaf, Sun, ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { images } from '@/lib';
import Button from '../Button';
import { MENOSET_NAFDAC_REG_NO } from '../../lib/constants';

const MenosetHeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const productY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[96vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#260719] via-[#3d0f2b] to-[#200515] text-white pt-28 pb-20 lg:pt-36 lg:pb-28"
    >
      {/* Dynamic Parallax Background Glows & Particles */}
      <motion.div
        style={reduceMotion ? {} : { y: glowY }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-rose-600/20 via-pink-700/10 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-amber-400/15 via-rose-500/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[700px] h-[400px] rounded-full bg-purple-900/20 blur-3xl" />
      </motion.div>

      {/* Subtle Luxury Pattern Overlay */}
      <motion.div
        style={{
          ...(reduceMotion ? {} : { y: bgY }),
          backgroundImage: 'radial-gradient(#f4cf80 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
        }}
        className="absolute inset-0 pointer-events-none opacity-[0.14] z-0"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Copy */}
          <motion.div
            style={reduceMotion ? {} : { y: textY, opacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Trust Certification Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-rose-200 text-xs font-bold uppercase tracking-widest mb-6 shadow-inner"
            >
              <img
                src={images.nafdac_approved_badge}
                alt="NAFDAC Approved"
                className="w-4 h-4 rounded-full object-cover bg-white p-0.5"
                loading="lazy"
              />
              <span className="text-[#fce5b2]">NAFDAC Reg. No. {MENOSET_NAFDAC_REG_NO}</span>
              <span className="text-white/40">•</span>
              <span className="text-rose-200 flex items-center gap-1">
                <Leaf className="w-3 h-3 text-[#fce5b2]" /> 100% Herbal
              </span>
            </motion.div>

            {/* Headline from PDF Section 1 */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] mb-6"
            >
              NO MORE DEALING WITH{' '}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#ffd98e] via-[#f7a8b8] to-[#ffd98e] drop-shadow-sm">
                HOT FLASHES.
              </span>
            </motion.h1>

            {/* Subheadline from PDF Section 1 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-xl sm:text-2xl text-rose-100 font-medium tracking-tight mb-4"
            >
              Feel more comfortable. Feel more balanced. Feel like yourself again.
            </motion.p>

            {/* Body from PDF Section 1 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 font-light"
            >
              Menoset is a herbal, non-hormonal formula designed to support women experiencing menstrual irregularities, menstrual discomfort and symptoms associated with perimenopause and menopause.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <a href="#pricing" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2.5 text-base font-bold bg-gradient-to-r from-[#ffd98e] to-[#f3be6c] hover:from-white hover:to-white text-[#380b24]! border-none shadow-xl shadow-amber-500/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>ORDER MENOSET NOW</span>
                  <ArrowRight className="w-5 h-5 text-[#380b24]" />
                </Button>
              </a>
              <Link to="/menoset-check" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2 text-base font-semibold border-white/30 hover:border-white text-white hover:bg-white/10 backdrop-blur-md transition-all duration-300"
                >
                  <span>Take 60-Second Check</span>
                  <Sparkles className="w-4 h-4 text-[#ffd98e]" />
                </Button>
              </Link>
            </motion.div>

            {/* Trust Strip from PDF Section 1 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-xs sm:text-sm font-semibold text-rose-100/90"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>NAFDAC Registered*</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Herbal Product</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Non-Hormonal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>60 Tablets</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual: Premium Pack with Floating Glass Badges */}
          <motion.div
            style={reduceMotion ? {} : { y: productY }}
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Ambient Radial Spotlight */}
            <div className="absolute inset-0 -m-10 rounded-full bg-gradient-to-tr from-rose-500/30 via-pink-600/20 to-amber-400/25 blur-3xl pointer-events-none" />

            {/* Showcase Stage Frame */}
            <div className="relative w-full max-w-md mx-auto p-4 sm:p-6 rounded-[2.5rem] bg-gradient-to-b from-white/15 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl shadow-black/50">
              
              {/* Product Pack Image */}
              <motion.div
                whileHover={reduceMotion ? {} : { scale: 1.03, rotate: 0.5 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-black/40 via-transparent to-black/30 p-4"
              >
                <img
                  src={images.menoset}
                  alt="Menoset Botanical Supplement Package"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] mx-auto max-h-[420px]"
                  loading="eager"
                />
              </motion.div>

              {/* Floating Badge 1: Vasomotor Temperature Relief */}
              <motion.div
                animate={reduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-left-6 px-4 py-3 rounded-2xl bg-[#2b0a1d]/90 border border-rose-300/30 backdrop-blur-md shadow-xl flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-[#2b0a1d] shadow-md">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#fcd385]">Targeted Care</p>
                  <p className="text-xs font-extrabold text-white">Hot Flash Calm</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Hormone-Free Botanical Synergy */}
              <motion.div
                animate={reduceMotion ? {} : { y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -right-4 sm:-right-6 px-4 py-3 rounded-2xl bg-[#2b0a1d]/90 border border-rose-300/30 backdrop-blur-md shadow-xl flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-rose-300">Daily Balance</p>
                  <p className="text-xs font-extrabold text-white">Non-Hormonal Herbal</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 sm:mt-20 pt-10 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-[#ffd98e]">4</div>
            <div className="text-xs uppercase tracking-wider text-rose-200/80 mt-1 font-semibold">Synergistic Botanicals</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-[#ffd98e]">100%</div>
            <div className="text-xs uppercase tracking-wider text-rose-200/80 mt-1 font-semibold">Non-Hormonal</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-[#ffd98e]">60</div>
            <div className="text-xs uppercase tracking-wider text-rose-200/80 mt-1 font-semibold">Tablets Per Box (30 Days)</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-[#ffd98e]">0</div>
            <div className="text-xs uppercase tracking-wider text-rose-200/80 mt-1 font-semibold">Synthetic Hormones</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Nudge Indicator */}
      <motion.div
        animate={reduceMotion ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors z-20 cursor-pointer hidden md:flex flex-col items-center gap-1"
        onClick={() => {
          const next = document.getElementById('trust-bar');
          next?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold text-rose-200/60">Scroll to explore</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
};

export default MenosetHeroSection;
