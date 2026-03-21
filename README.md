# studio-proto-publish

NestJS repurposing / Ayrshare prototype API.

## Database

After pulling schema changes, apply migrations to PostgreSQL:

```bash
npm run prisma:migrate:deploy
```

Or sync the schema without migration history (dev only):

```bash
npm run prisma:db:push
```

Then regenerate the client if needed: `npm run prisma:generate`.
