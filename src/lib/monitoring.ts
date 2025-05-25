// Error monitoring and logging utilities

interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  userId?: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: string;
  url: string;
}

class Monitoring {
  private static instance: Monitoring;
  private errors: ErrorReport[] = [];
  private metrics: PerformanceMetric[] = [];

  static getInstance(): Monitoring {
    if (!Monitoring.instance) {
      Monitoring.instance = new Monitoring();
    }
    return Monitoring.instance;
  }

  // Error tracking
  reportError(error: Error, context?: Record<string, any>): void {
    const errorReport: ErrorReport = {
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      ...context,
    };

    this.errors.push(errorReport);
    
    // Send to monitoring service (implement based on your monitoring solution)
    this.sendErrorToService(errorReport);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reported:', errorReport);
    }
  }

  // Performance tracking
  recordMetric(name: string, value: number): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };

    this.metrics.push(metric);
    this.sendMetricToService(metric);
  }

  // Track Core Web Vitals
  trackWebVitals(): void {
    if (typeof window !== 'undefined') {
      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('LCP', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.recordMetric('FID', entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.recordMetric('CLS', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }

  private async sendErrorToService(error: ErrorReport): Promise<void> {
    try {
      // Implement your error reporting service here
      // Example: Sentry, LogRocket, Rollbar, etc.
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error),
      });
    } catch (e) {
      console.warn('Failed to send error to monitoring service:', e);
    }
  }

  private async sendMetricToService(metric: PerformanceMetric): Promise<void> {
    try {
      // Implement your metrics collection service here
      await fetch('/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric),
      });
    } catch (e) {
      console.warn('Failed to send metric to monitoring service:', e);
    }
  }

  // Get collected data for debugging
  getErrors(): ErrorReport[] {
    return [...this.errors];
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }
}

// Global error handler
export function setupGlobalErrorHandling(): void {
  const monitoring = Monitoring.getInstance();

  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    monitoring.reportError(new Error(event.reason), {
      type: 'unhandledRejection',
    });
  });

  // Global error handler
  window.addEventListener('error', (event) => {
    monitoring.reportError(event.error || new Error(event.message), {
      type: 'globalError',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  // Start tracking web vitals
  monitoring.trackWebVitals();
}

export default Monitoring; 