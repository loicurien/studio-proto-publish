import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';

export const WORKSPACE_ID_HEADER = 'X-Nb-Workspace';

@Injectable({ scope: Scope.REQUEST })
export class UserRequestCredentialsService {
  /** For prototype: defaults to 'default-workspace' when header is missing. */
  get workspaceId(): string {
    const req = this.request as Request & { headers?: Record<string, string> };
    const raw =
      req?.headers?.[WORKSPACE_ID_HEADER] ?? req?.headers?.['x-nb-workspace'];
    return typeof raw === 'string' && raw.trim() ? raw : 'default-workspace';
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
