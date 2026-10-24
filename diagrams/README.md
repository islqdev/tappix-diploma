# Диаграммы первой предзащиты

Задача: [DIP-12](https://tappix-diploma.youtrack.cloud/issue/DIP-12).
Схемы описывают план новой дипломной реализации, не доказанное состояние production.

| Схема | Исходник | Экспорт |
| --- | --- | --- |
| System Context | [context.dot](context.dot) | [PNG](context.png), [SVG](context.svg) |
| Use Case | [use-cases.dot](use-cases.dot) | [PNG](use-cases.png), [SVG](use-cases.svg) |
| Component | [components.dot](components.dot) | [PNG](components.png), [SVG](components.svg) |

Пунктир контекстной/компонентной схемы обозначает планируемые подключения либо
контракт, а не выполненную интеграцию. В Use Case пунктир include обозначает
обязательное включение проверки в сценарий. Это компактная схема сценариев
в DOT с UML-подобными обозначениями, не формальная полная UML-модель.

Компания из сессии и серверного членства ограничивает все операции; переданный
клиентом company_id сам по себе не доверенный. Владелец и сотрудник не вправе
начислять в чужой компании. Кошелёк объединяет только доказанно принадлежащие
гостю карты, но не объединяет базы компаний. Платформенный доступ должен иметь
явные права и аудит. QR является идентификатором, а не разрешением на запись.

RLS рассматривается как дополнительный уровень защиты; схемы не утверждают,
что политики уже реализованы. Постоянный отзыв сессий не зависит только от Redis.
Внешнее хранилище пока не подключено, а целевые RPO/RTO требуют испытания.

Воспроизведение из каталога diagrams (Graphviz 16.1.0):

```sh
dot -Tpng -Gdpi=160 context.dot -o context.png
dot -Tsvg context.dot -o context.svg
dot -Tpng -Gdpi=160 use-cases.dot -o use-cases.png
dot -Tsvg use-cases.dot -o use-cases.svg
dot -Tpng -Gdpi=160 components.dot -o components.png
dot -Tsvg components.dot -o components.svg
```

Схема данных и миграции остаются отдельной DIP-7, они не реализованы этими рисунками.
