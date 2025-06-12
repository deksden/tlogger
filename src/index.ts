/**
 * @file src/index.ts
 * @description Определяет абстрактный интерфейс логгера и типы конфигурации для экосистемы @fab33.
 * @version 1.1.0
 * @date 2025-06-12
 *
 * HISTORY:
 * v1.1.0 (2025-06-12): Добавлены типы LoggerOptions, TransportOptions и PinoTransport для явной конфигурации.
 * v1.0.3 (2025-06-11): Исправлена ошибка линтера `eol-last`.
 * v1.0.1 (2025-06-11): Добавлены директивы eslint-disable для no-explicit-any в публичном API.
 * v1.0.0 (2025-06-11): Начальная версия пакета.
 */

/** Допустимые уровни логирования. */
export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/** Объект с данными для логирования (bindings). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LogBindings = Record<string, any>;

/**
 * Опции для отдельного транспорта.
 * Расширяемый интерфейс для специфичных настроек каждого транспорта.
 */
export interface TransportOptions {
  level?: LogLevel;
  // Позволяет добавлять любые другие опции, специфичные для транспорта
  [key: string]: unknown;
}

/**
 * Представляет транспорт, который может быть обработан Pino.
 * Это может быть либо готовый поток (stream), либо конфигурация цели (target),
 * которую `pino.transport` будет запускать в отдельном процессе.
 */
export type PinoTransport =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { stream: any; level?: LogLevel }
  | { target: string; options: Record<string, unknown>; level?: LogLevel };

/**
 * Опции для конфигурации всего логгера.
 * Этот объект передается в "чистую" функцию createLogger.
 */
export interface LoggerOptions {
  /** Глобальный минимальный уровень лога. */
  logLevel?: LogLevel;
  /** Массив уже созданных транспортов для pino. */
  transports?: PinoTransport[];
  /**
   * Массив конфигураций для транспортов. Используется оберткой /env
   * для динамического создания транспортов.
   */
  transportsConfig?: Array<TransportOptions & { type: string }>;
  /** Строка для фильтрации по namespace, аналогичная переменной DEBUG. */
  debugString?: string;
}

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
