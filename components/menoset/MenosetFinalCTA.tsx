import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageCircle, Heart, ShieldCheck, Check } from 'lucide-react';
import Button from '../Button';
import { MENOSET_NAFDAC_REG_NO } from '../../lib/constants';

const MenosetFinalCTA: React.FC = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-[#200515] via-[#380b24] to-[#1a0411] text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-rose-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-400/15 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-rose-200 text-xs font-bold uppercase tracking-widest mb-6">
            <Heart className="w-3.5 h-3.5 text-[#ffd98e]" />
            <span>Support for Every Stage</span>
          </div>

          {/* Headline from PDF Section 13 */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15] mb-6">
            YOUR NEXT CHAPTER{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd98e] via-[#f7a8b8] to-[#ffd98e]">
              DESERVES SUPPORT.
            </span>
          </h2>

          {/* Body from PDF Section 13 */}
          <p className="text-xl sm:text-2xl text-rose-100 font-medium mb-4 max-w-2xl mx-auto">
            Your cycle may change. Your body may change. But you can still feel like you.
          </p>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Menoset provides herbal, non-hormonal support for women navigating menstrual irregularities, perimenopause and menopause.
          </p>

          {/* CTAs from PDF Section 13 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a href="#pricing" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2.5 text-base font-bold bg-gradient-to-r from-[#ffd98e] to-[#f3be6c] hover:from-white hover:to-white text-[#380b24]! border-none shadow-2xl shadow-amber-500/20 hover:scale-[1.02] transition-all duration-300"
              >
                <span>GET YOUR MENOSET PACK TODAY — FROM ₦15,000</span>
                <ArrowRight className="w-4 h-4 text-[#380b24]" />
              </Button>
            </a>

            <Link to="/menoset-check" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base font-semibold border-white/30 hover:border-white text-white hover:bg-white/10 backdrop-blur-md"
              >
                <span>Take the 60-Second Check</span>
              </Button>
            </Link>

            <a
              href="https://wa.me/2348155931140?text=Hello%2C%20I%20would%20like%20to%20order%20Menoset"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2 text-base font-semibold border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/15"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Order via WhatsApp</span>
              </Button>
            </a>
          </div>

          {/* Trust Line from PDF Section 13 */}
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-rose-200/90 mb-12">
            <span>60 Tablets</span>
            <span>•</span>
            <span>Herbal Product</span>
            <span>•</span>
            <span>Non-Hormonal</span>
            <span>•</span>
            <span>NAFDAC Registered: {MENOSET_NAFDAC_REG_NO}*</span>
          </div>

          {/* Section 15: Website Compliance & Legal Notice */}
          <div className="pt-8 border-t border-white/10 text-xs text-rose-200/70 max-w-3xl mx-auto space-y-3 text-left sm:text-center leading-relaxed font-light">
            <p>
              <strong className="text-white font-semibold">Regulatory Compliance Note: </strong>
              Menoset is a registered herbal product (NAFDAC Reg. No. {MENOSET_NAFDAC_REG_NO}). Distributed exclusively by Holis Botanical Gardens, Lagos, Nigeria.
            </p>
            <p>
              Menoset is a herbal product intended to support women's wellness. It is not a substitute for diagnosis or medical treatment. Read the product label and use as directed. If you are pregnant, breastfeeding, taking medication or have an existing medical condition, speak with a healthcare professional before use. Individual experiences may vary.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenosetFinalCTA;
