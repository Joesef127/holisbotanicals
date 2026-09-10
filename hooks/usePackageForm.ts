import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { ProductPackage } from '../types';
import { API_BASE } from '../lib/constants';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';

interface Options {
  pkg: ProductPackage | null;
  defaultProductId?: 'prostanone' | 'menoset';
  onSaved: (pkg: ProductPackage) => void;
  onDeleted?: (id: string) => void;
  onClose: () => void;
}

export interface PackageForm {
  name: string;
  containers: string;
  price: string;
  originalPrice: string;
  description: string;
  subtitle: string;
  savingsText: string;
  deliveryText: string;
  usageNote: string;
  badge: string;
  recommendedFor: string;
}

export function usePackageForm({ pkg, defaultProductId = 'prostanone', onSaved, onDeleted, onClose }: Options) {
  const { token } = useAuth();
  const { showConfirm } = useModal();
  const isEdit = pkg !== null;

  const [form, setForm] = useState<PackageForm>({
    name:           pkg?.name           ?? '',
    containers:     String(pkg?.containers ?? 1),
    price:          String(pkg?.price   ?? ''),
    originalPrice:  String(pkg?.originalPrice ?? pkg?.price ?? ''),
    description:    pkg?.description    ?? '',
    subtitle:       pkg?.subtitle       ?? '',
    savingsText:    pkg?.savingsText    ?? '',
    deliveryText:   pkg?.deliveryText   ?? '',
    usageNote:      pkg?.usageNote      ?? '',
    badge:          pkg?.badge          ?? '',
    recommendedFor: pkg?.recommendedFor ?? '',
  });

  const [saving,   setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error,    setError]    = useState('');

  const set = (field: keyof PackageForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const save = async () => {
    setError('');
    if (!form.name.trim()) { setError('Package name is required.'); return; }
    if (!form.price)       { setError('Price is required.');        return; }

    setSaving(true);
    const body = {
      name:           form.name.trim(),
      containers:     parseInt(form.containers, 10) || 1,
      price:          parseInt(form.price, 10),
      originalPrice:  form.originalPrice ? parseInt(form.originalPrice, 10) : undefined,
      description:    form.description.trim(),
      ...(defaultProductId === 'prostanone' && {
        subtitle:       form.subtitle.trim()       || undefined,
        recommendedFor: form.recommendedFor.trim() || undefined,
      }),
      savingsText:    form.savingsText.trim()  || null,
      deliveryText:   form.deliveryText.trim(),
      usageNote:      form.usageNote.trim(),
      badge:          form.badge.trim()        || null,
    };

    const targetUrl = isEdit
      ? `${API_BASE}/api/packages/${defaultProductId}/${pkg!.id}`
      : `${API_BASE}/api/packages/${defaultProductId}`;

    try {
      const res = await fetch(targetUrl, {
        method:  isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      setSaving(false);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? 'Failed to save');
        return;
      }

      const saved: ProductPackage = await res.json();
      onSaved(saved);
      onClose();
    } catch (err: any) {
      setSaving(false);
      setError(err?.message || 'Network error while saving package');
    }
  };

  const remove = async () => {
    if (!pkg) return;
    const confirmed = await showConfirm({
      title: 'Delete Package',
      message: `Delete "${pkg.name}"? This cannot be undone.`,
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      destructive: true,
    });
    if (!confirmed) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE}/api/packages/${defaultProductId}/${pkg.id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setDeleting(false);
        setError(data.error ?? 'Failed to delete package');
        return;
      }
      setDeleting(false);
      onDeleted?.(pkg.id);
      onClose();
    } catch {
      setDeleting(false);
      setError('Failed to delete package');
    }
  };

  return { form, set, isEdit, saving, deleting, error, save, remove };
}
