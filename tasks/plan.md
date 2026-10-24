# Bootstrap Plan

## Current State

Private remote repository created: https://github.com/islqdev/tappix-diploma
YouTrack project: https://tappix-diploma.youtrack.cloud/projects/DIP/issues
Kanban: https://tappix-diploma.youtrack.cloud/agiles/204-1/218-1
The existing Tappix prototype remains separate and unchanged by this work.

## First Stage

1. DIP-1: establish GitHub ownership, YouTrack project and initial Git safeguards.
2. DIP-2: submit project documentation as a separate task branch and PR.
3. DIP-3: add repository checks in CI, without claiming application test coverage.
4. DIP-4: add an executable Go health slice with tests and CI.
5. DIP-5: add an executable Next.js shell and tests.
6. DIP-6: add isolated Docker/Nginx configuration and integration smoke tests.

Canonical task tracker: YouTrack. The links below point to created issues.
Do not fabricate completed states, dates, reviews or pilot evidence.

## Risks and Open Inputs

- GitHub CLI identity is verified as `islqdev`; local Git uses its noreply email.
- YouTrack was activated by the account owner; the current account is `admin`.
- Teammate GitHub/YouTrack account and supervisor access are not yet confirmed.
- No university milestone deadlines are provided; proposed task estimates below
  are relative durations, not agreed dates or retrospective work records.
- Proposal PDF refers to the previous Web-GIS topic; it needs a separately reviewed
  update. Signed approvals and real personal data do not belong in the code repository.

## Task Index

| Issue | Responsible member | Deliverable | Proposed duration | Depends on |
| --- | --- | --- | --- | --- |
| [DIP-1](https://tappix-diploma.youtrack.cloud/issue/DIP-1) | Armat | Private GitHub and YouTrack; initial Git safeguards | 24 October 2026, proposed | None |
| [DIP-2](https://tappix-diploma.youtrack.cloud/issue/DIP-2) | Armat | README, requirements, scope and PR workflow | 1 working day | DIP-1 |
| [DIP-3](https://tappix-diploma.youtrack.cloud/issue/DIP-3) | Yersultan | Repository checks and CI | 1 working day | DIP-2 |
| [DIP-4](https://tappix-diploma.youtrack.cloud/issue/DIP-4) | Yersultan | Go health endpoint and tests | 1 working day | DIP-2, DIP-3 |
| [DIP-5](https://tappix-diploma.youtrack.cloud/issue/DIP-5) | Armat | Next.js shell and tests | 2 working days | DIP-2, DIP-3, DIP-4 contract |
| [DIP-6](https://tappix-diploma.youtrack.cloud/issue/DIP-6) | Yersultan | Isolated Docker/Nginx environment | 1 working day | DIP-4, DIP-5 |
| [DIP-7](https://tappix-diploma.youtrack.cloud/issue/DIP-7) | Yersultan | Schema, ER diagram and migrations | Estimate after rules review | DIP-2, DIP-6 |
| [DIP-8](https://tappix-diploma.youtrack.cloud/issue/DIP-8) | Armat | Literature, comparisons and evaluation plan | Agree with supervisor | DIP-2 |

Detailed acceptance criteria live in YouTrack. Responsible members are the brief's
ownership assignments, not claims that someone
has completed or personally reviewed AI-prepared work. Confirm actual assignees and
calendar deadlines in YouTrack with both students.

## Exit Checkpoint

- [ ] Both students have separate verified accounts and access.
- [ ] Real issues link to real commits/PRs.
- [ ] Bootstrap/documentation PR received peer review.
- [ ] Go API and Next.js shell run with isolated dependencies.
- [ ] Lint, tests and builds pass in CI.
- [ ] Working prototype data and history are untouched.

Later stages follow the supplied plan: schema, auth/isolation, loyalty, role workflows,
plans/trials, operational verification and real pilots. Break them into testable
issues after the first-stage architecture and contracts are reviewed.
