# @fab33/tlogger

[![npm version](https://badge.fury.io/js/%40fab33%2Ftlogger.svg)](https://badge.fury.io/js/%40fab33%2Ftlogger)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Абстрактный, типизированный интерфейс логгера (`TLogger`) для экосистемы `@fab33`.

## 🎯 Назначение

Этот пакет не содержит реализации. Его единственная цель — предоставить общий, легковесный интерфейс `TLogger`, которому
должны соответствовать все логгеры в экосистеме `@fab33`.

Это позволяет другим пакетам зависеть от этого простого интерфейса, а не от конкретной реализации логгера, что
способствует слабой связности и улучшает тестируемость.

## 📥 Установка

```bash
npm install @fab33/tlogger
```

## 🛠️ Использование

Вы используете этот пакет для аннотации типов в ваших функциях или классах, которые принимают логгер в качестве
зависимости.

```typescript
import type { TLogger, LogLevel } from '@fab33/tlogger';

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

// При инициализации вы можете передать любую реализацию,
// соответствующую интерфейсу TLogger (например, @fab33/fab-logger).
import { createLogger } from '@fab33/fab-logger';

const mainLogger = createLogger('my-app:my-module');
const myService = new MyService(mainLogger);

myService.doSomething({ id: 123 });
```
