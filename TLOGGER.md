# Документация: @fab33/tlogger

Этот документ предоставляет подробное описание интерфейса `@fab33/tlogger`.

## 🎯 Назначение

Этот пакет не содержит реализации. Его единственная цель — предоставить общий, легковесный интерфейс `TLogger` и связанные с ним типы конфигурации, которым должны соответствовать все логгеры в экосистеме `@fab33`.

Это позволяет другим пакетам зависеть от этого простого интерфейса, а не от конкретной реализации логгера, что способствует слабой связности и улучшает тестируемость.

## 📥 Установка

```bash
npm install @fab33/tlogger```

## 🛠️ Использование

Вы используете этот пакет для аннотации типов в ваших функциях или классах, которые принимают логгер в качестве зависимости, а также для описания конфигурации.

```typescript
import type { TLogger, LoggerOptions, PinoTransport } from '@fab33/tlogger';
// import { createLogger } from 'some-logger-implementation';

class MyService {
  private logger: TLogger;

  constructor (logger: TLogger) {
    // Создаем дочерний логгер для нашего сервиса
    this.logger = logger.child({ service: 'MyService' });
  }

  public doSomething (data: any): void {
    this.logger.info({ data }, 'Doing something...');
    if (!data) {
      this.logger.warn('Received empty data.');
    }
  }
}

// Пример создания конфигурации логгера вручную
// const transport: PinoTransport = { target: 'pino-pretty', options: {}, level: 'info' };
// const loggerOptions: LoggerOptions = { transports: [transport] };
// const mainLogger = createLogger('my-app', loggerOptions);
// const myService = new MyService(mainLogger);

// myService.doSomething({ id: 123 });
```

## 📚 API Reference

### Типы конфигурации

#### `LoggerOptions`
Главный объект конфигурации, который передается в функцию создания логгера.
- `logLevel?: LogLevel`: Глобальный минимальный уровень лога.
- `transports?: PinoTransport[]`: Массив уже созданных транспортов для `pino`.
- `transportsConfig?: (TransportOptions & { type: string })[]`: Массив конфигураций для транспортов. Используется обертками для динамического создания.
- `debugString?: string`: Строка для фильтрации по `namespace`, аналогичная `process.env.DEBUG`.

#### `PinoTransport`
Объект, представляющий транспорт, совместимый с Pino.
- `{ stream: NodeJS.WritableStream; level?: LogLevel }` - Для транспортов, работающих как поток.
- `{ target: string; options: object; level?: LogLevel }` - Для транспортов, запускаемых в отдельном процессе.

#### `TransportOptions`
Базовый интерфейс для опций конкретного транспорта.
- `level?: LogLevel`
- `[key: string]: unknown`

### `TLogger` Interface

Абстрактный интерфейс логгера, совместимый с `pino`.

- `level: LogLevel`: Текущий уровень логирования.
- `trace(obj, msg?, ...args)` / `trace(msg, ...args)`: Логирование на уровне 'trace'.
- `debug(obj, msg?, ...args)` / `debug(msg, ...args)`: Логирование на уровне 'debug'.
- `info(obj, msg?, ...args)` / `info(msg, ...args)`: Логирование на уровне 'info'.
- `warn(obj, msg?, ...args)` / `warn(msg, ...args)`: Логирование на уровне 'warn'.
- `error(obj, msg?, ...args)` / `error(err, msg?, ...args)` / `error(msg, ...args)`: Логирование на уровне 'error'.
- `fatal(obj, msg?, ...args)` / `fatal(err, msg?, ...args)` / `fatal(msg, ...args)`: Логирование на уровне 'fatal'.
- `child(bindings: LogBindings): TLogger`: Создает дочерний логгер с унаследованными и новыми привязками (bindings).
- `bindings(): LogBindings`: Возвращает текущие привязки логгера.
- `isLevelEnabled(level: LogLevel): boolean`: Проверяет, включен ли указанный уровень логирования.
- `silent(): void`: Отключает логирование.

### `LogLevel` Type

Тип, определяющий допустимые уровни логирования:
`'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'`

### `LogBindings` Type

Объект с данными для логирования (ключ-значение):
`Record<string, any>`
