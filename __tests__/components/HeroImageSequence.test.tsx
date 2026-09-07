import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { HeroImageSequence, getFrameUrl } from '../../components/new-home/HeroImageSequence';
import { HeroSection } from '../../components/new-home/HeroSection';

describe('HeroImageSequence & Frame logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('generates properly formatted and zero-padded frame URLs', () => {
    expect(getFrameUrl(1)).toBe('/image_sequence/ezgif-frame-001.jpg');
    expect(getFrameUrl(9)).toBe('/image_sequence/ezgif-frame-009.jpg');
    expect(getFrameUrl(10)).toBe('/image_sequence/ezgif-frame-010.jpg');
    expect(getFrameUrl(99)).toBe('/image_sequence/ezgif-frame-099.jpg');
    expect(getFrameUrl(100)).toBe('/image_sequence/ezgif-frame-100.jpg');
    expect(getFrameUrl(120)).toBe('/image_sequence/ezgif-frame-120.jpg');
  });

  it('renders canvas element within container', () => {
    const { container } = render(<HeroImageSequence />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('renders HeroSection with heading, Sprout badge, and CTA button', () => {
    render(<HeroSection reveal={{}} />);
    expect(screen.getByText(/Holis Botanicals/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /Wellness, Rooted in Nature/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Explore our products/i })).toBeInTheDocument();
  });
});
