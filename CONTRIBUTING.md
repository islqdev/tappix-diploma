# Contribution Workflow

1. Create a real issue in the YouTrack project `DIP`. Include responsible person,
   expected result, acceptance criteria, dependencies and an agreed deadline.
2. Branch from `main`: `DIP-<actual issue number>-<short-name>`.
3. Implement one reviewable change, with tests for changed behavior.
4. Check the staged diff for credentials and customer or student personal data.
5. Commit using your own Git identity: `DIP-23: Add initial database schema`.
   The number is an example, not an existing issue.
6. Open a PR with the task URL, results of checks and known limitations.
7. The other student reviews the PR. CI and AI review do not replace peer review.
8. Merge only after review and required checks. Link the PR back to YouTrack.

The initial repository bootstrap may establish `main` once with a real task ID.
All subsequent implementation changes use a task branch and PR. Do not backdate,
forge authorship or approvals, force-push `main`, or move released defense tags.

Use `pre-defense-1`, `pre-defense-2`, and `final-pre-defense` only when the actual
milestones are reviewed. Do not create these tags in advance.

Reuse from the prototype must be named in the PR, including the source revision or
path and the adaptations. Follow dependency licenses and attribute third-party work.

Only synthetic data belongs in tests. Do not commit real databases, tokens, session
keys, private contact details, unredacted university forms or production settings.
`.gitignore` is an accidental-add safeguard, not a secret scanner or access control.

Do not run destructive tests against the prototype or a live customer database.
Use separate Compose project names, volumes, ports and credentials.
