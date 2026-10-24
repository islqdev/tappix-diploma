# Tappix first pre-defense report

English revision, 24 October 2026. 26 pages; 12 scientific studies and 14 official sources.

[PDF](en/Tappix-Pre-Defense-Report-EN.pdf) · [Editable Word](en/Tappix-Pre-Defense-Report-EN.docx)

First pre-defense report

Development of an Information System for Managing Customer Relationships in Small Businesses Through Digital Loyalty Programs.

Armat Islambekov • Yersultan Kambekov
Supervisor: Elvira Aitmukhanbetova
24 October 2026

### Executive summary

At a café counter, a guest may have a card but neither the guest nor the cashier can easily tell which visit was last recorded. Tappix is our proposal for that small moment: a digital card, a staff confirmation step and a record the owner can inspect. The same design must work across cafés, bakeries and salons while keeping each business's data separate. An administrator would assign access and a seven-day trial.

For this milestone we prepared requirements, a literature review, product and technology comparisons, architecture diagrams and a plan for testing. The six screens later in this report are new static concepts. They explain the intended flow; they are not evidence that the diploma implementation already runs.

The difficult part is not drawing a card with six circles. We need to ensure that a visit is credited once, that a reward cannot be redeemed twice and that a cashier in one business never sees another business's guests. We have not yet measured whether owners want this service or will pay for it.

### Reading guide

| Part | Pages | Purpose |
| --- | --- | --- |
| Research and scope | 2–7 | Problem, 12 research studies, alternatives and choices |
| System design | 8–12 | Requirements, safeguards and architecture |
| Concept prototype | 13–16 | Guest, staff, owner and administrator journeys |
| Evaluation and delivery | 17–22 | Experiments, work plan, criteria and 26 references |
| Design discussions | 23–26 | AI role simulations and response to teacher feedback |

Revision of 24 October 2026: expanded scientific review and explicit links between evidence, design choices and evaluation. The appendix contains AI-simulated discussions, not participant interviews. Teacher feedback is recorded separately from the simulated adviser dialogue.

## 01  Problem and project scope

We chose one end-to-end path to design first: a guest opens a card, staff confirm a visit, a reward becomes available, and the owner can account for the event.

### Problem and research question

Consider a guest who loses a paper card after several visits. The cashier may trust the guest but cannot check a shared history; the owner may later find it hard to reconcile a redeemed reward. A digital record could help, but it also creates new work if scanning fails or the customer cannot recover an account. These are scenarios we need to check with real businesses in Kazakhstan, not findings from interviews.

Our research question is practical: can a small business replace a paper or manual loyalty process with a web system whose records are correct, whose company boundaries hold, and whose counter workflow staff can actually use? The diploma contribution will be the implemented system and a reproducible evaluation of those properties, rather than a new loyalty algorithm.

| User | Primary task | Access boundary |
| --- | --- | --- |
| Platform administrator | Provision companies, plans, limits and trials | Explicit platform permissions with audit records |
| Business owner | Manage programme, branches, team and metrics | Resources of their own company |
| Staff member | Identify a card, confirm a visit, redeem a reward | Assigned company, branch and allowed operations |
| Guest | View own cards, progress and activity | Cards linked through verified identity |

### Objectives and expected outputs

Study relevant literature and actual service-counter behaviour.

Specify roles, data relationships, API contracts and transaction rules.

Implement visits, rewards and a points ledger with idempotent operations.

Evaluate isolation, concurrency, usability, performance and recovery.

Final outputs should include source code, database migrations, an OpenAPI contract, automated tests, deployment and recovery instructions, and an evaluation report. This milestone provides their design basis.

### Included and deferred

The core includes visit-based rewards, loyalty points, displayed discount rules, a guest wallet, owner metrics and administrator-assigned access. Points are programme units rather than money; the wallet does not hold payment cards. Automated billing, POS integrations, mass paid messaging, AI recommendations and native apps are deferred.

## 02  What loyalty research establishes

Twelve scientific publications inform the design. Their findings do not establish demand for Tappix in Kazakhstan.

### Review method and boundaries

We selected research on programme effectiveness, reward progress, digital engagement and measurement bias. The search combined these themes with loyalty programme and customer retention terms. Publisher abstracts, accessible article sections and author or university copies were checked on 24 October 2026. This is a focused narrative review, not a systematic review with an exhaustive search or a quality-scored study pool.

The register contains twelve scientific publications [S1–S12], three product sources [P1–P3] and eleven technical sources [T1–T11]. Older studies are retained for their experimental or measurement contribution; recent studies add digital and contextual evidence. Where full text was unavailable, conclusions are limited to the accessible abstract and excerpts.

### Participation is not the same as loyalty

Belli et al. [S1] combine 429 effect sizes but separate repeated behaviour from favourable attitudes. Chen et al. [S2] review 131 publications and show how programme design and setting affect interpretation. That matters for our dashboard: issuing 90 cards does not show that 90 people returned. We therefore need event dates and a stated observation period before we call any guest a repeat visitor.

Dorotic et al. [S9] describe why programme findings differ between segments and markets. A salon visit may be months apart while a café visit may happen several times a week. We would mislead an owner if we mixed both businesses into one return-rate figure, so Tappix will calculate company-level measures using an explicit time window.

### Software can record an outcome without causing it

Mittal et al. [S3] report positive associations between satisfaction and customer or firm outcomes across 245 articles, with contextual variation. Liu-Thompkins et al. [S4] examine cognitive, affective and social drivers across 319 studies. These findings make service quality and customer experience relevant context; they do not show that issuing a digital card produces profit.

We will judge the software first by whether it records and retrieves the right events. A dashboard that says '204 visits' must point back to the same 204 eligible visit records. Whether those records help an owner make a better decision is a separate question for a pilot. The interface will not invent an uplift in sales.

### A specific design consequence

FR-06 requires dashboard totals to reproduce a known event dataset. This is a correctness requirement derived by the team, not a result claimed by the marketing studies. A pilot can later investigate whether owners find these measures useful for decisions.

## 03  Progress and digital engagement

### Why the card shows progress

Kivetz et al. [S8] study the goal-gradient mechanism in reward programmes. Nunes and Drèze [S12] show that an endowed start can change persistence even when the remaining effort is unchanged. Both concern how a goal is perceived; neither justifies treating an unearned visit as a real purchase.

We chose a specific example for the card: four confirmed visits towards a reward after the sixth, leaving two visits. It lets a guest understand the rule without interpreting a row of blank circles. A promotional welcome credit would need its own event type; calling it a visit would make the history false. We leave that promotion out of the first build.

### A mobile channel does not remove operational friction

Son and Oh [S5] investigate reward redemption and engagement as loyalty becomes mobile. Their research motivates recording how guests use rewards over time, rather than counting enrolment alone. It does not establish that our web interface is preferable to a native wallet. We choose a link-based card to reduce installation steps and will test whether guests can find it again.

At the counter, the awkward case is a lost response after the server has saved a visit. A cashier who sees only an error may press Confirm again. Our design therefore needs a visible 'checking result' state and a safe retry that returns the first result. We will also test what happens when the camera is unavailable. These choices still need usability checks with real staff.

### Context changes the meaning of activity

Jin et al. [S6] analyse point use around a major external disruption and identify differences between usage groups. Kuikka et al. [S7] examine 45,603 grocery-retailer reviews across pandemic-related periods. These contexts are unlike an independent Kazakhstani café, but they show why an activity change needs an explanation beyond the software launch.

During a pilot we should record promotions, opening hours, programme-rule changes and interruptions. Qualitative comments can explain a frustrating redemption; they cannot substitute for a visit record. Conversely, a visit total cannot explain why a guest abandoned registration.

### Resulting prototype decisions

P02 makes the reward and remaining effort visible. P03 and P04 separate an attempted operation from a confirmed result. P05 separates current available rewards from redemptions within a selected period. These are testable interface decisions, not findings from interviews.

## 04  Measurement and research gap

### The selection problem

Leenheer et al. [S10] account for the fact that people choose whether to join a programme. When that choice is modelled, the estimated effect is smaller. In our setting, regular café guests might be the first to sign up. A simple comparison of registered and unregistered guests would confuse that pre-existing habit with a Tappix effect.

Liu [S11] follows a convenience-store programme over time and finds different responses among initially heavy, moderate and light buyers. A single average can therefore hide which guests changed behaviour. Tappix should retain timestamps and programme versions so later analysis can distinguish existing regulars from newer guests.

### What the first pilot can answer

A first pilot can tell us whether a cashier can complete a visit without help, whether the same visit is recorded once and whether an owner understands the weekly figures. It cannot tell us that customer loyalty improved. A week may include several café visits but no second salon appointment. We need to choose the observation period for each business before drawing conclusions.

For example, 45 repeat cards among 90 active cards in one week yields a 50% within-period repeat share. It says nothing about how many of last month’s guests returned this month. A retention cohort would require a separately specified starting population and follow-up window. The distinction is built into the metric definitions and usability questions.

| Evidence | Design or evaluation consequence |
| --- | --- |
| Programme context and heterogeneity [S1, S2, S9, S11] | Retain company, programme and period context; avoid a universal uplift claim. |
| Progress framing [S8, S12] | Show confirmed progress and explicit reward conditions; test comprehension. |
| Engagement and external changes [S5–S7] | Keep event history and note concurrent operational changes during a pilot. |
| Selection and outcome measurement [S3, S4, S10] | Separate software correctness, reported experience and causal business effects. |

### Applied contribution

The proposed contribution is a small multi-tenant information system whose reward operations and reports can be reproduced and checked. The literature motivates what to measure; it does not resolve local purchasing decisions, willingness to pay or required staff training. The simulated dialogues in Appendix A generate candidate checks for those unresolved questions.

## 05  Existing solutions and alternatives

Comparison method: documentation review of official product pages [P1–P3], not hands-on account testing. “Unverified” does not mean “unavailable”.

| Criterion | Loyverse [P1] | Poster [P2] | Loopy Loyalty [P3] |
| --- | --- | --- | --- |
| Primary workflow | Loyalty within POS | Restaurant POS loyalty | Digital stamp cards |
| Guest enrolment | Name, phone or barcode card | POS entry or customer import | QR or link to mobile Wallet |
| Mechanics | Purchase points and redemption discount | Discounts, bonuses and promotions | Stamps and rewards |
| Staff action | Attach customer to sale | Serve customer at POS | Stamper App |
| Guest view | Points on printed or emailed receipt | Guest web portal unverified | Apple / Google Wallet |
| Analytics | Visits, points and purchase history | Receipts, discounts and guest bonuses | Cards, stamps and rewards |
| Multiple locations | Earn and redeem across account stores | Loyalty-specific location terms unverified | Multi-user and multi-location advertised |
| Data and integrations | Customer import and export | Customer import and campaign export | Zapier and Make advertised |

### Manual alternatives and switching cost

The obvious alternative is to keep using paper. It costs little to start and staff already know it. A spreadsheet is another realistic choice if an owner is willing to enter each visit and manage access manually. We have not timed those workflows in a real venue yet. Tappix has to earn a switch by reducing a specific problem without slowing the queue.

### Proposed position of Tappix

Our proposed difference is a card that opens by link, a short staff flow and reports that explain exactly what they count. The system should fit beside an existing register rather than require a replacement. That is a design intention, not a verified advantage: the product comparison shows that existing services already cover many of the same tasks.

Unverified areas include exact role permissions, Kazakh localisation, complete history exports, plan limits and data-hosting terms. Prices are not compared without matching service scope. Willingness to pay remains an open question.

## 06  Technology decisions

The team selected Go, PostgreSQL and Next.js as a starting point. The alternatives below explain the trade-offs; they are not the result of a fabricated benchmark.

| Decision | Reason in this project | Trade-off |
| --- | --- | --- |
| Go REST API [T5] — selected | Explicit backend boundary; standard HTTP and test tooling | Two implementation languages; maintain validation and OpenAPI |
| Node.js / TypeScript [T6] | A shared language across client and server | Language reuse does not ensure isolation or atomic accounting |
| Python / FastAPI [T7] | Typed request models and generated OpenAPI | Changes the agreed backend ecosystem and ownership |
| PostgreSQL [T1–T2] — selected | Transactions, relational constraints and optional row security | Migrations, indexes and policies require explicit verification |
| MySQL / InnoDB [T3] | Relational transactional alternative | Revisit schema details and tenant-protection strategy |
| MongoDB [T4] | Flexible documents and multi-document transactions | Linked cards, visits and ledger entries need explicit consistency rules |
| Next.js / React [T8–T9] — selected | Framework routing and React-based interface | Avoid duplicating Go business rules in the UI |
| React SPA [T9] | Independent choices for routing and API integration | More application structure decisions to maintain |
| Vue [T10] | Alternative component-based interface model | Revises the agreed frontend ecosystem |

### Supporting infrastructure

Redis [T11] is proposed for sessions, rate limiting and temporary work. PostgreSQL remains the durable record for loyalty events, audit entries and access revocation versions. Redis persistence alone is not the recovery strategy. Docker packages services; Nginx terminates HTTPS and routes requests.

This combination fits the students’ responsibilities and the transactional domain. Performance, operating cost and capacity remain to be measured. If access validation is unavailable, sensitive write operations must fail safely.

## 07  Functional requirements

Must denotes core acceptance; Should denotes a lower-priority capability after the accounting and access-control core is validated.

| ID | Priority | Capability and acceptance criterion |
| --- | --- | --- |
| FR-01 | Must | Only the platform administrator provisions companies. A direct owner API call cannot create another company. |
| FR-02 | Must | Changing an identifier cannot expose or modify another company’s cards, guests, files, branches or reports. |
| FR-03 | Must | A qualifying threshold visit creates one reward entitlement. Concurrent retries do not create duplicate visits or rewards. |
| FR-04 | Must | Point credits and debits produce ledger records atomically. The derived balance agrees with those records. |
| FR-05 | Must | A verified guest can keep cards from several businesses. Each business still sees only its own records. |
| FR-06 | Must | Owner metrics have definitions that reproduce totals from a known synthetic event dataset. |
| FR-07 | Must | Plans, individual overrides and seven-day trials are enforced on the server; UI limits and usage agree with the API. |
| FR-08 | Must | Staff accounts can be assigned only to branches belonging to the same company. |
| FR-09 | Should | The applicable discount is shown with its conditions; it is not recorded as a received payment. |
| FR-10 | Must | A database-and-files backup restores in an isolated environment with linked attachments verified. |

### Business rules that cannot rely on the interface

Scanning a QR code tells the server which card to look up. It does not give the cashier permission to change that card. The server must take the company and staff rights from the authenticated session, then reject a card issued by another company. A guest may see several cards in one wallet, but the businesses must never share a customer database.

### Open decisions before implementation

Agree the guest identity and recovery mechanism, reward rollover, corrections and point expiry. Confirm the trial start event, time boundary and post-expiry access. The concept shows activation as one candidate start event; it is not an approved policy. Data retention and the service operator also remain to be confirmed.

## 08  Quality and protection requirements

These are planned acceptance checks, not claims that the new repository already provides the protections.

| ID | Priority | Evidence required |
| --- | --- | --- |
| NFR-01 | Must | Cross-company negative tests cover every relevant read and write; responses disclose no foreign personal data. |
| NFR-02 | Must | Twenty concurrent repeats with one idempotency key produce one effect. Changed payloads with the same key are rejected. |
| NFR-03 | Must | Two distinct requests competing for one reward cannot redeem it twice; durable state and responses agree. |
| NFR-04 | Must | After logout or company suspension, the old session cannot regain access after reactivation. |
| NFR-05 | Must | Restore database and files; compare record counts, relationships and attachment hashes. |
| NFR-06 | Should | At 360 px width, key flows do not overflow horizontally; keyboard access and labels remain usable. |
| NFR-07 | Should | Proposed write-API target: p95 below 500 ms at 20 concurrent clients, measured under documented conditions. |
| NFR-08 | Must | No real credentials or customer data in the repository; release review also covers history, images and logs. |

### Accounting and session design

Suppose the first visit request commits but the connection breaks before the cashier sees the reply. The cashier retries. We will give the operation a key tied to its company, actor, action and request body, save the result with the visit in one transaction, and return that same result on retry. Locking and database constraints must also prevent two different requests from redeeming one reward.

Durable access versions prevent Redis resets or company reactivation from reviving revoked sessions. Tenant-scoped relational constraints and, where appropriate, row security add protection; neither replaces explicit authorisation. Log sensitive actions without recording tokens or unnecessary personal data.

### Operational boundary

A local backup is useful after an accidental change, but it will not help if the server and its disks disappear together. Before a pilot we need encrypted copies of both the database and uploaded files outside that server, a separately stored recovery key, and a restore on a clean machine. We also need to see a real alert when a copy fails. Those checks have not been completed for this diploma implementation.

## 09  System context

Four user roles interact with one platform. Each business remains a separate tenant.

![Figure 1. Proposed system context.](../../diagrams/context.png)

Figure 1. Proposed system context. Dashed connections represent planned external services.

### Trust boundaries

Owners and staff operate only within their authorised company. Guests see only cards that have been linked through verified identity. The platform administrator has separately authorised provisioning functions and an audit trail. Notification providers receive only the data required for their purpose.

Backups must survive loss of the application host. A snapshot retained by the same provider may help recovery but does not replace a separately controlled, encrypted copy and a verified restore procedure.

## 10  Principal use cases

The central workflow is identify a card, validate access, commit a visit and redeem an available reward.

![Figure 2. Principal use cases and shared checks.](../../diagrams/use-cases.png)

Figure 2. Compact use-case view using UML-like notation in editable DOT. Dashed links denote included checks; this is not a complete formal UML model.

### A deliberate confirmation step

The scanner should first show the card it found, its business and its current progress. Only after the cashier confirms a qualifying visit should the server write an event. Reaching six visits makes a reward available; using the reward later is another action and another record. This distinction lets a guest save the reward for the next visit.

### Failure and correction paths

If the scanned card belongs to another company, staff should see a short refusal without that guest's history. If the network times out, the screen cannot assume either success or failure; it must check the operation and allow a safe retry. A correction should create a traceable reversal instead of erasing the original visit. Who can authorise one is still undecided.

## 11  Component architecture

A modular monolith keeps deployment manageable while separating presentation, authorisation, accounting and reporting.

![Figure 3. Proposed components and durable storage.](../../diagrams/components.png)

Figure 3. Go is the business-rule boundary. Redis is not the authoritative source of balances.

The interface consumes an explicit REST/JSON contract. Reporting aggregates authorised company events using named definitions. Database transactions cover ledger and reward changes; file authorisation is enforced before returning private content. Database schema and migrations remain a separate implementation task.

## 12  Guest experience

New conceptual screens • fictional businesses and sample values • no current-application screenshots

![Figure 4. Guest wallet and visit progress concepts.](../prototype/guest-journey.png)

Figure 4. P01 shows separate loyalty cards; P02 explains the next reward and confirmed progress.

### Interaction intent

A guest could have a café card and a salon card under one login, much like choosing among cards in a wallet. The cards remain separate programmes. On each card we show the reward, confirmed progress and remaining visits in words as well as colour. The history should explain why the count changed, especially after a correction.

These static SVG/PNG designs were created for this report. Buttons are illustrative; identity verification, QR presentation, navigation and history retrieval are not implemented by the images. The production interface may require Russian and Kazakh localisation.

## 13  Staff experience

One qualifying visit and one reward redemption are distinct, auditable operations.

![Figure 5. Staff visit confirmation and reward redemption concepts.](../prototype/staff-journey.png)

Figure 5. P03 begins at 5/6 confirmed visits; the next valid visit enables the reward in P04. P02 shows an earlier 4/6 state.

### States that must be tested

Before submitting, the cashier sees the matched business and the action about to happen. After redemption, the screen should show when it was recorded and remove the available-reward action. A disabled button alone cannot stop a second request from another device; the server must enforce the single redemption.

Test camera denial, a foreign-company card, an expired session, a timeout after commit and simultaneous redemption. An alternative lookup must preserve the same access checks. No real QR credential or customer identity appears in these concepts.

## 14  Owner overview

The dashboard prioritises a small set of defined measures rather than unsupported growth claims.

![Figure 6. Owner overview with synthetic weekly data.](../prototype/05-owner-overview.png)

Figure 6. P05 uses a deliberately constructed example, not measurements from a real business.

| Measure | Definition in the concept |
| --- | --- |
| Confirmed visits | 204 non-cancelled visit events during the selected week. |
| Active guests | 90 unique cards with at least one visit in the period. |
| Repeat guests | 45 of those cards have at least two visits; 45 / 90 = 50%. |
| Rewards redeemed | 12 recorded redemptions during the period; 8 currently available rewards are a separate stock measure. |

We deliberately made the sample chart add up: 18 + 24 + 21 + 30 + 36 + 42 + 33 = 204 visits. These are invented figures for checking the screen, not pilot data. In the working system the owner must see the selected company, branch, timezone and dates, and the total must be reproducible from recorded events.

A period repeat-guest share is not a 30-day retention cohort and does not estimate incremental revenue. With no activity, the dashboard should show an explanatory empty state rather than artificial trends.

## 15  Administrator access

The administrator connects a business, assigns its effective limits and controls the trial period.

![Figure 7. Administrator trial setup concept.](../prototype/06-admin-trial.png)

Figure 7. P06 illustrates a candidate pilot configuration. The displayed quotas are examples, not approved commercial terms.

### Plan and payment are different records

The administrator can grant a trial or assign a plan, but neither action means a payment was received. The interface should show an agreed limit, any business-specific override, current usage and what remains. The Go API must calculate and enforce the effective limit; hiding a button in the browser would not be sufficient.

### Trial boundary and data protection

The concept proposes a seven-day window from activation. The team still needs to approve the start event, timezone boundary and permitted actions after expiry. Expiry must not silently delete customer data. Subsequent blocking and unblocking must not restore previously revoked sessions.

### Prototype scope

The six screens cover the primary four roles. They deliberately omit campaign builders, partner transfers, payment processing, POS integrations and AI features. A complete interaction design still needs enrolment, recovery, empty/error states and accessible keyboard behaviour. Their absence is recorded rather than hidden by a polished appearance.

## 16  Evaluation method

The following thresholds are proposed experiment criteria. No experiment results are reported at this stage.

| Question | Method | Evidence and decision |
| --- | --- | --- |
| Is the problem real? | Discuss recent loyalty tasks with 3–5 owners or staff. Observe the current workflow. | Record actual workarounds, frequency, effort and decision authority; narrow scope if the proposed problem is not present. |
| Is the workflow understandable? | At least five participants attempt card access, visit confirmation, redemption and metric interpretation. Compare with a paper/manual baseline. | Record completion, time, errors and assistance. Proposed next-iteration criterion: 4/5 complete the core flow unaided; any incorrect reward issue triggers redesign. |
| Are tenants isolated? | Use owner, staff and guest roles across two companies; change identifiers in paths, queries and request bodies. | Verify denied responses, absence of foreign fields and unchanged database state. |
| Are writes safe to repeat? | 20 concurrent same-key requests, then 20 different keys for one reward; repeat 50 times. Simulate a response lost after commit. | One intended effect, consistent responses and ledger state; reject changed bodies with reused keys. |
| Is capacity adequate? | 10 synthetic companies × 100 guests, 2 branches and 3 staff each. 2 vCPU / 4 GiB host; separate load generator. | 2-minute warm-up, 10-minute measurement, 3 runs. Report p50/p95/p99, errors, CPU/RAM and DB timings. |
| Can data be recovered? | Restore encrypted database and file backups on an isolated clean environment. | Verify records, relationships and attachment hashes; measure recovery time and backup age. |

### Recovery targets and limits

For a pilot we propose, rather than promise, a maximum data loss of 24 hours and a restoration time of four hours. Daily copies can still lose a day's visits. If that is unacceptable, we must increase backup frequency or archive database logs. We will measure both targets by restoring an encrypted database and file set away from the original server.

### Pilot interpretation

After technical tests, a small pilot with two or three businesses could reveal whether the workflow survives a real shift. We would record promotions, opening hours and staffing alongside visit data, because they affect the numbers. Even a successful pilot of that size would not prove demand across Kazakhstan or a causal rise in sales.

## 17  Work plan and collaboration

The first submission is due 24 October 2026. Dates for subsequent milestones remain to be agreed.

| Tasks | Owner | Deliverable and acceptance |
| --- | --- | --- |
| DIP-1 | Armat | Private repository and YouTrack setup; completed. |
| DIP-2 / 3 | Armat / Yersultan | Documentation and repository CI; PRs await personal peer review. Existing CI material was prepared by Armat with AI. |
| DIP-11 / 12 | Armat | Literature/comparisons and three architecture diagrams; review pending. |
| DIP-13 / 14 | Armat | Concept prototype and report package; updated English edition prepared for review. |
| DIP-4 | Yersultan | Go health slice and contract tests after the repository baseline. |
| DIP-5 | Armat | Next.js shell after baseline and API contract agreement. |
| DIP-6 / 7 | Yersultan | Isolated Docker/Nginx environment, ER model and reversible migrations after domain-rule review. |
| DIP-8 / 9 / 10 | Armat | Evidence, team access/dates and review safeguards; remaining confirmations tracked separately. |

### Responsibilities and honest provenance

We divided the implementation responsibilities by area: Armat will handle the interface, UX and charts; Yersultan will handle the Go service, data stores and deployment configuration. Work is attributed to the account that actually commits or reviews it. Materials prepared with AI under Armat's account do not become Yersultan's personal contribution merely because they fall in his assigned area.

The development repository is github.com/islqdev/tappix-diploma. PRs #1–6 contain the design-stage work and still await a personal review by Yersultan; he has collaborator access through Ersultan7. A separate public repository, github.com/islqdev/tappix-diploma-materials, lets the committee read the report and designs. It does not expose the private development history. The reviewed baseline and submission tag must still be created after the team checks the changes.

### Principal risks

Unconfirmed user need: obtain real discussions and review the scope.

Unsettled identity, reversal and expiry rules: agree before schema/API work.

Scope expansion: defer integrations and AI until the core passes acceptance.

Operational data loss: verify independent backups before a pilot.

The English report and newly drawn concepts are an updated delivery edition. This document does not claim that the revision has already been approved, merged or tagged.

## 18  Submission status and next steps

Materials are mapped to the supplied first-pre-defense requirements; preparation is not the same as university acceptance.

| Requirement | Evidence in this report | Status |
| --- | --- | --- |
| Problem, aim, scope and team | Pages 1–2 and 18 | Prepared |
| 3–5 real discussions or client agreement | Plan on page 17; AI scenarios in Appendix A | Not yet obtained |
| At least 12 sources, including 8 scientific | 12 scientific studies plus 14 official sources; pages 20–22 | Prepared with access limitations |
| 3–5 analogues, 6–10 criteria | 3 products across 8 criteria; manual alternatives included | Prepared |
| 3 technology choices with alternatives | Go, PostgreSQL and Next.js; two alternatives each | Prepared; no benchmark |
| Functional and quality requirements | FR and NFR with priorities and acceptance evidence | Prepared; open rules listed |
| Context, use-case and component diagrams | Editable DOT with PNG/SVG exports | Prepared |
| Principal user-flow prototype | 6 new vector concepts across all four roles | Prepared; static only |
| Evaluation method and baseline | Usability, isolation, concurrency, load and recovery plan | Prepared; not executed |
| Git, tasks, ownership and milestones | Repository and YouTrack; dependencies and risks | Peer review and merge pending |
| Supervisor feedback and response | Teacher comment and response on page 26; adviser role-play separately labelled | Comment received; approval pending |

### What the team should do next

The teacher's two comments were direct: the report looked generated and it needed at least twelve sources. We kept twelve scientific publications and added concrete consequences for the system: what a 'repeat guest' means, why a registered card is not a loyalty result, and why a retry must not award a second visit. Appendix A is an AI exercise to expose possible objections. It does not count as conversations with actual owners, staff or guests.

Yersultan can review the diagrams and requirements with Armat on the same laptop while his laptop is unavailable. Armat may record that discussion under his own account with the exact points checked and who said what. It will not appear as a GitHub review from Ersultan7. The team should resolve any findings before merging; the next development step is one small API and UI path with tests.

This edition replaces the previous Russian report and screenshots for presentation purposes. It does not replace the application, create customer data or establish production readiness.

## 19  Scientific references

Source access was documented on 24 October 2026. Access limitations and project implications are discussed on pages 3–5.

[S1] Belli, A., O’Rourke, A.-M., Carrillat, F. A., Pupovac, L., Melnyk, V., & Napolova, E. (2022). 40 years of loyalty programs: how effective are they? Generalizations from a meta-analysis. Journal of the Academy of Marketing Science, 50, 147–173.

[DOI](https://doi.org/10.1007/s11747-021-00804-z)

[S2] Chen, Y., Mandler, T., & Meyer-Waarden, L. (2021). Three decades of research on loyalty programs: A literature review and future research agenda. Journal of Business Research, 124, 179–197.

[DOI](https://doi.org/10.1016/j.jbusres.2020.11.057)

[S3] Mittal, V., Han, K., Frennea, C., Blut, M., Shaik, M., Bosukonda, N., & Sridhar, S. (2023). Customer satisfaction, loyalty behaviors, and firm financial performance: what 40 years of research tells us. Marketing Letters, 34, 171–187.

[DOI](https://doi.org/10.1007/s11002-023-09671-w)

[S4] Liu-Thompkins, Y., Khoshghadam, L., Attar Shoushtari, A., & Zal, S. (2022). What drives retailer loyalty? A meta-analysis of the role of cognitive, affective, and social factors across five decades. Journal of Retailing, 98(1), 92–110.

[DOI](https://doi.org/10.1016/j.jretai.2022.02.005)

[S5] Son, Y., & Oh, W. (2023). Digitalization of Loyalty: Impacts of Mobile Technology on Reward Redemption and Engagement Level. Journal of Management Information Systems, 40(4), 1301–1327.

[DOI](https://doi.org/10.1080/07421222.2023.2267313)

[S6] Jin, X., Kim, T., & Lee, D. (2024). Spending points during crises: Adaptive behavior on E-loyalty programs. Electronic Commerce Research and Applications, 65, 101408.

[DOI](https://doi.org/10.1016/j.elerap.2024.101408)

## Scientific references continued

Sources S7–S12. DOI links identify the published articles; access may require a university subscription.

[S7] Kuikka, A., Hallikainen, H., Tuominen, S., & Laukkanen, T. (2025). What drives customer loyalty in a pandemic? Semantic analysis of grocery retailers. Electronic Commerce Research, 25, 2205–2240. Published online 2024.

[DOI](https://doi.org/10.1007/s10660-024-09857-y)

[S8] Kivetz, R., Urminsky, O., & Zheng, Y. (2006). The Goal-Gradient Hypothesis Resurrected: Purchase Acceleration, Illusionary Goal Progress, and Customer Retention. Journal of Marketing Research, 43(1), 39–58.

[DOI](https://doi.org/10.1509/jmkr.43.1.39)

[S9] Dorotic, M., Bijmolt, T. H. A., & Verhoef, P. C. (2012). Loyalty programmes: Current knowledge and research directions. International Journal of Management Reviews, 14(3), 217–237.

[DOI](https://doi.org/10.1111/j.1468-2370.2011.00314.x)

[S10] Leenheer, J., van Heerde, H. J., Bijmolt, T. H. A., & Smidts, A. (2007). Do loyalty programs really enhance behavioral loyalty? An empirical analysis accounting for self-selecting members. International Journal of Research in Marketing, 24(1), 31–47.

[DOI](https://doi.org/10.1016/j.ijresmar.2006.10.005)

[S11] Liu, Y. (2007). The long-term impact of loyalty programs on consumer purchase behavior and loyalty. Journal of Marketing, 71(4), 19–35.

[DOI](https://doi.org/10.1509/jmkg.71.4.019)

[S12] Nunes, J. C., & Drèze, X. (2006). The endowed progress effect: How artificial advancement increases effort. Journal of Consumer Research, 32(4), 504–512.

[DOI](https://doi.org/10.1086/500480)

## 20  Product and technical sources

Official documentation supports the comparison and design rationale. Vendor statements are not independent evidence of effectiveness.

[P1] Loyverse Loyalty Program

[https://loyverse.com/en-us/loyalty-program](https://loyverse.com/en-us/loyalty-program)

[P2] Poster Kazakhstan Marketing

[https://joinposter.kz/tour/marketing](https://joinposter.kz/tour/marketing)

[P3] Loopy Loyalty

[https://loopyloyalty.com/](https://loopyloyalty.com/)

[T1] PostgreSQL Transactions

[https://www.postgresql.org/docs/18/tutorial-transactions.html](https://www.postgresql.org/docs/18/tutorial-transactions.html)

[T2] PostgreSQL Row Security

[https://www.postgresql.org/docs/18/ddl-rowsecurity.html](https://www.postgresql.org/docs/18/ddl-rowsecurity.html)

[T3] MySQL InnoDB Transaction Model

[https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html)

[T4] MongoDB Transactions

[https://www.mongodb.com/docs/manual/core/transactions/](https://www.mongodb.com/docs/manual/core/transactions/)

[T5] Go Documentation

[https://go.dev/doc/](https://go.dev/doc/)

[T6] Node.js Introduction

[https://nodejs.org/en/learn/getting-started/introduction-to-nodejs](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)

[T7] FastAPI Features

[https://fastapi.tiangolo.com/features/](https://fastapi.tiangolo.com/features/)

[T8] Next.js Documentation

[https://nextjs.org/docs](https://nextjs.org/docs)

[T9] Creating a React App

[https://react.dev/learn/creating-a-react-app](https://react.dev/learn/creating-a-react-app)

[T10] Vue Introduction

[https://vuejs.org/guide/introduction.html](https://vuejs.org/guide/introduction.html)

[T11] Redis Persistence

[https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)

### Project records

[GitHub](https://github.com/islqdev/tappix-diploma)

[YouTrack](https://tappix-diploma.youtrack.cloud/projects/DIP/issues)

The repository is private; a link alone does not grant access. The accompanying report, editable diagrams and prototype images can be reviewed without repository access.

## Appendix A  Simulated owner discussion

AI-generated design exercise. The characters and situations are fictional; no interview took place.

The exercise uses the four-role concept and a six-visit reward rule to expose objections before implementation. The team requested realistic role-play, including disagreement, rather than favourable testimonials. The dialogues are presented in English for this report. They are not translated interview transcripts, a participant sample or evidence of willingness to pay.

### Scenario A1  A coffee shop owner

Student: Before I show the screens, how would you handle a guest who says they lost a nearly completed paper card?

Owner role: If I recognise them, I might accept what they say. But the next person on shift may not know them. I would not want a new system to turn that argument into a longer queue.

Student: Would a history of confirmed visits help?

Owner role: Maybe. Who corrects a mistake? A cashier can scan the wrong person, especially when two customers are standing together.

Student: We propose showing the matched card before confirmation. An authorised correction would leave an audit record instead of deleting the event.

Owner role: That sounds useful, but I still need to see how many steps it takes. My current cards do not need a charged phone or a password.

Student: What would you need to see before choosing whether to continue after a trial?

Owner role: That the staff can use it without calling me, that the numbers make sense, and that I can take my records if I leave. A pretty graph is not enough.

Student: Is seven days enough to judge it?

Owner role: To find annoying parts, probably. To say that people return more often, no. Some regulars might only visit once that week.

### Candidate requirements and unresolved questions

This scenario motivates a visible confirmation step, an auditable correction and a usable export. It also separates the access trial from the time needed to evaluate retention. The existing requirements FR-03 and FR-06 cover transaction correctness and metrics; correction permissions and export scope still need specification.

Validation to obtain: observe a real shift, record the current lost-card procedure and test a mistaken visit on synthetic data. No operational frequency, acceptable price or customer benefit can be inferred from this role-play.

## Appendix A  Simulated staff discussion

AI-generated role-play A2. This is a fictional counter scenario, not a report of observed staff behaviour.

### Scenario A2  A cashier during a busy shift

Student: The guest has five visits out of six. You scan the card and press Confirm visit. The connection drops before the result appears. What would you do?

Staff role: I would probably press it again. The guest is waiting and I cannot tell whether it worked.

Student: The same operation should return the earlier result if the first request committed. Until we know the result, the screen should say it is being checked.

Staff role: Then do not just show a red error. I will read that as “nothing happened”. And where do I look to check the last visit?

Student: We need a recent-operation result with the time and resulting progress. Would you issue the free coffee as soon as it reaches six?

Staff role: Only if the guest wants it now. They may want to keep the reward for next time. Also, I need to know whether it was already used at the other branch.

Student: Redemption is a separate action. The server checks the available reward and records one redemption, even if two staff members submit it.

Staff role: What if I scan a card from another café in the same wallet?

Student: It should say that this card belongs to another business and cannot be used here. It must not reveal that business’s customer history.

Staff role: Good. But do not make me log in again after every customer. I need an individual account that stays usable during my shift, and a clear way to lock it when I leave.

### Candidate requirements and test cases

FR-02, FR-03 and FR-08 cover company boundaries, single-effect writes and staff scope. Add an uncertain-result state to P03, a recent-operation lookup and explicit lock/logout behaviour. A proposed acceptance test drops the response after commit, retries with the same idempotency key and checks that one visit and one reward entitlement exist.

The simulated cashier’s tendency to retry is a scenario assumption. Usability testing must establish whether the wording actually prevents an incorrect second action; a server-side duplicate test alone cannot establish that.

## Appendix A  Simulated guest discussion

AI-generated role-play A3. No real guest, account, visit history or consent record is represented.

### Scenario A3  A guest with several cards

Student: You have cards for a café and a salon. Would keeping both in one account make the next visit easier?

Guest role: If I can find the right one quickly. I do not want the café to see when I visit the salon.

Student: The wallet groups cards for your access. Each business receives only its own card and activity. What would make you hesitate at registration?

Guest role: A long form. Also, why do you need my phone number? I do not want messages just because I want a stamp.

Student: The final registration flow needs a clear identity purpose and separate messaging choices. Which part of the sample card is unclear?

Guest role: “Six visits” could mean I get a free drink on the sixth visit or on the seventh. Say exactly when I can use it.

Student: The proposed rule creates a reward after the sixth qualifying visit. Using it is a separate step, subject to the stated programme conditions.

Guest role: And if I change my phone, do I lose all my cards?

Student: Recovery must verify that the account is yours. We should not merge two people just because somebody enters a matching phone number.

### Cross-scenario design actions

| Scenario | Action to specify or test | Acceptance evidence |
| --- | --- | --- |
| A1 owner | Correction rights and export; separate trial from pilot duration | Owner interprets a correction history and opens an export. |
| A2 staff | Uncertain result, recent operation and single redemption | Lost-response and concurrent-operation tests plus a staff task. |
| A3 guest | Reward wording, private wallet and verified recovery | Guest explains reward timing; cross-company and recovery tests. |

The scenarios produce candidate requirements, not a vote for the idea. No participant counts, satisfaction percentages or purchase commitments are reported. Real discussions should use past-behaviour questions before presenting the prototype and retain anonymised notes, including contradictory observations.

## Appendix B  Review and team response

Actual teacher feedback reported by Armat is separated from an AI-simulated adviser conversation.

### Received feedback

On 24 October 2026 Armat passed on two comments from the teacher: the writing sounded generated and the reference list needed at least twelve sources. We have the comments as reported by Armat; we do not have a signed review or acceptance of this revision.

We revised the report around decisions a reader can inspect. The literature section now explains why enrolment is a weak outcome measure. The prototype distinguishes a visit from redemption. The evaluation plan includes a lost-response retry and a check that chart totals agree with events. The bibliography contains twelve scientific articles and fourteen official product or technical sources. Whether the new prose and evidence satisfy the teacher remains for the teacher to judge.

### Simulated adviser dialogue

The following exchange was generated with AI for preparation. The adviser is a fictional role and does not represent Elvira Aitmukhanbetova’s words or approval.

Student: We expanded the references. What would still make the report weak?

Adviser role: A longer list is not enough. Explain which decision each source changes. For example, why do you measure repeat visits rather than simply count accounts?

Student: Registration can select people who were already regulars. We therefore separate the event metrics from claims about an increase in loyalty, and state the comparison period.

Adviser role: Then show that distinction in the dashboard and the evaluation plan. What can the committee actually verify at this milestone?

Student: The requirements, diagrams, static concepts and repository checks. The new diploma repository does not yet demonstrate the complete application.

Adviser role: Keep that boundary explicit. Also, these AI dialogues can help you identify missed cases, but they do not tell you how a real owner behaves. Do not report them as interviews.

Student: We label them as simulations and retain field validation as a later task. The next review should confirm the scope and whether this exercise satisfies the milestone’s discussion requirement.

### Outstanding acceptance

The revision addresses the reported source-count and specificity comments. Supervisor acceptance, the adequacy of AI scenarios for the university criterion, and the dates of later milestones still require confirmation. No approval, signature or participant response is generated on behalf of another person.
