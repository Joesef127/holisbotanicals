import { useEffect, useState } from 'react';
import { PACKAGES as FALLBACK_PACKAGES, MENOSET_PACKAGES, API_BASE } from '../lib/constants';
import { ProductPackage } from '../types';

interface UsePackagesResult {
  packages: ProductPackage[];
  loading: boolean;
  refetch: () => void;
}

export function usePackages(productId: 'prostanone' | 'menoset' = 'prostanone'): UsePackagesResult {
  const fallback = productId === 'menoset' ? MENOSET_PACKAGES : FALLBACK_PACKAGES;
  const [packages, setPackages] = useState<ProductPackage[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/packages?productId=${productId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((rows: ProductPackage[] | null) => {
        if (rows && rows.length > 0) setPackages(rows);
      })
      .catch(() => {/* keep fallback */})
      .finally(() => setLoading(false));
  }, [productId, tick]);

  const refetch = () => setTick((t) => t + 1);

  return { packages, loading, refetch };
}
