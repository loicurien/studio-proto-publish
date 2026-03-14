export interface AyrshareWebhookPayload {
    action: string;
    status?: string;
    id?: string;
    postIds?: Array<{
        platform?: string;
        id?: string;
        postUrl?: string;
        post_url?: string;
        status?: string;
        error?: string;
    }>;
    errors?: string[];
    subAction?: string;
    created?: string;
    code?: number;
    refId?: string;
    hookId?: string;
    url?: string;
    [key: string]: unknown;
}
