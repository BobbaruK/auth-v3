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

## Tech Stack & Important Packages

### Core

- **next** – Full-stack React framework (SSR, SSG, routing).
- **react / react-dom** – React UI library and DOM renderer.

### Database

- **prisma / @prisma/client** – Type-safe ORM for PostgreSQL, migrations, and query building.

### Forms & Validation

- **react-hook-form** – Form management in React.
- **@hookform/resolvers** – Integrates schema validation (e.g., Zod) with React Hook Form.
- **zod** – Schema validation in TypeScript.

### UI & Styling

- **tailwindcss** – Utility-first CSS framework for rapid styling.
- **tailwind-merge** – Combine and override Tailwind classes safely.
- **clsx** – Utility for conditional class concatenation.
- **class-variance-authority** – Manage UI class variants.
- **shadcn/ui** – Accessible, customizable UI components.
- **lucide-react / react-icons** – SVG icon libraries for React.
- **sonner** – Elegant toast notifications.

### Auth & Security

- **better-auth** – Authentication with cookies / JWT.
- **input-otp** – OTP input components for login flows.

### Theming / Utilities

- **next-themes** – Dark / light mode support.
- **usehooks-ts** – Reusable React hooks written in TypeScript.

### Email

- **resend** – Sending emails via API.
- **@react-email/components / @react-email/render** – Building and rendering emails in React.

### Dev & Linting

- **typescript** – TypeScript type system.
- **eslint / eslint-config-next / eslint-plugin-boundaries** – Linting and best practices.

## Overview

This project is a full-stack authentication system built with Next.js, designed to handle modern user workflows including login, registration, password reset, and email verification. It is fully containerized with Docker and connects to a PostgreSQL database via Prisma. The app demonstrates practical handling of sessions, JWTs, and secure authentication flows, structured in a way that could serve as a foundation for larger applications.

## Server Setup

### Development

To start the development server:

```bash
docker compose -f compose.dev.yaml up --watch
```

Alternatively, you can run only the Postgres container with Docker and start the Next.js app locally:

```bash
docker compose -f compose.dev.yaml up db -d
cd ./next-app
npx prisma db push # or npx prisma generate
npm run dev
```

### Production

To start the production server:

```bash
docker compose -f compose.prod.yaml up
```

### Production without multi staging

To start the production without multi staging server:

```bash
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
- **release** → versioning and release-related commits (version bumps, changelogs, preparing or publishing a new release)

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
