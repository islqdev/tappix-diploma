# Tappix Diploma

Multi-tenant digital loyalty platform for small businesses in Kazakhstan.

**Русский:** Разработка информационной системы управления взаимодействием
предприятий малого бизнеса с клиентами на основе цифровых программ лояльности.

**English:** Development of an Information System for Managing Customer
Relationships in Small Businesses Through Digital Loyalty Programs.

**Қазақша:** Цифрлық адалдық бағдарламалары негізінде шағын бизнес
кәсіпорындарының клиенттермен өзара қарым-қатынасын басқаруға арналған
ақпараттық жүйені әзірлеу.

## Status and Scope

New diploma implementation based on the existing Tappix prototype. This repository
starts with project documentation, not a production application. Existing prototype
history, customer data, credentials, and deployment files are not copied here.
Any later reuse must be identified in its PR, with its origin and tests.

The proposed problem is fragmented tracking of guest visits and rewards using
paper cards or manual records. Its frequency, business impact, demand, and willingness
to pay still require evidence from real businesses. Increased sales are not a claim.

Planned users and outcomes:

- Platform administrator: create companies, assign plans, features, custom limits,
  and a seven-day trial. Assigned plans do not imply received payments.
- Owner: manage branches, staff, loyalty programs, customer metrics, and usage limits.
- Employee: record visits and award or redeem rewards within their own company.
- Guest: keep separate loyalty cards from several businesses in one wallet.
  This is not a payment wallet; reward points are not money.

## Team

| Member | Responsibility |
| --- | --- |
| Исламбеков Армат Кайратович | Next.js, React, TypeScript, UX and charts |
| Камбеков Ерсұлтан Болатбекұлы | Go, PostgreSQL, Redis, Docker, Nginx and CI/CD |

Supervisor: Айтмұханбетова Эльвира Айтмұханбетқызы (from the application).
First pre-defense submission: 24 October 2026, confirmed by Armat.
Later milestones and the supervisor's account for private access remain unconfirmed.
Ersultan7 has accepted GitHub collaborator access; peer review is still required.

## Structure

| Directory | Purpose |
| --- | --- |
| `backend/` | Go API, domain rules and database migrations |
| `frontend/` | Next.js, React and TypeScript interface |
| `docs/` | Proposal, literature, comparisons, requirements and ADRs |
| `diagrams/` | Editable diagram sources and generated exports |
| `tests/` | Cross-component and repository checks |
| `infra/docker/` | Container and development environment configuration |
| `infra/nginx/` | Reverse proxy configuration |
| `tasks/` | Bootstrap plan and index of real YouTrack tasks |

## Links

- Repository: https://github.com/islqdev/tappix-diploma
- YouTrack: https://tappix-diploma.youtrack.cloud/projects/DIP/issues
- Kanban: https://tappix-diploma.youtrack.cloud/agiles/204-1/218-1
- [Proposal](docs/proposal/README.md)
- [Requirements](docs/requirements/README.md)
- [Architecture decision](docs/ADR/0001-modular-monolith.md)
- [Evidence register](docs/literature/README.md)
- [Comparisons](docs/comparisons/README.md)
- [First pre-defense report](docs/report/README.md)
- [Submission criteria](docs/report/submission-checklist.md)
- [Static prototype](docs/prototype/README.md)
- [Diagrams](diagrams/README.md)
- [Evaluation plan](docs/requirements/evidence-and-evaluation.md)
- [Work plan](tasks/plan.md)
- [Contribution rules](CONTRIBUTING.md)

## Run and Test

Repository checks (Node.js 22 and Git, no npm dependencies required):

```sh
node --check tests/repository.test.mjs
node --test tests/repository.test.mjs
```

The checks validate directory structure, basic local Markdown links, ignore rules,
common forbidden tracked artifacts and text whitespace. They do not establish
application correctness or prove the absence of secrets. New test files must be
staged before running checks that inspect the Git index.

The application, Docker environment, and application test suites have not been
implemented in this new repository. Their tasks must be completed before a runnable
release is claimed. No command here points to the working prototype's database.

## Release Boundaries

Tenant isolation, transactional ledger operations, idempotency, permission checks,
session revocation, external backups, and restore drills are release requirements,
not guarantees provided by this scaffold. See [quality requirements](CONSTRAINTS.md).

No interviews, pilot results, supervisor reviews, or completed implementation tasks
are implied by the presence of these documents.
