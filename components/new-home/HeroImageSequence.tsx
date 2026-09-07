import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
import Skeleton from '../skeleton-loaders/Skeleton';

const TOTAL_FRAMES = 120;
const DEFAULT_FPS = 12; // Gentle slow-motion ambient loop (~10s per cycle)
const CONCURRENT_LOAD_LIMIT = 5;

// Helper to format frame path: /image_sequence/ezgif-frame-001.jpg .. ezgif-frame-120.jpg
export const getFrameUrl = (frameNumber: number): string => {
  return `/image_sequence/ezgif-frame-${frameNumber.toString().padStart(3, '0')}.jpg`;
};

// Module-level cache so frames persist across route navigation
const globalFrameCache = new Map<number, HTMLImageElement>();
let globalPreloadPromise: Promise<void> | null = null;

interface HeroImageSequenceProps {
  className?: string;
  fps?: number;
  onFirstFrameReady?: () => void;
}

export const HeroImageSequence: React.FC<HeroImageSequenceProps> = ({
  className = '',
  fps = DEFAULT_FPS,
  onFirstFrameReady,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isFirstFrameReady, setIsFirstFrameReady] = useState<boolean>(() => globalFrameCache.has(1));
  const [, setIsPreloadComplete] = useState<boolean>(false);

  const reduceMotion = useReducedMotion();
  const currentFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(1);
  const isVisibleRef = useRef<boolean>(true);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastFrameTimestampRef = useRef<number>(0);

  // Draw a frame using object-fit: cover logic
  const drawFrame = useCallback((frameNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Use current frame or fallback to the last successfully drawn frame
    let img = globalFrameCache.get(frameNumber);
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = globalFrameCache.get(lastDrawnFrameRef.current);
    }
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = globalFrameCache.get(1);
    }
    if (!img || !img.complete || img.naturalWidth === 0) {
      return;
    }

    lastDrawnFrameRef.current = frameNumber;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (canvasWidth === 0 || canvasHeight === 0) return;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image aspect ratio -> scale by width
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      // Canvas is taller than image aspect ratio -> scale by height
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Update canvas size to match container with DPR scaling (capped at 2 for performance)
  const resizeCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetWidth = Math.floor(rect.width * dpr);
    const targetHeight = Math.floor(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // Redraw current frame immediately upon resize
      drawFrame(lastDrawnFrameRef.current);
    }
  }, [drawFrame]);

  // Load single image with decoding
  const loadImage = useCallback((frameNumber: number): Promise<HTMLImageElement> => {
    if (globalFrameCache.has(frameNumber)) {
      return Promise.resolve(globalFrameCache.get(frameNumber)!);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = getFrameUrl(frameNumber);

      const onDone = () => {
        globalFrameCache.set(frameNumber, img);
        resolve(img);
      };

      if (img.complete && img.naturalWidth > 0) {
        onDone();
      } else {
        img.onload = () => {
          if ('decode' in img && typeof img.decode === 'function') {
            img.decode().then(onDone).catch(onDone);
          } else {
            onDone();
          }
        };
        img.onerror = reject;
      }
    });
  }, []);

  // Priority 1: Load Frame 1 immediately
  useEffect(() => {
    let isCancelled = false;

    if (globalFrameCache.has(1)) {
      setIsFirstFrameReady(true);
      onFirstFrameReady?.();
      resizeCanvas();
      drawFrame(1);
    } else {
      loadImage(1)
        .then(() => {
          if (isCancelled) return;
          setIsFirstFrameReady(true);
          onFirstFrameReady?.();
          resizeCanvas();
          drawFrame(1);
        })
        .catch((err) => {
          console.error('Failed to load initial hero frame', err);
        });
    }

    return () => {
      isCancelled = true;
    };
  }, [loadImage, drawFrame, resizeCanvas, onFirstFrameReady]);

  // Priority 2: Progressive background preloading with concurrency control
  useEffect(() => {
    if (!isFirstFrameReady) return;

    if (!globalPreloadPromise) {
      globalPreloadPromise = (async () => {
        const remainingFrames: number[] = [];
        for (let i = 2; i <= TOTAL_FRAMES; i++) {
          if (!globalFrameCache.has(i)) {
            remainingFrames.push(i);
          }
        }

        let currentIndex = 0;
        const worker = async () => {
          while (currentIndex < remainingFrames.length) {
            const frameNum = remainingFrames[currentIndex++];
            try {
              await loadImage(frameNum);
            } catch (err) {
              console.warn(`Failed to preload frame ${frameNum}`, err);
            }
          }
        };

        const workers = Array.from(
          { length: Math.min(CONCURRENT_LOAD_LIMIT, remainingFrames.length) },
          () => worker()
        );

        await Promise.all(workers);
      })();
    }

    globalPreloadPromise.then(() => {
      setIsPreloadComplete(true);
    });
  }, [isFirstFrameReady, loadImage]);

  // ResizeObserver for responsive canvas updates
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    resizeCanvas();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
      });
      resizeObserver.observe(container);
    }

    window.addEventListener('resize', resizeCanvas);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  // IntersectionObserver & Visibility to pause RAF loop when off-screen or tab hidden
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let intersectionObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisibleRef.current = entry.isIntersecting && !document.hidden;
        },
        { threshold: 0.05 }
      );
      intersectionObserver.observe(container);
    }

    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      intersectionObserver?.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Animation Loop via requestAnimationFrame
  useEffect(() => {
    // If reduced motion is requested, do not run the animation loop
    if (reduceMotion) {
      drawFrame(1);
      return;
    }

    if (!isFirstFrameReady) return;

    let isRunning = true;
    const frameInterval = 1000 / fps;

    const loop = (timestamp: number) => {
      if (!isRunning) return;

      if (lastFrameTimestampRef.current === 0) {
        lastFrameTimestampRef.current = timestamp;
      }

      const elapsed = timestamp - lastFrameTimestampRef.current;

      if (isVisibleRef.current && elapsed >= frameInterval) {
        // Advance frame
        currentFrameRef.current = (currentFrameRef.current % TOTAL_FRAMES) + 1;
        drawFrame(currentFrameRef.current);
        lastFrameTimestampRef.current = timestamp - (elapsed % frameInterval);
      }

      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isFirstFrameReady, reduceMotion, drawFrame, fps]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 -z-20 h-full w-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Existing Skeleton Loader Placeholder while Frame 1 is loading */}
      {!isFirstFrameReady && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none bg-[#0c221b] animate-pulse" />
      )}

      {/* HTML5 Canvas for Sequential Frame Rendering */}
      <canvas
        ref={canvasRef}
        className={`block h-full w-full transition-opacity duration-700 ease-out ${
          isFirstFrameReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default HeroImageSequence;
