# Initial Requirements

Source: the team's project brief. Status: draft for team/supervisor review.

| ID | Priority | Capability | Acceptance scenario |
| --- | --- | --- | --- |
| FR-01 | Must | Platform-only company provisioning | Owner cannot create another company through a direct API call |
| FR-02 | Must | Roles and tenant isolation | Company A cannot read or mutate B's resources by changing an ID |
| FR-03 | Must | Visit-based rewards | The threshold visit enables one reward; concurrent retries do not duplicate it |
| FR-04 | Must | Points ledger | Credit/debit operations are atomic; the computed balance matches ledger entries |
| FR-05 | Must | Guest wallet | A verified guest can access their cards from multiple companies; no company receives another's data |
| FR-06 | Must | Owner metrics | Named metric definitions reproduce totals from synthetic visits and reward events |
| FR-07 | Must | Plans, custom limits and trial | Effective limits and usage agree in API/UI; expiry is enforced server-side |
| FR-08 | Must | Staff and branches | Staff can be assigned only to branches in their own company |
| FR-09 | Should | Discount program | Eligible discount is displayed with its program rules; no monetary payment is recorded |
| FR-10 | Must | Recovery | Restore database and files in an isolated environment and verify linked attachments |

Security and quality requirements: [CONSTRAINTS.md](../../CONSTRAINTS.md).
Each implementation issue must name the requirement IDs it proves.

## Decisions Needed Before Implementation

- Guest identity verification and account recovery method, including delivery cost.
- Reward rollover, refunds/corrections and point expiry semantics.
- Trial start event, end-boundary timezone and post-expiry access policy.
- Retention, privacy documents and who legally operates the service.
- Pilot workload, availability targets and acceptable data-loss/recovery windows.

These are unresolved decisions, not hidden defaults or completed functionality.
