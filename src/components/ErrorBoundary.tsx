import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);

    // Log error to analytics or error tracking service
    if (typeof window !== "undefined") {
      // Example: Send to error tracking service
      // analytics.trackError(error.message, errorInfo.componentStack)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  handleGoHome = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center neu-bg">
          <div className="neu-shadow neu-radius p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 neu-shadow-inset neu-radius flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} className="text-red-500" />
            </div>

            <h2 className="text-2xl font-bold text-[var(--neu-text)] mb-4">
              Oops! Terjadi Kesalahan
            </h2>

            <p className="text-[var(--neu-text)] opacity-70 mb-6">
              Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi atau
              kembali ke beranda.
            </p>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm font-medium text-[var(--neu-text)] mb-2">
                  Error Details (Development)
                </summary>
                <pre className="text-xs text-red-500 bg-red-50 p-3 rounded overflow-auto">
                  {this.state.error.message}
                  {"\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="neu-btn-accent flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} />
                Coba Lagi
              </button>

              <button
                onClick={this.handleGoHome}
                className="neu-btn flex items-center justify-center gap-2"
              >
                <Home size={16} />
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
