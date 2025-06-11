/**
 * @file src/index.ts
 * @description Определяет абстрактный интерфейс логгера для экосистемы @fab33.
 * @version 1.0.1
 * @date 2025-06-11
 *
 * HISTORY:
 * v1.0.1 (2025-06-11): Добавлены директивы eslint-disable для no-explicit-any в публичном API.
 * v1.0.0 (2025-06-11): Начальная версия пакета.
 */

/** Допустимые уровни логирования. */
export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/** Объект с данными для логирования (bindings). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LogBindings = Record<string, any>;

/**
 * Абстрактный интерфейс логгера (TLogger - Typed Logger).
 * Определяет API, совместимое с pino и @fab33/fab-logger.
 */
export interface TLogger {
  level: LogLevel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trace (obj: LogBindings, msg?: string, ...args: any[]): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trace (msg: string, ...args: any[]): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug (obj: LogBindings, msg?: string, ...args: any[]): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug (msg: string, ...args: any[]): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info (obj: LogBindings, msg?: string, ...args: any[]): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info (msg: string, ...args: any[]): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn (obj: LogBindings, msg?: string, ...args: any[]): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn (msg: string, ...args: any[]): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error (obj: LogBindings & { err?: Error }, msg?: string, ...args: any[]): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error (error: Error, msg?: string, ...args: any[]): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error (msg: string, ...args: any[]): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fatal (obj: LogBindings & { err?: Error }, msg?: string, ...args: any[]): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fatal (error: Error, msg?: string, ...args: any[]): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fatal (msg: string, ...args: any[]): void;

  child (bindings: LogBindings): TLogger;

  bindings (): LogBindings;

  isLevelEnabled (level: LogLevel): boolean;

  silent (): void;
}

// END OF: src/index.ts
