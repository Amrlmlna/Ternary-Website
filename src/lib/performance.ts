// Performance monitoring utility

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    pageLoadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    firstInputDelay: 0,
    cumulativeLayoutShift: 0,
  };

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    if (typeof window === "undefined") return;

    // Page Load Time
    window.addEventListener("load", () => {
      const loadTime = performance.now();
      this.metrics.pageLoadTime = loadTime;
      this.logMetric("Page Load Time", loadTime);
    });

    // First Contentful Paint
    if ("PerformanceObserver" in window) {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            this.metrics.firstContentfulPaint = entry.startTime;
            this.logMetric("First Contentful Paint", entry.startTime);
          }
        }
      });
      paintObserver.observe({ entryTypes: ["paint"] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.largestContentfulPaint = entry.startTime;
          this.logMetric("Largest Contentful Paint", entry.startTime);
        }
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as any;
          this.metrics.firstInputDelay =
            fidEntry.processingStart - entry.startTime;
          this.logMetric("First Input Delay", this.metrics.firstInputDelay);
        }
      });
      fidObserver.observe({ entryTypes: ["first-input"] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        this.metrics.cumulativeLayoutShift = clsValue;
        this.logMetric("Cumulative Layout Shift", clsValue);
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    }
  }

  private logMetric(name: string, value: number) {
    console.log(`Performance Metric - ${name}:`, value.toFixed(2), "ms");

    // Send to analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "performance_metric", {
        metric_name: name,
        metric_value: value,
        page: window.location.pathname,
      });
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Custom performance marks
  mark(name: string) {
    if (typeof window !== "undefined" && performance.mark) {
      performance.mark(name);
    }
  }

  measure(name: string, startMark: string, endMark: string) {
    if (typeof window !== "undefined" && performance.measure) {
      try {
        const measure = performance.measure(name, startMark, endMark);
        this.logMetric(name, measure.duration);
        return measure.duration;
      } catch (error) {
        console.warn("Performance measure failed:", error);
        return 0;
      }
    }
    return 0;
  }

  // Track component render time
  trackComponentRender(componentName: string, renderTime: number) {
    this.logMetric(`${componentName} Render Time`, renderTime);
  }

  // Track API call performance
  trackAPICall(endpoint: string, duration: number, status: number) {
    const metricName = `API Call - ${endpoint}`;
    this.logMetric(metricName, duration);

    // Log slow API calls
    if (duration > 1000) {
      console.warn(`Slow API call detected: ${endpoint} took ${duration}ms`);
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();
