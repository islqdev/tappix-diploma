# Verification Plan

The new repository has no application tests yet. Test claims from the prior
prototype do not apply to it automatically.

Add focused Go and frontend unit tests with their first executable slices.
Then add PostgreSQL integration tests for two-company isolation, ledger consistency,
idempotency and concurrent rewards; role-based browser journeys; limit/trial tests;
and a database-plus-file recovery drill using synthetic attachments.

Do not skip failing checks to make CI green. Load tests run only against a separate
authorized environment with a stated workload, stop condition and resource budget.
