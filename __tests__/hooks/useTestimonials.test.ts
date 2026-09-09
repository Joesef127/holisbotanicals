import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTestimonials } from '../../hooks/useTestimonials';

describe('useTestimonials Hook', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default Prostanone fallback testimonials and fetch from API', async () => {
    const mockTestimonials = [
      { id: 1, name: 'John D.', text: 'Great supplement', rating: 5 },
    ];
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTestimonials,
    });

    const { result } = renderHook(() => useTestimonials());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('productId=prostanone'));
    expect(result.current.testimonials).toEqual(mockTestimonials);
    expect(result.current.loading).toBe(false);
  });

  it('should fetch Menoset testimonials with productId=menoset', async () => {
    const mockMenoset = [
      { id: 101, name: 'Amina B.', text: 'Menoset works great', rating: 5, productId: 'menoset' },
    ];
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockMenoset,
    });

    const { result } = renderHook(() => useTestimonials('menoset'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('productId=menoset'));
    expect(result.current.testimonials).toEqual(mockMenoset);
  });

  it('should fallback to MENOSET_TESTIMONIALS when API call fails for Menoset', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useTestimonials('menoset'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });

    expect(result.current.testimonials.length).toBeGreaterThan(0);
    expect(result.current.testimonials[0].name).toBe('Amina B.');
    expect(result.current.loading).toBe(false);
  });
});
