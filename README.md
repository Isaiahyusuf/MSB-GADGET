# MSB All Round Service

Marketplace for gadgets and future car and property listings, built with Next.js, Prisma Next, Postgres, and Cloudinary.

## Local development

1. Install dependencies with `npm ci`.
2. Create a root `.env.local` file using the variables below.
3. Generate or apply the database contract, then start Next.js with `npm run dev`.

```env
DATABASE_URL="postgresql://..."
ADMIN_PASSWORD="use-a-long-random-password"
ADMIN_SESSION_SECRET="use-a-different-long-random-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="..."
```

The nested `app/admin/add-listing/.env` file is not loaded by Next.js or Prisma. Keep all deployment variables in the host's environment or in a root local env file. Never commit secrets.

## Database deployment

This project uses the Prisma Next contract at `prisma/contract.prisma`. For a new or shared database, emit and review a formal migration before deploying:

```bash
npx prisma contract emit
npx prisma migration plan --name initial_schema
npx prisma db migrate --db "$DATABASE_URL"
npx prisma db verify --db "$DATABASE_URL"
```

The generated migration package `migrations/app/20260904T1830_commerce_foundation` includes the commerce tables. On Railway, run `npm run db:migrate -- --db "$DATABASE_URL"` as a release/deploy step before starting the app.

Commit the generated migration package under `migrations/app/`. Do not use `db update` for production; it is intended for a local development database.

## Production checks

```bash
npm ci
npm run lint
npm run build
npx tsc --noEmit
```

Deploy on Vercel or another Node-compatible host with the environment variables above. The start command is `npm start`; the build command is `npm run build`.

## Admin access

Open `/admin-login` and sign in with `ADMIN_PASSWORD`. The admin session is an HTTP-only, signed cookie and expires after 12 hours. The same session protects `/admin/*` and `POST /api/admin/listings`.
