import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Phone, ShieldCheck, Heart } from 'lucide-react';
import Button from '../Button';
import { MENOSET_NAFDAC_REG_NO } from '../../lib/constants';

const MenosetFinalCTA: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-rose-900 via-rose-950 to-secondary text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-rose-500 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-rose-200 text-xs font-semibold uppercase tracking-wider mb-6">
            <Heart className="w-3.5 h-3.5 text-rose-300" />
            <span>Restore Your Comfort &amp; Vitality</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 text-white leading-tight">
            Stop Enduring Hot Flashes &amp; Discomfort.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-amber-300">
              Start Your Menoset Routine Today.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-rose-100/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join hundreds of Nigerian women who have regained uninterrupted sleep, temperature control, and monthly cycle comfort naturally.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="#pricing" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base font-bold bg-white text-rose-950 hover:bg-rose-50 border-none shadow-2xl">
                <span>ORDER MENOSET NOW</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a
              href="https://wa.me/2348155931140?text=Hello%2C%20I%20would%20like%20to%20order%20Menoset"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base border-white/30 text-white hover:bg-white/10">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Order via WhatsApp</span>
              </Button>
            </a>
          </div>

          {/* Compliance & Regulatory Notice */}
          <div className="pt-8 border-t border-white/10 text-xs text-rose-200/70 max-w-3xl mx-auto space-y-2">
            <p>
              <strong>Regulatory Notice:</strong> Menoset is a registered herbal dietary supplement (NAFDAC Reg. No.: {MENOSET_NAFDAC_REG_NO}). Manufactured under strict cGMP standards and distributed by Holis Botanical Gardens, Lagos State, Nigeria.
            </p>
            <p>
              This product is not intended to diagnose, treat, cure, or prevent any medical condition. Content on this page is for informational guidance only. Always consult your qualified healthcare practitioner regarding persistent symptoms.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenosetFinalCTA;
