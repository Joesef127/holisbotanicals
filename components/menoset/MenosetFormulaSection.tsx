import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ArrowRight, Sparkles, Check, Info } from 'lucide-react';
import { images } from '@/lib';
import { SectionHeader } from '../prostanone/shared';
import FadeIn from '../ui/FadeIn';

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

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Ensure the active card/tab is always visible and centered within the scrollable container on mobile
  useEffect(() => {
    const scrollToActiveTab = (behavior: ScrollBehavior = 'smooth') => {
      // Only perform scroll centering on mobile/tablet (below lg breakpoint)
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) return;

      const container = tabsContainerRef.current;
      const activeTabEl = tabRefs.current[activeHerbId];
      if (!container || !activeTabEl) return;

      const containerWidth = container.clientWidth;
      const tabLeft = activeTabEl.offsetLeft;
      const tabWidth = activeTabEl.clientWidth;

      // Position active card in center of scrollable container
      const targetScrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior,
      });
    };

    // Scroll to active card on mobile
    scrollToActiveTab('smooth');

    // Also update on window resize / orientation change
    const handleResize = () => scrollToActiveTab('auto');
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeHerbId]);

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
            <FadeIn>
            <SectionHeader
              eyebrow="What is Menoset?"
              title="Herbal Support Designed For Women"
              subtitle="Menoset is a herbal composition combining Black Cohosh, Dong Quai, Vitex agnus-castus
                              and Blue Cohosh, botanicals traditionally used and studied in different areas of women's
                              menstrual and menopausal wellness."
              light
            />
            </FadeIn>
          </div>

        {/* Interactive Botanical Herbarium Showcase */}
        <div className="grid gap-8 lg:grid-cols-2 items-start">

          {/* Left / Top on mobile: 4 Interactive Botanical Selector Cards */}
          <div
            ref={tabsContainerRef}
            className="relative flex flex-row items-stretch overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory gap-3 sm:gap-4 py-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:py-0 lg:col-span-1 lg:flex-col lg:space-y-2.5 lg:gap-0 lg:overflow-visible"
          >
            {BOTANICALS.map((botanical) => {
              const isActive = botanical.id === activeHerbId;
              return (
                <button
                  key={botanical.id}
                  ref={(el) => {
                    tabRefs.current[botanical.id] = el;
                  }}
                  type="button"
                  onClick={() => setActiveHerbId(botanical.id)}
                  className={`shrink-0 snap-center w-[280px] sm:w-[320px] lg:w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 sm:gap-4 ${isActive
                    ? 'border-[#f4cf80] bg-white/15 backdrop-blur-md shadow-lg shadow-black/20 lg:translate-x-1.5'
                    : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                    }`}
                >
                  <div
                    className={`h-10 w-10 sm:h-11 sm:w-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isActive
                      ? 'bg-[#f4cf80] text-[#350f27]'
                      : 'bg-white/10 text-white/70'
                      }`}
                  >
                    <Leaf className="h-5 w-5" />
                  </div>

                  <div className="grow min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white truncate sm:overflow-visible">
                        {botanical.name}
                      </h3>
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#f4cf80] uppercase tracking-wider shrink-0">
                        {botanical.role}
                      </span>
                    </div>
                    <p className="text-xs text-[#e8c0d1] italic mt-0.5">
                      {botanical.latin}
                    </p>
                    <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                      {botanical.documentCopy}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Active Botanical Profile & Authentic Imagery */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHerb.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl border border-white/20 bg-white/10 p-4 sm:p-8 backdrop-blur-xl shadow-2xl"
              >
                {/* Header row */}
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div>
                    <span className="text-xs font-bold text-[#f4cf80] uppercase tracking-widest">
                      Active Herbal Monograph
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">
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
                    Targeted Support
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
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f4cf80] to-[#ffd68a] mt-3 sm:mt-0 px-6 py-3 text-xs sm:text-sm font-bold text-[#350f27] hover:scale-105 transition-all shadow-md"
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
