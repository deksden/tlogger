# RULEZZ.md :: Ключевые Правила и Соглашения Проекта "TLogger"

**Версия Документа:** 0.9.1-wcr
**Дата:** 2025-06-11

## HISTORY
* v0.3.0 (2025-05-18): Обновлено описание CLI опций (--model-identifier), добавлен раздел про статистику AI.
* v0.2.3 (2025-05-15): Добавлена опция `--stats-after-phase` в описание CLI.

## 0. 🎯 Философия и Ключевые Принципы Разработки

- **Итеративность:** Разработка ведется небольшими, управляемыми итерациями. Большие задачи последовательно разбиваются
  на более мелкие для обеспечения качества и предсказуемости.
- **Качество Кода:** Приоритет на читаемость, поддерживаемость, простоту и надежность кода.
- **Консистентность:** Следование единым стандартам во всем проекте (код, документация, коммиты).
- **Документирование:** "Что не документировано, того не существует". Актуальная и полная документация – неотъемлемая
  часть разработки.
- **Тестирование:** Автоматизированное тестирование (юнит, интеграционное) для обеспечения стабильности и корректности
  работы системы.
- **Основные Принципы Кодирования:** DRY (Don't Repeat Yourself), SRP (Single Responsibility Principle), YAGNI (You
  Ain't Gonna Need It). Избегать преждевременной оптимизации и избыточной функциональности "на всякий случай".

## 1. 🗺️ Управление Проектом и Планирование

- **Иерархия Документов Планирования:**
  - общий документ, описывающий систему - это `README.md`
  - **`docs/DOC_DEV.md` (Общий План Разработки):** Содержит высокоуровневое описание основных этапов (**Фазы**)
    проекта. Для каждой Фазы указывается ее статус и краткое описание **Шагов** внутри нее.
  - **`docs/DOC_DEV_BRIEF.md` (Детальный План Текущей Фазы):** Фокусируется на одной, **текущей активной Фазе**. Шаги
    Фазы детализируются до конкретных **Задач**.
    - **Нумерация Задач:** `X.Y.Z` (где X - номер Фазы, Y - номер Шага, Z - номер Задачи).
    - **Архивация:** По завершении Фазы, `DOC_DEV_BRIEF.md` переименовывается (например,
      `DOC_DEV_BRIEF_Phase3_YYYY-MM-DD.md`) и перемещается в `docs/_archive/`. Создается новый `DOC_DEV_BRIEF.md`
      для следующей Фазы.
- **Идентификация Итераций Обсуждения/Исправления:** В рамках одной Задачи (X.Y.Z) для отслеживания решения
  специфических вопросов или мелких доработок используется формат: "Итерация #N (Задача X.Y.Z): Описание". Счетчик N
  сбрасывается для новой проблемы или Задачи.
- **Идентификация Кода по Системам и Подсистемам:**
  - **Формат:** `SYS_АББР_ПРОЕКТА_ПОДСИСТЕМА[_ВЛОЖЕННАЯ_ПОДСИСТЕМА]`
  - **Примеры:** `SYS_VS_DB` (Vibe Story Database), `SYS_VG_CORE` (Vibe Gen Core).
  - Используется в документации, логах, именах ошибок для улучшения навигации.

## 2. 🌳 Управление Версиями (Git)

- **Ветки:**
  - `main` (или `master`): Стабильная версия.
  - `develop`: Основная ветка разработки.
  - `feature/X.Y.Z-opisanie-fichi`: Ветки для новых фич (X.Y.Z - номер задачи).
  - `fix/X.Y.Z-issue-description`: Ветки для исправления багов.
- **Коммиты:**
  - Атомарные и логически завершенные.
  - Осмысленные сообщения. Рекомендуемый формат: `Тип(Область): Краткое описание (#X.Y.Z)`.
    - _Типы:_ `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`.
- **Pull Requests (PR):** Обязательны для всех изменений, вливаемых в `develop` и `main`. Требуют ревью.

## 3. ✍️ Стиль и Организация Кода

- **Язык:** TypeScript.
- **Стиль Кода:** Standard JavaScript Code Style (ESLint с конфигурацией `eslint-config-love`). **Точки с запятой не
  используются.** Не допускать предупреждений ESLint.
- **Именование Файлов:** `kebab-case.ts` (нижний регистр, слова через дефис).
- **Именование Сущностей Кода:**
  - Переменные, функции: `camelCase`.
  - Классы, интерфейсы, типы: `PascalCase`.
  - Константы: `UPPER_SNAKE_CASE`.
- **Структура Проекта:**
  - Исходный код: `src/`.
  - Тесты: в отдельной папке `test/` (структура повторяет `src/`).
  - Документация: `docs/`.
  - Логическая группировка файлов по подсистемам в директориях.
- **Модульность и Экспорты:**
  - Предпочтение функциям перед классами. Классы используются только при явной необходимости (например, для ошибок
    `SystemError` или если ООП-подход значительно упрощает задачу).
  - Экспорт именованных сущностей (`export const myFunction = ...`).
  - `export default` используется **только** для основного экспорта API-объекта модуля сущности (например,
    `CharacterAPIObject` из `character.api.ts`) или по специальному явному соглашению или требованию фреймворка.
- **Простота и Понятность:**
  - Код должен быть максимально простым и понятным для решения поставленной задачи.
  - Новые сущности (функции, классы, зависимости) добавляются только при обоснованной необходимости и по согласованию
    в плане (`DOC_DEV_BRIEF.md`).
  - Следовать принципам чистых функций, явных входных параметров и предсказуемых результатов, минимизируя побочные
    эффекты.
- **Неизменяемость Данных:** Входные параметры функций не должны модифицироваться напрямую. При необходимости изменения
  создаются новые объекты/массивы.
- **Комментарии в Конце Файла:** В самом конце каждого файла кода добавлять строчку комментария с текстом
  `// END OF: src/path/to/your/file.ts`, а после нее - одну пустую строку.

## 4. 📦 Зависимости и DI (Dependency Injection)

- **Основной Паттерн:** Используется DI для управления зависимостями модулей, что упрощает тестирование и повышает
  гибкость.
- **Реализация:**
  - В каждом модуле, использующем DI, объявляется экспортируемая константа `dependencies` (объект, хранящий
    зависимости).
  - Все функции модуля используют зависимости исключительно из этого объекта.
  - Каждый модуль имеет свой автономный объект `dependencies`
  - Экспортируется функция `setDependencies(newDependencies)` для возможности подмены зависимостей (например, в
    тестах).
  - мы сохраняем имена `dependencies` / `setDependencies` для любого модуля, использующего наше простое DI.
- **Документация по DI:**
  - Общие принципы: `docs/DOC_DI.md`.

## 5. 🚦 Обработка Ошибок (Паттерн SYS_ERRORS)

- **Единая Система:** Все ошибки в приложении должны быть экземплярами класса `SystemError` из пакета
  `@fab33/sys-errors`.
- **Документация по SYS_ERRORS:** `docs/DOC_SYS_ERRORS.md`, где описываются правильные паттерны обработки ошибок (
  цепочка ошибок, ошибка операции, фабрики функции для контроля контекста и тд)
- **Ошибка Операции:**
  - Для каждой ключевой функции (особенно публичного API модуля) определяется специфический код ошибки операции (
    например, `MYMODULE_FUNCTION_X_FAILED`).
  - Создается функция-фабрика для этой ошибки (например, `createMyModuleFunctionXError`).
  - Любая ошибка, возникшая внутри функции (включая ошибки из внешних вызовов), должна быть перехвачена и обернута в
    эту ошибку операции, с передачей оригинальной ошибки в поле `originalError`.
- **JSDoc для Функций:** Должен включать `@throws` с указанием ошибки операции и возможных ошибок в `originalError`.

## 6. 🧾 Логирование (Система SYS_LOGGER)

- **Единая Система:** Используется логгер из пакета `@fab33/sys-logger`.
- **Документация по SYS_LOGGER:** `docs/DOC_SYS_LOGGER.md`.
- **Уровни Логирования:** Использовать семантически корректные уровни:
  - `trace`: Вход/выход из функций, детальные параметры, промежуточные шаги.
  - `debug`: Отладочная информация, значения ключевых переменных, состояние объектов.
  - `info`: Важные события в логике приложения, успешное завершение операций.
  - `warn`: Потенциальные проблемы, некритичные ошибки, нестандартные ситуации.
  - `error`: Ошибки выполнения операций (обычно вместе с объектом ошибки).
  - `fatal`: Критические ошибки, приводящие к невозможности продолжения работы.
- **Контекст:** Включать релевантный структурированный контекст в логи (первый аргумент).
- **Логирование в Моках:** Моки должны использовать логгер теста и явно указывать в сообщениях, что это вывод мока (
  например, `[MOCK myMockFunction] Called with...`).

## 7. 📑 Комментарии и Документирование Кода (JSDoc)

- **Шапка Файла:** Каждый `.ts` файл должен содержать JSDoc-шапку:
  - `@file src/path/to/your/file.ts`
  - `@description Краткое описание назначения файла.`
  - `@version X.Y.Z` (версия файла, независимая)
  - `@date YYYY-MM-DD` (дата последней модификации данной версии файла)
  - `@updated Описание последнего значимого изменения для этой версии файла.`
  - **Секция `HISTORY` (Опционально, но рекомендуется для файлов кода):**
    ```typescript
    /** HISTORY:
     * vA.B.C (YYYY-MM-DD): Краткое описание изменения 1.
     * vA.B.D (YYYY-MM-DD): Краткое описание изменения 2.
     * ... (3-7 последних значимых записей)
     */
    ```
- **Элементы Кода:** Документировать JSDoc все экспортируемые функции, классы, методы, типы, интерфейсы. Внутренние
  сложные или неочевидные функции также могут быть документированы.
- **Для Функций:**
  - `@description` (Подробное описание назначения, ожидаемого поведения, особенностей реализации).
  - `@param` (Для каждого параметра: имя, {тип}, описание).
  - `@returns` ({тип} Описание возвращаемого значения).
  - `@throws` ({ТипОшибки} Описание ошибки и условий ее возникновения).
  - `@feature` (Опционально, для указания специфических фич или поведения).
  - `@deprecated` (Если применимо, с указанием, что использовать взамен).
  - `@deterministic` Если функция детерминирована (для тех же входных данных всегда один результат, без
    побочных эффектов), указать это и объяснить почему.
- **Избыточные Комментарии:** Избегать комментирования очевидной логики. Комментарии должны пояснять _почему_ код
  написан так, а не _что_ он делает, если это не ясно из самого кода.

## 8. 🏛️ Версионирование (Код и Документы)

- **SemVer (Semantic Versioning):** Применяется к версиям файлов кода и документов.
  - `PATCH` (x.y.Z): Обратно-совместимые исправления ошибок.
  - `MINOR` (x.Y.z): Добавление новой функциональности (обратно-совместимое).
  - `MAJOR` (X.y.z): Изменения, нарушающие обратную совместимость.
- **Правило "Девятки":** Версия `0.9.0` при следующем `MINOR` обновлении становится `0.10.0`, а не `1.0.0`. Переход на
  `1.0.0` (мажорная версия) должен быть осознанным решением, означающим стабильный публичный API.
- **Независимость Версий:** Файлы кода, тестов, документов версионируются независимо друг от друга, если не указано
  иное. Версии в шапках файлов отражают состояние именно этого файла.
- **Версия Проекта:** Общая версия проекта управляется в `package.json`.

## 9. 🧪 Тестирование

- **Основные Принципы:**
  - Детальные требования к тестированию изложены в `docs/UNI_TESTZ.md`.
- **Фокус Тестирования:** Тестировать наблюдаемое поведение и конечный результат работы функций/методов, а не внутренние
  детали реализации, если эти детали не являются частью спецификации или ожидаемого поведения.
- **Покрытие:** Стремиться к логическому покрытию всех ключевых позитивных и негативных сценариев использования.
- **DI как Основа Тестируемости**: Принцип DI (см. DOC_DI.md) является основным для обеспечения тестируемости. Все
  внешние зависимости, требующие подмены или контроля в тестах, должны внедряться через объект dependencies модуля.
- **Тест Сигнализирует о Проблемах Кода**: Если написание теста требует сложных конструкций (глубокие моки, vi.spyOn на
  прямые импорты из других модулей, не предоставленные через DI, динамический импорт), это может указывать на
  необходимость рефакторинга тестируемого кода для улучшения его структуры и приведения в полное соответствие с DI, а не
  на усложнение теста.
- **Использование vi.spyOn**:
  - Разрешено: Для методов самого тестируемого объекта или методов на моках, уже внедренных через DI.
  - Нежелательно (Сигнал к Рефакторингу): Для прямых импортов из других модулей, если эти импорты являются логическими
    зависимостями, которые должны управляться через DI.

## 10. 📜 Документация Проекта (Общая)

- **Расположение:** `docs/`.
- **Формат:** Markdown.
- **Заголовок Файла Документа:** Должен включать путь и имя файла в формате:
  `## ИМЯ_ДОКУМЕНТА.md :: Описание Документа (docs/путь/ИМЯ_ДОКУМENTA.md)`.
- **`CHANGELOG.md` (Высокоуровневый Журнал):**
  - **Назначение:** Отражает ключевые этапы развития проекта, добавление значимых фич, архитектурные изменения и
    важные исправления, влияющие на продукт или его основные модули.
  - **Частота Обновления:** По завершении Фаз разработки или крупных Шагов.
  - **Формат:** Группировка по дате, заголовок для этапа/Фазы, категоризированный список изменений (✨ Feature, 🐛 Fix,
    ♻️ Refactor, и т.д.). Может содержать ссылки на архивированные `DOC_DEV_BRIEF_PhaseX.md`.
  - _Не дублирует детальную историю задач из `DOC_DEV_BRIEF.md` или историю коммитов Git._
- Аналогично файлам кода после шапки файла добавляем секцию HISTORY в маркдаун формате, с заголовком второго уровня и
  маркированным списокм версий документа с описанием изменений;
  Пример форматирования:

## 11. 🤖 Взаимодействие с AI-Ассистентом (Рекомендации для Разработчика)

- **Полнота Контекста:**
  - При запросе на работу с файлом, если AI-ассистент не имеет доступа к полному актуальному тексту файла,
    необходимо предоставить ему полный текст. AI не должен работать с файлом на основе предположений или частичной
    информации. Нужно обязательно сказать пользователю что требуемого изменяемого файла нет, и прекратить ответ.
  - Если информация для AI не ясна, недостаточна или есть сомнения, явно сообщить об этом для уточнения.
- **Генерация Кода:**
  - AI-ассистент **всегда** должен генерировать полный текст запрашиваемого файла или функции. Не использовать
    сокращения типа "// остальной код без изменений".
  - Перед генерацией кода (особенно для нескольких файлов или сложных изменений) AI должен предложить план действий
    и/или список изменяемых файлов для согласования, если это не было четко определено пользователем.
- **Следование `RULEZZ.md`:** AI-ассистент должен стремиться генерировать код и документацию в строгом соответствии с
  этим документом.
