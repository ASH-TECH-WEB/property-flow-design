import { useEffect, useRef } from 'react';

/**
 * Performance monitoring hook
 * Tracks component render times and provides performance insights
 */
export const usePerformance = (componentName: string) => {
  const renderStartTime = useRef<number>(0);
  const renderCount = useRef<number>(0);

  useEffect(() => {
    renderStartTime.current = performance.now();
    renderCount.current += 1;

    // Use requestAnimationFrame to measure after render
    requestAnimationFrame(() => {
      const renderTime = performance.now() - renderStartTime.current;
      
      // Only log if render time is significant (> 5ms)
      if (renderTime > 5) {
        console.log(`⚡ ${componentName} rendered in ${renderTime.toFixed(2)}ms (render #${renderCount.current})`);
      }
    });
  });

  return {
    renderCount: renderCount.current,
    measureRender: (name: string) => {
      const start = performance.now();
      return () => {
        const end = performance.now();
        console.log(`⏱️ ${name} took ${(end - start).toFixed(2)}ms`);
      };
    }
  };
};

/**
 * Hook to measure API call performance
 */
export const useAPIPerformance = () => {
  const measureAPICall = async <T>(
    apiCall: () => Promise<T>,
    endpoint: string
  ): Promise<T> => {
    const startTime = performance.now();
    
    try {
      const result = await apiCall();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Log slow API calls (> 1 second)
      if (duration > 1000) {
        console.warn(`🐌 Slow API call: ${endpoint} took ${duration.toFixed(2)}ms`);
      } else if (duration > 500) {
        console.log(`⏱️ API call: ${endpoint} took ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.error(`❌ API call failed: ${endpoint} after ${duration.toFixed(2)}ms`, error);
      throw error;
    }
  };

  return { measureAPICall };
};