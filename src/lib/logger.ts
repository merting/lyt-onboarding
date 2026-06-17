export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogContext = Record<string, unknown>;

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  service: string;
  [key: string]: unknown;
}

const LOG_LEVEL_RANK: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const DEFAULT_SERVICE = "lyt-onboarding";

function resolveMinLevel(): LogLevel {
  const configured = process.env.LOG_LEVEL?.toLowerCase();
  if (
    configured === "debug" ||
    configured === "info" ||
    configured === "warn" ||
    configured === "error"
  ) {
    return configured;
  }

  return process.env.NODE_ENV === "production" ? "info" : "debug";
}

function shouldLog(level: LogLevel, minLevel: LogLevel): boolean {
  return LOG_LEVEL_RANK[level] >= LOG_LEVEL_RANK[minLevel];
}

function serializeError(error: unknown): LogContext {
  if (error instanceof Error) {
    return {
      errorName: error.name,
      errorMessage: error.message,
      ...(error.stack ? { stack: error.stack } : {}),
    };
  }

  return { errorMessage: String(error) };
}

export interface Logger {
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext): void;
  child(context: LogContext): Logger;
}

export function createLogger(
  scope: LogContext = {},
  options?: { service?: string; minLevel?: LogLevel; write?: (line: string) => void },
): Logger {
  const service = options?.service ?? DEFAULT_SERVICE;
  const minLevel = options?.minLevel ?? resolveMinLevel();
  const write =
    options?.write ??
    ((line: string) => {
      console.log(line);
    });

  function emit(level: LogLevel, message: string, context: LogContext = {}): void {
    if (!shouldLog(level, minLevel)) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      service,
      ...scope,
      ...context,
    };

    write(JSON.stringify(entry));
  }

  return {
    debug: (message, context) => emit("debug", message, context),
    info: (message, context) => emit("info", message, context),
    warn: (message, context) => emit("warn", message, context),
    error: (message, context) => emit("error", message, context),
    child: (context) =>
      createLogger({ ...scope, ...context }, { service, minLevel, write }),
  };
}

export function logError(
  logger: Logger,
  error: unknown,
  message: string,
  context: LogContext = {},
): void {
  logger.error(message, {
    ...context,
    ...serializeError(error),
  });
}

export const logger = createLogger();
