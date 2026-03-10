import { Injectable } from '@nestjs/common';

/** Stub: returns the URL as-is (no S3 presigning). Replace with real impl when using S3 media. */
@Injectable()
export class UrlPresignerService {
  async presignUrl(url: string): Promise<string | null> {
    return url ?? null;
  }
}
