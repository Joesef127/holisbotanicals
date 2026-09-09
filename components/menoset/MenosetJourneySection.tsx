import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Check, Sparkles, Activity, Clock, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { FadeIn, SectionHeader } from '../prostanone/shared';

interface StageData {
  id: string;
  number: string;
  name: string;
  timeframe: string;
  summary: string;
  symptoms: string[];
  hormonalContext: string;
  menosetSupport: string;
}

const STAGES: StageData[] = [
  {
    id: 'perimenopause',
    number: '01',
    name: 'Perimenopause',
    timeframe: 'Typically mid-30s to late 40s (can last 4–8 years)',
    summary: 'The transition towards menopause. Hormone levels, particularly estrogen and progesterone, fluctuate unpredictably.',
    symptoms: [
      'Irregular periods & cycle shifts',
      'Sudden hot flashes & night sweats',
      'Mood changes & irritability',
      'Menstrual discomfort & cramps',
      'Sleep changes & breast tenderness',
      'Changes in natural libido',
    ],
    hormonalContext: 'Ovarian progesterone and estrogen output oscillates, leading to cycle unpredictability and thermoregulation triggers.',
    menosetSupport: 'Provides gentle botanical phytonutrients that help smooth the rhythm of fluctuations without introducing foreign synthetic hormones.',
  },
  {
    id: 'menopause',
    number: '02',
    name: 'Menopause',
    timeframe: 'Clinically diagnosed after 12 consecutive months without a period',
    summary: 'The milestone marking the conclusion of reproductive menstrual cycles as hormone baselines settle at new levels.',
    symptoms: [
      'Frequent hot flashes & thermal spikes',
      'Persistent night sweats',
      'Sleep disruption & fatigue',
      'Mood changes & emotional sensitivity',
      'Vaginal dryness & tissue changes',
      'Shifts in sexual desire & comfort',
    ],
    hormonalContext: 'Estrogen drops to a stable, lower baseline. The hypothalamus becomes hyper-sensitive to temperature regulation.',
    menosetSupport: 'Black Cohosh and Vitex agnus-castus traditionally soothe the hypothalamic thermostat to calm hot flashes and emotional strain.',
  },
  {
    id: 'postmenopause',
    number: '03',
    name: 'Postmenopause',
    timeframe: 'The enduring years and decades following menopause',
    summary: 'The ongoing wellness chapter where acute cycle symptoms gradually subside, while cellular, bone, and cardiovascular care take priority.',
    symptoms: [
      'Lingering mild temperature variations',
      'Increased focus on bone density & vitality',
      'Cardiovascular & lipid balance considerations',
      'Skin elasticity & moisture maintenance',
      'General stamina & emotional serenity',
    ],
    hormonalContext: 'Hormone production shifts from ovaries to adrenal glands and peripheral tissues at modest, steady levels.',
    menosetSupport: 'Dong Quai and supportive botanicals nourish ongoing vitality, tissue comfort, and systemic daily equilibrium.',
  },
];

export const MenosetJourneySection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('perimenopause');
  const activeStage = STAGES.find((s) => s.id === activeStageId) ?? STAGES[0];
  const activeStageIndex = STAGES.findIndex((s) => s.id === activeStageId);

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Ensure the active tab is always visible and centered within the scrollable container on mobile
  useEffect(() => {
    const scrollToActiveTab = (behavior: ScrollBehavior = 'smooth') => {
      const container = tabsContainerRef.current;
      const activeTabEl = tabRefs.current[activeStageId];
      if (!container || !activeTabEl) return;

      const containerWidth = container.clientWidth;
      const tabLeft = activeTabEl.offsetLeft;
      const tabWidth = activeTabEl.clientWidth;

      // Position active tab in center of scrollable container
      const targetScrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior,
      });
    };

    // Scroll to active tab
    scrollToActiveTab('smooth');

    // Also update on window resize / orientation change
    const handleResize = () => scrollToActiveTab('auto');
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeStageId]);

  const handleDiscoverScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('formula');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="journey" className="py-24 bg-tertiary relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <FadeIn>
          <SectionHeader
            eyebrow="Menopause Journey"
            title="What's Happening To Your Body?"
            subtitle="The menopause transition does not happen overnight. As your body changes with age,
                      hormone levels fluctuate and gradually decline. This can bring changes to your menstrual cycle
                      and a range of physical and emotional symptoms."
          />
        </FadeIn>

        {/* Interactive Stage Selector Tabs */}
        <div className="flex justify-center mb-10 w-full px-2 sm:px-0">
          <div
            ref={tabsContainerRef}
            className="inline-flex p-1.5 rounded-full bg-white border border-gray-100 shadow-sm max-w-full overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {STAGES.map((stage) => {
              const isActive = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  ref={(el) => {
                    tabRefs.current[stage.id] = el;
                  }}
                  type="button"
                  onClick={() => setActiveStageId(stage.id)}
                  className={`shrink-0 snap-center relative px-4 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${isActive ? 'text-white' : 'text-primary hover:text-secondary'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-journey-tab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary shadow-md"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                    <span className="opacity-70 text-[10px] sm:text-xs">{stage.number}</span>
                    <span>{stage.name}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Presentation Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-gray-100 bg-white p-4 sm:p-8 lg:p-10 shadow-xl shadow-[#4e1939]/5"
          >
            <div className="grid gap-10 lg:grid-cols-12">

              {/* Left Column: Stage description & context */}
              <div className="lg:col-span-7">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <span className="text-sm font-bold text-primary tracking-widest uppercase">
                    Stage {activeStage.number} of 03
                  </span>
                  <span className="text-secondary hidden sm:block">•</span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {activeStage.timeframe}
                  </span>
                </div>

                <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary">
                  {activeStage.name}
                </h3>

                <p className="mt-4 text-base sm:text-lg text-text-muted leading-relaxed">
                  {activeStage.summary}
                </p>

                <div className="mt-6 rounded-2xl bg-[#fff8fa] p-5 border border-[#f0dfe6]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#9d3d65] flex items-center gap-2">
                    <Activity className="h-4 w-4" /> Hormonal Mechanism
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-[#664b5b] leading-relaxed">
                    {activeStage.hormonalContext}
                  </p>
                </div>

                <div className="mt-4 rounded-2xl bg-[#fdf9f4] p-5 border border-[#f3e6d6]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#9c6a1e] flex items-center gap-2">
                    <Shield className="h-4 w-4" /> How Menoset Supports This Stage
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-[#634e35] leading-relaxed">
                    {activeStage.menosetSupport}
                  </p>
                </div>
              </div>

              {/* Right Column: Typical Symptoms Checklist */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="rounded-2xl border border-[#eedde5] bg-[#fffafc] p-6 sm:p-7">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4e1939] mb-4 flex items-center gap-2">
                    Common Signs & Symptoms
                  </h4>
                  <ul className="space-y-3">
                    {activeStage.symptoms.map((symptom) => (
                      <li key={symptom} className="flex items-start gap-3 text-sm text-[#5a3e4e]">
                        <div className="h-5 w-5 rounded-full bg-[#f8e6ed] text-[#9d3d65] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="leading-snug">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA to Formula & Stage Navigator */}
                <div className="mt-8 flex flex-col items-start justify-between gap-4 pt-6 border-t border-gray-100">
                  <a
                    href="#formula"
                    onClick={handleDiscoverScroll}
                    className="w-auto inline-flex items-center justify-center gap-2 font-bold text-sm bg-primary/20 hover:bg-primary px-5 py-2.5 rounded-full text-primary hover:text-white transition-colors group"
                  >
                    <span>Discover The Menoset Formula</span>
                    <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5 text-primary group-hover:text-white" />
                  </a>

                  {/* Stage navigation buttons (Previous / Next) */}
                  <div className="flex items-center gap-2 w-full justify-between sm:justify-end">
                    {activeStageIndex > 0 ? (
                      <button
                        type="button"
                        onClick={() => setActiveStageId(STAGES[activeStageIndex - 1].id)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-bold text-secondary bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors flex items-center gap-1"
                      >
                        <ChevronLeft className="h-3.5 w-3.5 text-primary" />
                        <span>Prev</span>
                      </button>
                    ) : (
                      <span />
                    )}
                    {activeStageIndex < STAGES.length - 1 && (
                      <button
                        type="button"
                        onClick={() => setActiveStageId(STAGES[activeStageIndex + 1].id)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-primary hover:bg-secondary transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <span>Next: {STAGES[activeStageIndex + 1].name}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default MenosetJourneySection;
