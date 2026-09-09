import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, CalendarCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { images } from '@/lib';

export const MenosetHowToUse: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Sun,
      title: 'Morning Routine',
      instruction: 'Take 1 tablet with water after breakfast to support daytime temperature stability and emotional focus.',
    },
    {
      step: '02',
      icon: Moon,
      title: 'Evening Routine',
      instruction: 'Take 1 tablet with dinner or before bed to encourage nighttime comfort, calmer body temperature, and restful sleep.',
    },
    {
      step: '03',
      icon: CalendarCheck,
      title: '30-Day Consistency',
      instruction: 'Take consistently as directed. Botanical actives build in your system over weeks for sustained balance.',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Block */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-[#4e1939]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#4e1939] mb-4"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#9d3d65]" />
            <span>Effortless Regimen</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#3d132b] leading-tight"
          >
            Simple. Daily. Consistent.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#654b5a] leading-relaxed max-w-2xl mx-auto"
          >
            Designed to integrate effortlessly into your everyday schedule without disruption.
          </motion.p>
        </div>

        {/* 3 Step Cards + Specifications Panel */}
        <div className="grid gap-8 lg:grid-cols-12 items-center">

          {/* Left: 3 Steps */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((s, index) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl border border-[#eedde5] bg-[#fffafc] p-6 flex items-start gap-5 shadow-sm hover:border-[#9d3d65]/40 transition-colors"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#4e1939] text-[#f4cf80] font-bold text-sm shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#9d3d65] uppercase tracking-wider">
                        Step {s.step}
                      </span>
                      <h3 className="text-lg font-bold text-[#3d132b]">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm text-[#664b5b] leading-relaxed">
                      {s.instruction}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Pack Specification & Health Professional Advisory */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-[#ead7df] bg-gradient-to-br from-[#fff7fa] to-[#fff3eb] p-8 shadow-lg shadow-[#4e1939]/5"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl border border-[#ead7df] shadow-sm aspect-video">
                <img
                  src={images.menoset_display}
                  alt="Menoset daily pack display"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <h4 className="text-xl font-bold text-[#3d132b]">
                Packaging & Dosage Specs
              </h4>

              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#eedde5] pb-2.5">
                  <dt className="text-[#725464]">Recommended Dosage</dt>
                  <dd className="font-bold text-[#3d132b]">1 tablet twice daily</dd>
                </div>
                <div className="flex justify-between border-b border-[#eedde5] pb-2.5">
                  <dt className="text-[#725464]">Pack Size</dt>
                  <dd className="font-bold text-[#3d132b]">60 tablets per box</dd>
                </div>
                <div className="flex justify-between border-b border-[#eedde5] pb-2.5">
                  <dt className="text-[#725464]">Duration Supply</dt>
                  <dd className="font-bold text-[#3d132b]">30 days at stated dosage</dd>
                </div>
              </dl>

              {/* Tip Callout from document */}
              <div className="mt-6 rounded-2xl bg-white p-4 border border-[#f0dfe6] flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-[#9d3d65] shrink-0 mt-0.5" />
                <p className="text-xs text-[#725363] leading-relaxed">
                  <strong>Tip:</strong> Take consistently as directed. If you are pregnant,
                  breastfeeding, taking medication or have an existing medical condition, speak with a
                  healthcare professional before use.
                </p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default MenosetHowToUse;
