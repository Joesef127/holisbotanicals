import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, MoreVertical, Pencil, Trash2, PlusCircle } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { SectionHeader } from '../prostanone/shared';
import { useTestimonials } from '../../hooks/useTestimonials';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import { Testimonial } from '../../types';
import { API_BASE } from '../../lib/constants';
import TestimonialEditModal from '../prostanone/TestimonialEditModal';

export const MenosetSocialProof: React.FC = () => {
  const { testimonials, refetch } = useTestimonials('menoset');
  const { isAdmin, token } = useAuth();
  const { showConfirm } = useModal();
  const [editingT, setEditingT] = useState<Testimonial | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    if (!openMenuId) return;
    const closeMenu = () => setOpenMenuId(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [openMenuId]);

  const openAdd = () => {
    setEditingT(null);
    setModalOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditingT(t);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    setOpenMenuId(null);
    const confirmed = await showConfirm({
      title: 'Delete Review',
      message: 'Remove this review permanently? This cannot be undone.',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      destructive: true,
    });
    if (!confirmed) return;
    await fetch(`${API_BASE}/api/testimonials/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    refetch();
  };

  return (
    <section className="py-24 bg-tertiary relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <FadeIn>
            <SectionHeader
              eyebrow="Community Voice"
              title="Real Women. Real Experiences."
              subtitle="Everyday wellness, thoughtfully supported. Honest reflections from women who made Menoset part of their daily life."
            />
          </FadeIn>

          {isAdmin && (
            <div className="flex justify-center items-center mt-6">
              <button
                type="button"
                onClick={openAdd}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                Add Review
              </button>
            </div>
          )}
        </div>

        {/* Testimonials Modern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id ?? idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative rounded-3xl border border-gray-100 bg-surface p-7 sm:p-8 shadow-sm hover:border-primary/35 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Admin Menu */}
              {isAdmin && (
                <div className="absolute top-3 right-3 z-20">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === item.id ? null : item.id);
                    }}
                    className="p-1.5 rounded-full bg-white/90 hover:bg-white shadow text-gray-500 hover:text-gray-800 transition-colors border border-gray-100"
                    title="Review options"
                  >
                    <MoreVertical size={16} />
                  </button>
                  {openMenuId === item.id && (
                    <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-30">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEdit(item);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Pencil size={14} className="text-primary" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div>
                {/* Top Row: Stars & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-accent">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-600 bg-green-50/10 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="h-3 w-3" /> Verified Buyer
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-text-muted leading-relaxed italic font-normal">
                  "{item.text}"
                </p>
              </div>

              {/* Author & City Footer */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-primary block text-sm">
                    {item.name}
                  </span>
                  <span className="text-text-muted font-medium">
                    {[
                      item.age ? `Age ${item.age}` : null,
                      item.location
                        ? item.location.toLowerCase().includes('nigeria')
                          ? item.location
                          : `${item.location}, Nigeria`
                        : null,
                    ]
                      .filter(Boolean)
                      .join(' · ') || 'Verified Customer'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {modalOpen && (
          <TestimonialEditModal
            testimonial={editingT}
            defaultProductId="menoset"
            productName="Menoset"
            onClose={() => setModalOpen(false)}
            onSaved={() => {
              setModalOpen(false);
              refetch();
            }}
          />
        )}
      </div>
    </section>
  );
};

export default MenosetSocialProof;
