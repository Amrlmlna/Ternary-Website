// Analytics utility for tracking user interactions

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: number;
}

class Analytics {
  private isEnabled: boolean = false;
  private userId?: string;

  constructor() {
    // Enable analytics in production
    this.isEnabled = process.env.NODE_ENV === "production";
  }

  setUser(userId: string) {
    this.userId = userId;
  }

  track(event: string, properties?: Record<string, any>) {
    if (!this.isEnabled) {
      console.log("Analytics Event:", event, properties);
      return;
    }

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      userId: this.userId,
      timestamp: Date.now(),
    };

    // Send to analytics service (e.g., Google Analytics, Mixpanel, etc.)
    this.sendToAnalytics(analyticsEvent);
  }

  private sendToAnalytics(event: AnalyticsEvent) {
    // Implementation for sending to analytics service
    // This is a placeholder - replace with your preferred analytics service

    // Example for Google Analytics 4
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", event.event, {
        ...event.properties,
        user_id: event.userId,
        timestamp: event.timestamp,
      });
    }

    // Example for Mixpanel
    if (typeof window !== "undefined" && (window as any).mixpanel) {
      (window as any).mixpanel.track(event.event, {
        ...event.properties,
        distinct_id: event.userId,
        time: event.timestamp,
      });
    }
  }

  // Predefined events
  trackPageView(page: string) {
    this.track("page_view", { page });
  }

  trackSignUp(method: string) {
    this.track("sign_up", { method });
  }

  trackSignIn(method: string) {
    this.track("sign_in", { method });
  }

  trackPurchase(plan: string, amount: number) {
    this.track("purchase", { plan, amount });
  }

  trackFeatureUsage(feature: string) {
    this.track("feature_usage", { feature });
  }

  trackError(error: string, context?: string) {
    this.track("error", { error, context });
  }
}

export const analytics = new Analytics();
