# Next.js Dockerized Application

This repository contains a **Next.js** application fully dockerized and built with a modern stack for scalability and maintainability.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Overview](#overview)
- [Server Setup](#server-setup)
  - [Development](#development)
  - [Production](#production)
  - [Production without multi staging](#production-without-multi-staging)
- [Commit Message Guidelines](#commit-message-guidelines)
  - [Commit Types](#commit-types)
  - [Examples](#examples)
  - [Notes](#notes)

## Tech Stack

- **Next.js** – React framework for building full-stack web applications
- **Prisma ORM** – Type-safe database toolkit and query builder
- **PostgreSQL** – Relational database management system
- **Nodemailer** – Email sending functionality
- **Docker** – Containerization for development and deployment

## Overview

This project explores building a full-stack Next.js application with Docker, Prisma, and PostgreSQL.  
It follows the tutorial ["Build and Deploy a Fullstack Next.js App with Docker, Postgres & Prisma"](https://www.youtube.com/watch?v=N4meIif7Jtc) and aims to provide a solid foundation for future production-ready applications.

## Server Setup

### Development

To start the development server:

```bash
docker network create auth-v3
docker compose -f compose.dev.yaml up --watch
```

### Production

To start the production server:

```bash
docker network create auth-v3
docker compose -f compose.prod.yaml up
```

### Production without multi staging

To start the production without multi staging server:

```bash
docker network create auth-v3
docker compose -f compose.prod-without-multistage.yaml up
```

## Commit Message Guidelines

This project follows the **Conventional Commits** convention to keep a clean and consistent commit history.

Each commit message should have the following format:

### Commit Types

- **chore** → maintenance tasks, not affecting application logic (e.g. config, cleanup)
- **docs** → documentation changes (README, guides, comments)
- **style** → code formatting, not affecting functionality (indentation, spacing, semicolons)
- **feat** → a new feature (API endpoint, UI component, functionality)
- **fix** → a bug fix (UI bug, backend error, Prisma query fix)
- **refactor** → code changes that improve structure without changing behavior
- **test** → adding or updating tests (unit, integration, e2e)
- **build** → changes to build system (Next.js config, Webpack, Vite)
- **ci** → changes to CI/CD configuration (GitHub Actions, Docker workflows)
- **perf** → performance improvements (query optimization, caching, rendering optimization)
- **deps** → dependency updates (upgrade/downgrade libraries)
- **db** → database-related changes (Prisma migrations, seeds)
- **docker** → Docker-related changes (Dockerfile, docker-compose)

### Examples

- feat(auth): add JWT authentication
- fix(api): handle null values in user controller
- docs(readme): update installation steps
- refactor(db): extract prisma client initialization
- test(auth): add unit tests for login flow
- build(next): update next.config.js for standalone mode
- ci(docker): add GitHub Action for building Docker image
- perf(prisma): optimize query with select and include
- deps(prisma): update prisma to v5
- db(migration): add new table for orders
- docker(compose): add volume for postgres persistence

### Notes

- Keep messages **short and clear**
- Use **English** for consistency
- Use **imperative mood**: "add feature" not "added feature"
- When in doubt, prefer **feat** or **fix**, and add a clear scope
