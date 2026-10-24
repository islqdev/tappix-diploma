# Verification Plan

The new repository has no application tests yet. Test claims from the prior
prototype do not apply to it automatically.

Run the scaffold checks with `node --test tests/repository.test.mjs` from the
repository root. These cover tracked files and ignore rules, not application
security, arbitrary Markdown syntax, or a comprehensive secret scan. They have
no runtime dependencies beyond Node.js 22 and Git.

Add focused Go and frontend unit tests with their first executable slices.
Then add PostgreSQL integration tests for two-company isolation, ledger consistency,
idempotency and concurrent rewards; role-based browser journeys; limit/trial tests;
and a database-plus-file recovery drill using synthetic attachments.

Do not skip failing checks to make CI green. Load tests run only against a separate
authorized environment with a stated workload, stop condition and resource budget.
