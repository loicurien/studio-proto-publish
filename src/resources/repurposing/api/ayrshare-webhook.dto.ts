/**
 * Payload Ayrshare sends to your webhook URL (POST JSON).
 * @see https://www.ayrshare.com/docs/apis/webhooks/actions
 */
export interface AyrshareWebhookPayload {
  /** Action type: scheduled, social, messages, feed, batch, accountActivity */
  action: string;
  /** For scheduled: "success" or "error" */
  status?: string;
  /** Ayrshare post ID (used to find our Distribution) */
  id?: string;
  /** Per-platform results (scheduled action) */
  postIds?: Array<{
    platform?: string;
    id?: string;
    postUrl?: string;
    post_url?: string;
    status?: string;
    error?: string;
  }>;
  /** Error messages when status is "error" */
  errors?: string[];
  /** Optional subAction (e.g. tikTokPublished) */
  subAction?: string;
  created?: string;
  code?: number;
  refId?: string;
  hookId?: string;
  url?: string;
  [key: string]: unknown;
}
