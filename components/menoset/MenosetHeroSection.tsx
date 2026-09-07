import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Heart, SunMedium } from 'lucide-react';
import Button from '../Button';
import { MENOSET_NAFDAC_REG_NO } from '../../lib/constants';

const MenosetHeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-rose-500/10 via-background to-background">
      {/* Ambient background blur circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-rose-500/15 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Women&apos;s Menstrual &amp; Menopause Botanical Formula</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.12] mb-6">
              NO MORE DEALING WITH{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600">
                HOT FLASHES.
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-200 font-medium mb-4">
              Feel more comfortable. Feel more balanced. Feel like yourself again.
            </p>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
              A 100% natural, non-hormonal herbal formulation combining Black Cohosh, Dong Quai, Vitex, and Blue Cohosh to support menstrual comfort, soothe sudden hot flashes, and restore emotional vitality.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a href="#pricing" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base shadow-lg shadow-rose-500/20 bg-rose-700 hover:bg-rose-800 border-none text-white font-bold">
                  <span>ORDER MENOSET NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link to="/menoset/quiz" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/30">
                  Take 60s Symptom Check
                </Button>
              </Link>
            </div>

            {/* Trust Badges Strip */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">NAFDAC Reg: {MENOSET_NAFDAC_REG_NO}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">100% Non-Hormonal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">60 Tablets (30 Days)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Free Lagos Delivery</span>
              </div>
            </div>
          </motion.div>

          {/* Product Showcase Visual Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl bg-white dark:bg-card border border-rose-500/20 shadow-2xl p-8 sm:p-10 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-500/20 to-transparent rounded-bl-full pointer-events-none" />

              {/* Graphical Bottle/Pack Placeholder */}
              <div className="relative mx-auto w-48 h-64 sm:w-56 sm:h-72 rounded-2xl bg-gradient-to-b from-rose-900 via-rose-800 to-rose-950 text-white shadow-2xl flex flex-col justify-between p-6 border-2 border-rose-300/30 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-rose-200">
                    HOLIS BOTANICALS
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>

                <div className="my-auto text-center">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-wider text-white">
                    MENOSET
                  </h3>
                  <div className="h-0.5 w-12 bg-amber-400 mx-auto my-2 rounded-full" />
                  <p className="text-[11px] uppercase tracking-wider text-rose-200 font-medium">
                    Women&apos;s Hormone Harmony &amp; Cycle Support
                  </p>
                </div>

                <div className="text-[10px] text-rose-300 flex items-center justify-between border-t border-rose-700/60 pt-2">
                  <span>60 Herbal Tablets</span>
                  <span>Non-Hormonal</span>
                </div>
              </div>

              {/* Highlights below product mockup */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-xl bg-rose-500/5 dark:bg-rose-950/30 border border-rose-500/15">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs mb-1">
                    <SunMedium className="w-3.5 h-3.5" />
                    <span>Hot Flash Calm</span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Rapid soothing of sudden temperature spikes
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-rose-500/5 dark:bg-rose-950/30 border border-rose-500/15">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs mb-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>Cycle Balance</span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Targeted relief from cramps &amp; mood swings
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MenosetHeroSection;
