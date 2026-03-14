# Configuring Ayrshare webhooks

This backend can receive webhooks from Ayrshare to update distribution status when scheduled posts complete (success or error).

## 1. Webhook URL

Your endpoint is:

```
https://<YOUR_BACKEND_DOMAIN>/api/web/repurposing/webhooks/ayrshare
```

Example: `https://your-app.railway.app/api/web/repurposing/webhooks/ayrshare`

- Must be **HTTPS**.
- Must respond with **HTTP 200** within **10 seconds** (Ayrshare retries on failure/timeout).
- No authentication is required by default (Ayrshare does not send a shared secret in the request; you can add HMAC verification later if Ayrshare provides a secret when registering).

## 2. Register the webhook with Ayrshare

### Option A: Ayrshare dashboard

1. Log in to [Ayrshare](https://app.ayrshare.com).
2. Go to **Webhooks** (or **Developer** → **Webhooks**).
3. Add a webhook:
   - **Action**: `scheduled` (for post status updates).
   - **URL**: your backend URL above.
4. Save.

### Option B: Ayrshare API

Register programmatically:

```bash
curl -X POST 'https://api.ayrshare.com/api/hook/webhook' \
  -H 'Authorization: Bearer YOUR_AYRSHARE_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://<YOUR_BACKEND_DOMAIN>/api/web/repurposing/webhooks/ayrshare",
    "action": "scheduled"
  }'
```

Optional: for **User Profiles**, add the profile key so only that profile’s events hit this URL:

```bash
curl -X POST 'https://api.ayrshare.com/api/hook/webhook' \
  -H 'Authorization: Bearer YOUR_AYRSHARE_API_KEY' \
  -H 'Profile-Key: YOUR_PROFILE_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://<YOUR_BACKEND_DOMAIN>/api/web/repurposing/webhooks/ayrshare",
    "action": "scheduled"
  }'
```

Available actions: `scheduled`, `social`, `messages`, `feed`, `batch`, `accountActivity`. You can register one URL and subscribe to multiple actions; every webhook is stored (see below). The backend **updates distribution status** only for **scheduled** events.

## 3. Storing all webhook data

Every webhook (any action) is stored in the **AyrshareWebhookEvent** table:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| action | string | `scheduled`, `social`, `messages`, `feed`, `batch`, `accountActivity` |
| hookId | string? | Ayrshare hook id from payload |
| refId | string? | Ayrshare user/profile reference from payload |
| ayrshareProfileId | uuid? | Our profile id when known (set for scheduled when linked to a publication) |
| payload | jsonb | Full JSON payload from Ayrshare |
| createdAt | timestamp | When the webhook was received |

Apply the schema with:

```bash
npx prisma db push
# or
npx prisma migrate dev --name add_ayrshare_webhook_events
```

### Routes to read webhook events

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/web/repurposing/webhooks/events` | List events. Query: `action`, `refId`, `ayrshareProfileId`, `from`, `to`, `limit` (max 100), `offset` |
| GET | `/api/web/repurposing/webhooks/events/:id` | Get one event by id |

Response shape for list: `{ events: Array<{ id, action, hookId, refId, ayrshareProfileId, payload, createdAt }>, total: number }`.

## 4. What the backend does (scheduled only)

When Ayrshare sends a **scheduled** webhook:

- The payload includes `id` (Ayrshare post ID) and `status` (`success` or `error`), plus per-platform `postIds` (platform, id, postUrl, status).
- The backend finds the **Distribution** with that `ayrsharePostId` and updates:
  - `status` → `success`, `error`, or `pending`
  - `platformPostId`, `postUrl`, `errorMessage`
  - `publishedAt` when status is `success`
  - **View count**: on success, the backend calls Ayrshare’s post analytics API and updates `viewCount` when available (platforms may report views after a short delay).

View counts are also refreshed when you call the **refresh status** endpoint for a publication (`GET .../publications/:id/refresh-ayrshare-status`).

## 5. List or unregister webhooks (Ayrshare side)

- **List**: `GET https://api.ayrshare.com/api/hook/webhook` with `Authorization: Bearer YOUR_AYRSHARE_API_KEY`
- **Unregister**: `DELETE https://api.ayrshare.com/api/hook/webhook` with body `{ "action": "scheduled" }`

See [Ayrshare webhook docs](https://www.ayrshare.com/docs/apis/webhooks/overview) for details.
