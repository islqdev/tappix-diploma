# Docker Environment

Planned: isolated development Compose project for API, web, PostgreSQL and Redis.
Do not reuse the prototype's containers, credentials, ports or volumes.
Publish local ports only on loopback; do not expose PostgreSQL or Redis publicly.
Do not copy production secrets into images. No runnable Compose file exists yet.
