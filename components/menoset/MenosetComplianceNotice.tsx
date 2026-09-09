import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { MENOSET_NAFDAC_REG_NO } from '../../lib/constants';

export const MenosetComplianceNotice: React.FC = () => {
  return (
    <section className="border-t border-gray-100 bg-tertiary py-10 px-4 sm:px-6 lg:px-8 text-xs text-text-muted leading-relaxed">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <ShieldAlert className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p>
              <strong>Regulatory & Healthcare Guidance:</strong> Menoset is a 100% herbal,
              non-hormonal dietary supplement designed to support women experiencing menstrual
              irregularities, menstrual discomfort, and symptoms associated with perimenopause and
              menopause. It is registered with the National Agency for Food and Drug Administration and
              Control (NAFDAC Reg. No. {MENOSET_NAFDAC_REG_NO}).
            </p>
            <p>
              Menoset is intended for general nutritional and botanical wellness support and is not a
              substitute for professional medical diagnosis or clinical treatment. If you are
              pregnant, nursing, taking prescription medicines, or have an existing chronic medical
              condition, please consult a qualified healthcare provider prior to starting any new
              supplement routine. Individual experiences and transition timelines may vary.
            </p>
            <p className="text-[11px] text-text-muted">
              Distributed by Holis Botanical Gardens. Made in compliance with Good Manufacturing Practices (GMP).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenosetComplianceNotice;
