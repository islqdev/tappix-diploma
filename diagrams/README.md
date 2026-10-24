# Architecture diagrams

Proposed design for the new diploma implementation, not evidence of deployment.
Editable Graphviz DOT sources and PNG/SVG exports are included.

## System context

![System context](context.png)

[DOT](context.dot) · [SVG](context.svg)

## Use cases

![Role use cases](use-cases.png)

[DOT](use-cases.dot) · [SVG](use-cases.svg)

## Components

![Component architecture](components.png)

[DOT](components.dot) · [SVG](components.svg)

The Go API enforces company and role boundaries. PostgreSQL is authoritative for
ledger and business records; Redis provides session and temporary state.
Independent encrypted backups and restoration are planned requirements.

Regenerate with Graphviz, for example:

```sh
dot -Tpng context.dot -o context.png
dot -Tsvg context.dot -o context.svg
```

These English diagrams replace the earlier presentation. See the
[report](../docs/report/README.md) for assumptions and evaluation.
