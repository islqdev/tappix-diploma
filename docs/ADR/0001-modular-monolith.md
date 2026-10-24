# ADR-0001: Modular Monolith for the Diploma Implementation

Status: Proposed for team review

## Context

Two students need a maintainable multi-tenant system with transactional loyalty
operations. The requested stack is Go, Next.js, PostgreSQL, Redis, Docker and Nginx.
The prior prototype informs requirements but is not replaced by this scaffold.

## Decision

Use one Go API with explicit domain modules and one Next.js application.
Keep authentication, company administration, loyalty, guest wallet, analytics
and subscription entitlements separately owned within the API. Modules use
shared transaction boundaries where an operation requires atomic ledger updates.
Do not add generic repository/service wrappers unless they remove actual complexity.

PostgreSQL is the durable source of truth. Redis stores bounded ephemeral data
and session/rate-limit state; Redis alone must not authorize a stale revoked session
or be the only copy of a durable loyalty operation.

## Alternatives

- Microservices: more independent deployments but introduce cross-service
  transactions and operational work not justified by current evidence.
- Single undifferentiated API package: faster initial setup but obscures ownership
  and makes tenant and transaction rules harder to audit as scope grows.

## Consequences

Module boundaries need enforcement and tests. A single API is not high availability.
Tenant isolation is not automatically guaranteed by this architecture; tests and
database constraints must establish the relevant guarantees per operation.
Precise package layout and API contracts will be proposed in implementation issues.
