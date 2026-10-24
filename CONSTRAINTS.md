# Quality Contract

Status: required acceptance criteria; implementation not yet verified.

| ID | Requirement | Required evidence |
| --- | --- | --- |
| SEC-01 | Every tenant operation is scoped using the verified session's company, not a trusted client-supplied ID | Two-company negative API tests for reads, writes, exports, files and analytics |
| SEC-02 | Every role and sensitive action is authorized on the server | Direct API tests bypassing the UI, including blocked companies and revoked sessions |
| LOY-01 | All point changes are ledger entries; cached balance, if any, is only a reconciled projection | Ledger-sum reconciliation and rollback tests |
| LOY-02 | Visit, points and reward mutations are atomic and idempotent | Concurrent and repeated-request integration tests; conflicting payload rejected |
| SEC-03 | No secrets or real customer data in tracked files, logs or test artifacts | Staged-diff review and secret scanning; redacted test data |
| DATA-01 | Database and files can be restored without the original server | Encrypted off-host backup and documented restore drill with attachment checks |
| BILL-01 | Plans and trials do not create fictional payments | Server-side expiry/limit tests and explicit unpaid/paid distinction |
| WEB-01 | Main role workflows remain usable on mobile and keyboard | Browser checks at 390 px and desktop, focus and label checks |
| QA-01 | Failed checks are fixed, not silently disabled or weakened | Lint, type checks, tests and build pass for implemented components |

Performance thresholds, retention periods, recovery point/time objectives and
maximum operating cost must be agreed before their release gates are introduced.
They are not measured results. Claims of complete security or guaranteed revenue
are outside the evidence available at this stage.
