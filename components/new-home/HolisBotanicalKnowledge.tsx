import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, ArrowRight, BookOpen, Activity } from 'lucide-react';
import Button from '../Button';

const HolisBotanicalKnowledgeSection: React.FC = () => {
  return (
    <section className="py-24 bg-surface/30 dark:bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Botanical Science &amp; Heritage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-text tracking-tight leading-tight mb-6">
              From Botanical Knowledge to Everyday Wellness
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-muted leading-relaxed mb-6">
              For generations, plant-based remedies have served as humanity’s primary foundation for vitality and restorative health. At Holis Botanicals, we combine traditional herbal mastery with modern extraction technologies.
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-muted leading-relaxed mb-8">
              Every formula is standardized to guarantee active compound potency, ensuring your body receives bioavailable botanical nutrients that deliver consistent and noticeable relief.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/science">
                <Button variant="outline" size="md" className="gap-2">
                  <span>Explore Our Science</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Interactive Personal Assessment Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="rounded-3xl bg-white dark:bg-card border border-primary/20 p-8 sm:p-10 shadow-xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-primary mb-3">
                Wellness Should Feel Personal
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-muted mb-8 leading-relaxed">
                Everyone’s body and lifecycle transitions are unique. Take our quick, confidential self-assessments to discover which botanical routine matches your immediate wellness goals.
              </p>

              <div className="space-y-4">
                <Link
                  to="/menoset-check"
                  className="group flex items-center justify-between p-4 rounded-2xl bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/20 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-primary group-hover:text-primary transition-colors">
                        Women&apos;s 60-Second Symptom Check
                      </div>
                      <div className="text-xs text-gray-500 dark:text-muted">
                        Menstrual regularity, cramp relief &amp; hot flash profile
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>

                <Link
                  to="/quiz"
                  className="group flex items-center justify-between p-4 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/20 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-primary group-hover:text-primary transition-colors">
                        Men&apos;s Prostate Health Assessment
                      </div>
                      <div className="text-xs text-gray-500 dark:text-muted">
                        Urinary flow, nighttime frequency &amp; prostate scoring
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HolisBotanicalKnowledgeSection;
