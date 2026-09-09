import { useEffect, useState } from 'react';
import { TESTIMONIALS as FALLBACK, MENOSET_TESTIMONIALS, API_BASE } from '../lib/constants';
import { Testimonial } from '../types';

interface UseTestimonialsResult {
  testimonials: Testimonial[];
  loading: boolean;
  refetch: () => void;
}

export function useTestimonials(productId: 'prostanone' | 'menoset' = 'prostanone'): UseTestimonialsResult {
  const fallback = productId === 'menoset' ? MENOSET_TESTIMONIALS : FALLBACK;
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/testimonials?productId=${productId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((rows: Testimonial[] | null) => {
        if (rows && rows.length > 0) setTestimonials(rows);
      })
      .catch(() => {/* keep fallback */})
      .finally(() => setLoading(false));
  }, [productId, tick]);

  const refetch = () => setTick((t) => t + 1);

  return { testimonials, loading, refetch };
}
