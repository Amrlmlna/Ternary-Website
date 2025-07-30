// Logging utility for application monitoring

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  error?: Error;
  userId?: string;
  sessionId?: string;
  requestId?: string;
  method?: string;
  url?: string;
  userAgent?: string;
  ip?: string;
  statusCode?: number;
  duration?: number;
  contentLength?: string;
}

class Logger {
  private logLevel: LogLevel = LogLevel.INFO;
  private isDevelopment: boolean = process.env.NODE_ENV === "development";

  constructor() {
    // Set log level from environment
    const envLogLevel = process.env.LOG_LEVEL?.toUpperCase();
    if (
      envLogLevel &&
      LogLevel[envLogLevel as keyof typeof LogLevel] !== undefined
    ) {
      this.logLevel = LogLevel[envLogLevel as keyof typeof LogLevel];
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel;
  }

  private formatMessage(entry: LogEntry): string {
    const timestamp = entry.timestamp;
    const level = LogLevel[entry.level];
    const message = entry.message;
    const context = entry.context
      ? ` | Context: ${JSON.stringify(entry.context)}`
      : "";
    const error = entry.error ? ` | Error: ${entry.error.message}` : "";
    const metadata =
      entry.userId || entry.sessionId || entry.requestId
        ? ` | Metadata: ${JSON.stringify({
            userId: entry.userId,
            sessionId: entry.sessionId,
            requestId: entry.requestId,
          })}`
        : "";

    return `[${timestamp}] ${level}: ${message}${context}${error}${metadata}`;
  }

  private log(
    level: LogLevel,
    message: string,
    options: Partial<LogEntry> = {}
  ) {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...options,
    };

    const formattedMessage = this.formatMessage(entry);

    // Console output
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(formattedMessage);
        if (entry.error?.stack) {
          console.error(entry.error.stack);
        }
        break;
    }

    // Send to external logging service in production
    if (!this.isDevelopment) {
      this.sendToExternalService(entry);
    }
  }

  private sendToExternalService(entry: LogEntry) {
    // Example: Send to external logging service
    // This is a placeholder - replace with your preferred logging service

    // Example for Sentry
    if (typeof window !== "undefined" && (window as any).Sentry) {
      const Sentry = (window as any).Sentry;
      if (entry.level >= LogLevel.ERROR) {
        Sentry.captureException(entry.error || new Error(entry.message), {
          extra: entry.context,
          user: entry.userId ? { id: entry.userId } : undefined,
          tags: {
            level: LogLevel[entry.level],
            sessionId: entry.sessionId,
            requestId: entry.requestId,
          },
        });
      } else {
        Sentry.captureMessage(entry.message, {
          level: LogLevel[entry.level] === "ERROR" ? "error" : "info",
          extra: entry.context,
          tags: {
            sessionId: entry.sessionId,
            requestId: entry.requestId,
          },
        });
      }
    }

    // Example for LogRocket
    if (typeof window !== "undefined" && (window as any).LogRocket) {
      (window as any).LogRocket.track(entry.message, {
        level: LogLevel[entry.level],
        ...entry.context,
      });
    }

    // Example for custom API endpoint
    if (process.env.LOG_API_ENDPOINT) {
      fetch(process.env.LOG_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      }).catch((error) => {
        console.error("Failed to send log to external service:", error);
      });
    }
  }

  // Public logging methods
  debug(
    message: string,
    context?: Record<string, any>,
    options?: Partial<LogEntry>
  ) {
    this.log(LogLevel.DEBUG, message, { context, ...options });
  }

  info(
    message: string,
    context?: Record<string, any>,
    options?: Partial<LogEntry>
  ) {
    this.log(LogLevel.INFO, message, { context, ...options });
  }

  warn(
    message: string,
    context?: Record<string, any>,
    options?: Partial<LogEntry>
  ) {
    this.log(LogLevel.WARN, message, { context, ...options });
  }

  error(
    message: string,
    error?: Error,
    context?: Record<string, any>,
    options?: Partial<LogEntry>
  ) {
    this.log(LogLevel.ERROR, message, { error, context, ...options });
  }

  fatal(
    message: string,
    error?: Error,
    context?: Record<string, any>,
    options?: Partial<LogEntry>
  ) {
    this.log(LogLevel.FATAL, message, { error, context, ...options });
  }

  // Specialized logging methods
  logAuthEvent(event: string, userId?: string, context?: Record<string, any>) {
    this.info(`Auth Event: ${event}`, context, { userId });
  }

  logAPICall(
    endpoint: string,
    method: string,
    status: number,
    duration: number,
    context?: Record<string, any>
  ) {
    const level = status >= 400 ? LogLevel.ERROR : LogLevel.INFO;
    this.log(level, `API Call: ${method} ${endpoint}`, {
      context: {
        ...context,
        status,
        duration,
      },
    });
  }

  logPerformance(metric: string, value: number, context?: Record<string, any>) {
    this.info(`Performance: ${metric}`, {
      ...context,
      value,
    });
  }

  logUserAction(
    action: string,
    userId?: string,
    context?: Record<string, any>
  ) {
    this.info(`User Action: ${action}`, context, { userId });
  }

  logSecurityEvent(
    event: string,
    userId?: string,
    context?: Record<string, any>
  ) {
    this.warn(`Security Event: ${event}`, context, { userId });
  }

  // Request logging middleware
  logRequest(req: any, res: any, next?: any) {
    const startTime = Date.now();
    const requestId = Math.random().toString(36).substr(2, 9);

    // Log request start
    this.info(`Request Started: ${req.method} ${req.url}`, {
      method: req.method,
      url: req.url,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      requestId,
    });

    // Log response
    res.on("finish", () => {
      const duration = Date.now() - startTime;
      const level = res.statusCode >= 400 ? LogLevel.ERROR : LogLevel.INFO;

      this.log(level, `Request Completed: ${req.method} ${req.url}`, {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration,
        contentLength: res.get("content-length"),
        requestId,
      });
    });

    if (next) next();
  }
}

export const logger = new Logger();

// Convenience functions
export const log = {
  debug: logger.debug.bind(logger),
  info: logger.info.bind(logger),
  warn: logger.warn.bind(logger),
  error: logger.error.bind(logger),
  fatal: logger.fatal.bind(logger),
};
