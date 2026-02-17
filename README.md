# Event Driven Platform

Example monorepo with an event-driven architecture based on Node.js and Docker.

## Stack
- Node.js (Express)
- PostgreSQL
- Redis
- Docker & Docker Compose
- OpenAPI 3.1
- Sequelize + sequelize-cli
- Jest (testing)

## Services
- **event-service**: REST API responsible for event ingestion, persistence, and retrieval.
- **notification-worker**: Worker that processes events via Redis.

## Spin up the project

```bash
docker-compose up --build
```
## Run migrations for the development environment:
```bash
docker compose exec event-service npx sequelize-cli db:migrate
```
## Run migrations for the test database:
```bash
docker compose exec -e NODE_ENV=test event-service npx sequelize-cli db:migrate --env test
```
## Run Tests
```bash
docker compose exec event-service npm test
```