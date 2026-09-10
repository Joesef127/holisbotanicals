import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePackageForm } from '../../hooks/usePackageForm';

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ token: 'mock-token', isAdmin: true }),
}));

vi.mock('../../context/ModalContext', () => ({
  useModal: () => ({
    showConfirm: vi.fn().mockResolvedValue(true),
    showAlert: vi.fn(),
  }),
}));

describe('usePackageForm Hook', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty form in create mode without requiring an ID', () => {
    const onSaved = vi.fn();
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      usePackageForm({
        pkg: null,
        defaultProductId: 'prostanone',
        onSaved,
        onClose,
      })
    );

    expect(result.current.isEdit).toBe(false);
    expect(result.current.form.name).toBe('');
    expect(result.current.form.price).toBe('');
    expect((result.current.form as any).id).toBeUndefined();
  });

  it('should validate that name and price are required', async () => {
    const onSaved = vi.fn();
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      usePackageForm({
        pkg: null,
        defaultProductId: 'prostanone',
        onSaved,
        onClose,
      })
    );

    await act(async () => {
      await result.current.save();
    });

    expect(result.current.error).toBe('Package name is required.');
    expect(global.fetch).not.toHaveBeenCalled();

    // Set name but not price
    act(() => {
      result.current.set('name')({ target: { value: 'Starter Pack' } } as any);
    });

    await act(async () => {
      await result.current.save();
    });

    expect(result.current.error).toBe('Price is required.');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should submit POST to /api/packages/prostanone when creating prostanone package without providing ID', async () => {
    const mockCreated = {
      id: 'prostanone-starter-pack-12345',
      name: 'Starter Pack',
      containers: 1,
      price: 15000,
      description: '1 Pack',
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCreated,
    });

    const onSaved = vi.fn();
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      usePackageForm({
        pkg: null,
        defaultProductId: 'prostanone',
        onSaved,
        onClose,
      })
    );

    act(() => {
      result.current.set('name')({ target: { value: 'Starter Pack' } } as any);
      result.current.set('price')({ target: { value: '15000' } } as any);
      result.current.set('description')({ target: { value: '1 Pack' } } as any);
    });

    await act(async () => {
      await result.current.save();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/packages/prostanone'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer mock-token',
        }),
      })
    );

    // Verify sent payload does not contain an id field allocated by user
    const callBody = JSON.parse((global.fetch as any).mock.calls[0][1].body);
    expect(callBody.id).toBeUndefined();
    expect(callBody.name).toBe('Starter Pack');
    expect(callBody.price).toBe(15000);

    expect(onSaved).toHaveBeenCalledWith(mockCreated);
    expect(onClose).toHaveBeenCalled();
  });

  it('should submit POST to /api/packages/menoset when creating menoset package', async () => {
    const mockCreated = {
      id: 'menoset-wellness-12345',
      name: 'Wellness Bundle',
      containers: 6,
      price: 77000,
      description: '6 Packs',
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCreated,
    });

    const onSaved = vi.fn();
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      usePackageForm({
        pkg: null,
        defaultProductId: 'menoset',
        onSaved,
        onClose,
      })
    );

    act(() => {
      result.current.set('name')({ target: { value: 'Wellness Bundle' } } as any);
      result.current.set('price')({ target: { value: '77000' } } as any);
      result.current.set('containers')({ target: { value: '6' } } as any);
    });

    await act(async () => {
      await result.current.save();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/packages/menoset'),
      expect.objectContaining({
        method: 'POST',
      })
    );

    expect(onSaved).toHaveBeenCalledWith(mockCreated);
    expect(onClose).toHaveBeenCalled();
  });

  it('should call onDeleted and onClose when remove succeeds with res.ok = true', async () => {
    const pkg = {
      id: 'prostanone-starter',
      name: 'Starter Pack',
      containers: 1,
      price: 15000,
      description: '1 Pack',
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const onDeleted = vi.fn();
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      usePackageForm({
        pkg,
        defaultProductId: 'prostanone',
        onSaved: vi.fn(),
        onDeleted,
        onClose,
      })
    );

    await act(async () => {
      await result.current.remove();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/packages/prostanone/prostanone-starter'),
      expect.objectContaining({ method: 'DELETE' })
    );
    expect(onDeleted).toHaveBeenCalledWith('prostanone-starter');
    expect(onClose).toHaveBeenCalled();
    expect(result.current.deleting).toBe(false);
  });

  it('should set error and not call onDeleted/onClose when remove fails with res.ok = false', async () => {
    const pkg = {
      id: 'prostanone-starter',
      name: 'Starter Pack',
      containers: 1,
      price: 15000,
      description: '1 Pack',
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Cannot delete package with active orders' }),
    });

    const onDeleted = vi.fn();
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      usePackageForm({
        pkg,
        defaultProductId: 'prostanone',
        onSaved: vi.fn(),
        onDeleted,
        onClose,
      })
    );

    await act(async () => {
      await result.current.remove();
    });

    expect(onDeleted).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
    expect(result.current.error).toBe('Cannot delete package with active orders');
    expect(result.current.deleting).toBe(false);
  });

  it('should initialize and submit subtitle and recommendedFor for prostanone', async () => {
    const pkg = {
      id: 'prostanone-option-b',
      name: 'Special Pack',
      containers: 2,
      price: 25000,
      description: '2 Packs',
      subtitle: 'Popular Choice',
      recommendedFor: 'Moderate Symptoms',
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => pkg,
    });

    const onSaved = vi.fn();
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      usePackageForm({
        pkg,
        defaultProductId: 'prostanone',
        onSaved,
        onClose,
      })
    );

    expect(result.current.form.subtitle).toBe('Popular Choice');
    expect(result.current.form.recommendedFor).toBe('Moderate Symptoms');

    await act(async () => {
      await result.current.save();
    });

    const callBody = JSON.parse((global.fetch as any).mock.calls[0][1].body);
    expect(callBody.subtitle).toBe('Popular Choice');
    expect(callBody.recommendedFor).toBe('Moderate Symptoms');
  });
});
