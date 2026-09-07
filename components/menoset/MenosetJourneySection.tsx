import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Check, Sparkles, Activity, Clock, Shield } from 'lucide-react';

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

  const handleDiscoverScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('formula');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="journey" className="py-24 bg-[#fffaf8] relative overflow-hidden">
      {/* Decorative gradient accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#f4cf80]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#d77892]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-[#4e1939]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#4e1939] mb-4"
          >
            <Activity className="h-3.5 w-3.5 text-[#9d3d65]" />
            <span>The Female Life Stages</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#3d132b] leading-tight"
          >
            Perimenopause. Menopause. Postmenopause.{' '}
            <span className="block text-[#9d3d65] mt-1">What's Happening To Your Body?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#654b5a] leading-relaxed max-w-2xl mx-auto"
          >
            The menopause transition does not happen overnight. As your body changes with age,
            hormone levels fluctuate and gradually decline. This can bring changes to your menstrual cycle
            and a range of physical and emotional symptoms.
          </motion.p>
        </div>

        {/* Interactive Stage Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-white border border-[#ead7df] shadow-sm max-w-full overflow-x-auto">
            {STAGES.map((stage) => {
              const isActive = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageId(stage.id)}
                  className={`relative px-5 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-[#6e4e5e] hover:text-[#3d132b]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-journey-tab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4e1939] to-[#732454] shadow-md"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
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
            className="rounded-3xl border border-[#ead7df] bg-white p-6 sm:p-10 lg:p-12 shadow-xl shadow-[#4e1939]/5"
          >
            <div className="grid gap-10 lg:grid-cols-12">
              
              {/* Left Column: Stage description & context */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#9d3d65] tracking-widest uppercase">
                    Stage {activeStage.number} of 03
                  </span>
                  <span className="text-[#d7c4ce]">•</span>
                  <span className="text-xs text-[#7d5e6e] flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {activeStage.timeframe}
                  </span>
                </div>

                <h3 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3d132b]">
                  {activeStage.name}
                </h3>

                <p className="mt-4 text-base sm:text-lg text-[#553b49] leading-relaxed">
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
                    <Sparkles className="h-4 w-4 text-[#9d3d65]" /> Common Signs & Symptoms
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

                {/* Bottom CTA to Formula */}
                <div className="mt-6 text-center lg:text-left">
                  <a
                    href="#formula"
                    onClick={handleDiscoverScroll}
                    className="inline-flex items-center gap-2 font-bold text-sm text-[#4e1939] hover:text-[#9d3d65] transition-colors group"
                  >
                    <span>DISCOVER THE MENOSET FORMULA</span>
                    <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1 text-[#9d3d65]" />
                  </a>
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
