import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ArrowRight, Sparkles, Check, Info } from 'lucide-react';
import { images } from '@/lib';

interface BotanicalInfo {
  id: string;
  name: string;
  latin: string;
  role: string;
  documentCopy: string;
  traditionalHeritage: string;
  activeCompounds: string[];
  keyBenefits: string[];
}

const BOTANICALS: BotanicalInfo[] = [
  {
    id: 'black-cohosh',
    name: 'Black Cohosh',
    latin: 'Actaea racemosa (Cimicifuga racemosa)',
    role: 'Hot Flash & Mood Stabilizer',
    documentCopy: 'Traditionally used for menopausal wellness, particularly hot flashes and mood-related symptoms.',
    traditionalHeritage: 'Indigenous North American herbal medicine revered for centuries as the premiere female tonic for thermoregulation and nervous calm.',
    activeCompounds: ['Triterpene Glycosides (Actein)', 'Isoferulic Acid', 'Flavonoid Glycosides'],
    keyBenefits: [
      'Soothes acute hot flashes & nighttime sweats',
      'Supports emotional equilibrium & restful mood',
      'Calms neurovascular temperature sensitivity',
    ],
  },
  {
    id: 'dong-quai',
    name: 'Dong Quai',
    latin: 'Angelica sinensis',
    role: "Women's Cycle & Blood Tonic",
    documentCopy: "Traditionally known as a women's botanical and used in herbal practices for menstrual and menopausal concerns.",
    traditionalHeritage: "Celebrated in Asian herbal traditions as 'Female Ginseng' to nourish pelvic vitality, support blood circulation, and ease monthly spasms.",
    activeCompounds: ['Ligustilide', 'Ferulic Acid', 'Polysaccharides'],
    keyBenefits: [
      'Supports smooth menstrual cycle predictability',
      'Eases pelvic tension and menstrual aches',
      'Nourishes systemic vitality and tissue hydration',
    ],
  },
  {
    id: 'vitex',
    name: 'Vitex agnus-castus',
    latin: 'Chaste Tree Berry',
    role: 'Hormonal Axis Harmonizer',
    documentCopy: 'Traditionally used to support menstrual-cycle wellness and PMS-related concerns, including mood changes and breast tenderness.',
    traditionalHeritage: 'Documented since ancient Mediterranean botanical medicine for modulating luteal rhythm and relieving cyclical breast tightness.',
    activeCompounds: ['Agnuside', 'Aucubin', 'Casticin & Diterpenes'],
    keyBenefits: [
      'Promotes balance between estrogen & progesterone',
      'Relieves cyclic breast tenderness & swelling',
      'Calms premenstrual irritability and tension',
    ],
  },
  {
    id: 'blue-cohosh',
    name: 'Blue Cohosh',
    latin: 'Caulophyllum thalictroides',
    role: 'Uterine Comfort & Flow Balance',
    documentCopy: "A botanical traditionally associated with women's menstrual wellness.",
    traditionalHeritage: 'Valued in traditional herbalism for its antispasmodic properties that relax pelvic muscles and restore predictable flow harmony.',
    activeCompounds: ['Caulosaponin', 'Anagyrine', 'Baptifoline'],
    keyBenefits: [
      'Eases deep menstrual cramping and pelvic fullness',
      'Encourages healthy muscular comfort during cycles',
      'Complements Black Cohosh for multi-stage support',
    ],
  },
];

export const MenosetFormulaSection: React.FC = () => {
  const [activeHerbId, setActiveHerbId] = useState<string>('black-cohosh');
  const activeHerb = BOTANICALS.find((b) => b.id === activeHerbId) ?? BOTANICALS[0];

  const handleOrderScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="formula" className="py-24 bg-gradient-to-b from-[#25091c] via-[#350f28] to-[#25091c] text-white relative overflow-hidden">
      {/* Background botanical atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#f4cf80]/20 blur-[130px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#d77892]/25 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#f4cf80]/30 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#f4cf80] mb-4"
          >
            <Leaf className="h-3.5 w-3.5 text-[#f4cf80]" />
            <span>Herbal Support Designed For Women</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            What's Inside Every Tablet?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-3 text-lg sm:text-xl font-medium tracking-wide text-[#f4cf80] uppercase"
          >
            Four Botanicals. One Women's Wellness Formula.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto"
          >
            Menoset is a herbal composition combining Black Cohosh, Dong Quai, Vitex agnus-castus
            and Blue Cohosh — botanicals traditionally used and studied in different areas of women's
            menstrual and menopausal wellness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mt-5 inline-block rounded-full bg-white/10 px-5 py-1.5 text-xs font-bold tracking-widest uppercase text-[#f9d7e3]"
          >
            Tagline: One Formula. Multiple Stages Of A Woman's Journey.
          </motion.div>
        </div>

        {/* Interactive Botanical Herbarium Showcase */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Left: 4 Interactive Botanical Selector Cards */}
          <div className="lg:col-span-6 space-y-3.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#f4cf80] mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Tap each botanical to explore its profile:
            </p>

            {BOTANICALS.map((botanical) => {
              const isActive = botanical.id === activeHerbId;
              return (
                <button
                  key={botanical.id}
                  type="button"
                  onClick={() => setActiveHerbId(botanical.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    isActive
                      ? 'border-[#f4cf80] bg-white/15 backdrop-blur-md shadow-lg shadow-black/20 translate-x-1.5'
                      : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                  }`}
                >
                  <div
                    className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#f4cf80] text-[#350f27]'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    <Leaf className="h-5 w-5" />
                  </div>

                  <div className="grow">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {botanical.name}
                      </h3>
                      <span className="text-[11px] font-bold text-[#f4cf80] uppercase tracking-wider">
                        {botanical.role}
                      </span>
                    </div>
                    <p className="text-xs text-[#e8c0d1] italic mt-0.5">
                      {botanical.latin}
                    </p>
                    <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                      {botanical.documentCopy}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Active Botanical Profile & Authentic Imagery */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHerb.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
              >
                {/* Header row */}
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div>
                    <span className="text-xs font-bold text-[#f4cf80] uppercase tracking-widest">
                      Active Herbal Monograph
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-1">
                      {activeHerb.name}
                    </h3>
                    <p className="text-xs text-[#f9d7e3] italic">{activeHerb.latin}</p>
                  </div>
                  <div className="hidden sm:block">
                    <span className="rounded-full bg-[#f4cf80]/20 border border-[#f4cf80]/40 px-3 py-1 text-xs font-semibold text-[#f4cf80]">
                      100% Non-Hormonal
                    </span>
                  </div>
                </div>

                {/* Traditional History */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-[#f4cf80]" /> Traditional Herbal Usage
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-white/85 leading-relaxed">
                    {activeHerb.traditionalHeritage}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#f4cf80]" /> Targeted Support
                  </h4>
                  <div className="space-y-2">
                    {activeHerb.keyBenefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90">
                        <div className="h-4 w-4 rounded-full bg-[#f4cf80] text-[#350f27] flex items-center justify-center shrink-0">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Natural Compounds */}
                <div className="mt-5 pt-4 border-t border-white/15">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                    Key Bioactive Phytocompounds:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeHerb.activeCompounds.map((compound) => (
                      <span
                        key={compound}
                        className="rounded-lg bg-white/10 border border-white/15 px-2.5 py-1 text-[11px] font-medium text-[#ffd693]"
                      >
                        {compound}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tablet Showcase & CTA */}
                <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={images.menoset_with_pill}
                      alt="Menoset tablet closeup"
                      className="h-14 w-14 rounded-xl object-cover border border-white/25 shadow-md"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Pure Herb Powder Compression</p>
                      <p className="text-[11px] text-white/65">Zero artificial dyes · Non-GMO</p>
                    </div>
                  </div>

                  <a
                    href="#pricing"
                    onClick={handleOrderScroll}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f4cf80] to-[#ffd68a] px-6 py-3 text-xs sm:text-sm font-bold text-[#350f27] hover:scale-105 transition-all shadow-md"
                  >
                    <span>ORDER NOW</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default MenosetFormulaSection;
