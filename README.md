# Event Driven Platform

Example monorepo with an event-driven architecture based on Node.js and Docker.

## Stack
- Node.js (Express)
- PostgreSQL
- Redis
- Docker & Docker Compose
- OpenAPI 3.1

## Services
- **event-service**: REST API for event management.
- **notification-worker**: Worker that processes events via Redis.

## Spin up the project

```bash
docker-compose up --build