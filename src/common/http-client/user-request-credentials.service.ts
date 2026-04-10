import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';

export const WORKSPACE_ID_HEADER = 'X-Nb-Workspace';

/** Fixed workspace for the Railway prototype (`x-nb-workspace` is ignored). */
export const DEFAULT_STUDIO_WORKSPACE_ID = 'studio';

@Injectable({ scope: Scope.REQUEST })
export class UserRequestCredentialsService {
  /**
   * Railway prototype: always `studio`. Incoming `X-Nb-Workspace` / `x-nb-workspace`
   * is not used so tenant/workspace from the main app cannot split prototype data.
   */
  get workspaceId(): string {
    return DEFAULT_STUDIO_WORKSPACE_ID;
  }

  /** Bearer token from Authorization header (e.g. for signing asset URLs). */
  get token(): string | undefined {
    const req = this.request as Request & { headers?: Record<string, string | string[]> };
    const raw =
      req?.headers?.['Authorization'] ?? req?.headers?.['authorization'];
    const s = Array.isArray(raw) ? raw[0] : raw;
    if (typeof s !== 'string' || !s.trim()) return undefined;
    return s.startsWith('Bearer ') ? s.slice(7).trim() : s.trim();
  }

  constructor(@Inject(REQUEST) private readonly request: unknown) {}
}
