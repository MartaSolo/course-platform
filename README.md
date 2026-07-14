# Course Platform

A full-stack course platform built with Nuxt. Visitors can access the first three lessons for free; full access requires a paid subscription. Authentication is handled via GitHub OAuth.

**Stack:**

- **Nuxt** (Vue 3) — SSR with server-side API routes
- **TypeScript** — end-to-end type safety
- **Supabase** — PostgreSQL database and GitHub OAuth authentication
- **Prisma** — database ORM and migrations
- **Stripe** — subscription payments and webhooks
- **Tailwind CSS** — utility-first styling

**Live:** [vue-course-platform.netlify.app](https://vue-course-platform.netlify.app/)

For testing payment use stripe test card: 4242424242424242 and any future date.

**Preview:**

![App preview](.github/course-platform.gif)

## Environment setup

Copy `.env sample` to `.env` and fill in the values:

```bash
cp ".env sample" .env
```

The `.env` file is gitignored. Docker Compose loads it automatically via `env_file`; for local development, Nuxt reads it on startup.

## Docker development

Recommended for local development. No local Node.js installation required.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### First run

```bash
docker compose watch
```

On the first run, this builds the image, starts the container, and enables file watching. The app is available at `http://localhost:3000`.

### Daily workflow

```bash
docker compose watch   # start dev server with hot reload on http://localhost:3000
docker compose down    # stop and remove the container
```

### How file watching works

- Changes in `app/`, `server/`, `shared/`, and `public/` are synced instantly (no rebuild)
- `prisma/` is mounted as a bind mount, so it syncs **bidirectionally**: your edits reach the container, and files the container creates (migrations, generated client) appear back on your host
- Changes in `package.json` or `nuxt.config.ts` trigger an automatic image rebuild
- Changes in `Dockerfile.dev` require a manual rebuild (see below)

Use `docker compose watch` (or `docker compose up --watch`). Plain `docker compose up` does not sync file changes.

### Prisma schema changes

The `prisma/` directory is a bind mount, so files created inside the container (migrations, generated client) appear on your host automatically — no manual copying needed.

After editing `prisma/schema.prisma`, run migrations inside the container:

```bash
docker compose exec app npx prisma migrate dev
```

This creates the migration file and regenerates the Prisma client in one step; both show up in your local `prisma/` directory right away.

If you only need to regenerate the client without creating a migration (e.g. after running `prisma migrate dev --create-only`), run:

```bash
docker compose exec app npx prisma generate
```

### Generated client is committed

`prisma/generated/` (the Prisma client and types) is committed to git rather than
gitignored. This keeps the client available immediately after cloning, with no
extra generation step required before the app can start.

**Rule:** whenever you edit `prisma/schema.prisma`, always run `prisma migrate dev`
(or `prisma generate`) and commit the resulting changes in `prisma/generated/`
together with your schema change. Skipping this step leaves committed types out
of sync with the schema.

### Force rebuild (after Dockerfile.dev changes)

```bash
docker compose up --build --watch
```

## Local development

Alternative to Docker. Requires Node.js — see [`.nvmrc`](.nvmrc) for the version (22.14.0).

```bash
nvm use
npm install
npm run dev
```

The app is available at `http://localhost:3000`.

### Prisma schema changes

```bash
npx prisma migrate dev
```

See [Generated client is committed](#generated-client-is-committed) for why `prisma/generated/` must be committed alongside schema changes.

## Production

Production is deployed on Netlify. For local production-like testing:

```bash
npm run build
npm run preview
```
