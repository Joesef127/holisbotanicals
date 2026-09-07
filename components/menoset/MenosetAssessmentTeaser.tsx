import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, ShieldAlert } from 'lucide-react';
import Button from '../Button';

const MenosetAssessmentTeaser: React.FC = () => {
  return (
    <section className="py-12 bg-rose-500/5 dark:bg-rose-950/20 border-y border-rose-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-card border border-rose-500/20 shadow-lg"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Quick Self-Check
                </span>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Takes 60 Seconds</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Wondering which Menoset bundle fits your symptoms?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1.5 mt-1">
                <ShieldAlert className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Product guidance only — not a medical diagnosis.</span>
              </p>
            </div>
          </div>

          <Link to="/menoset/quiz" className="w-full md:w-auto shrink-0">
            <Button size="md" className="w-full md:w-auto gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold">
              <span>Take the 60-Second Check</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MenosetAssessmentTeaser;
