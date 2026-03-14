import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  UserRequestCredentialsService,
  WORKSPACE_ID_HEADER,
} from '../../../common/http-client/user-request-credentials.service';
import { AyrshareProfileService } from '../domain/ayrshare-profile.service';
import { AyrshareRepository } from '../spi/ayrshare.repository';

@Controller('repurposing/ayrshare')
export class AyrshareController {
  constructor(
    private readonly ayrshareProfiles: AyrshareProfileService,
    private readonly ayrshare: AyrshareRepository,
    private readonly userRequest: UserRequestCredentialsService,
  ) {}

  @Get('profiles')
  async listProfiles(): Promise<{ profiles: { id: string; name: string; profileKey: string }[] }> {
    const workspaceId = this.userRequest.workspaceId;
    if (!workspaceId) {
      throw new Error(`${WORKSPACE_ID_HEADER} header is required`);
    }
    const profiles = await this.ayrshareProfiles.listProfilesForWorkspace(
      workspaceId,
    );
    return { profiles };
  }

  @Get('platforms')
  async getActivePlatforms(
    @Query('profileId') profileId: string,
  ): Promise<{ platforms: string[] }> {
    const workspaceId = this.userRequest.workspaceId;
    if (!workspaceId) {
      throw new Error(`${WORKSPACE_ID_HEADER} header is required`);
    }
    if (!profileId?.trim()) {
      throw new Error('profileId query is required');
    }
    const platforms = await this.ayrshareProfiles.getActivePlatformsForProfile(
      profileId,
      workspaceId,
    );
    return { platforms };
  }

  @Post('profiles')
  async createOrUpdateProfile(
    @Body() body: { name: string; profileKey: string; id?: string },
  ): Promise<{ id: string; name: string; profileKey: string }> {
    const workspaceId = this.userRequest.workspaceId;
    if (!workspaceId) {
      throw new Error(`${WORKSPACE_ID_HEADER} header is required`);
    }
    return this.ayrshareProfiles.upsertProfileForWorkspace(
      workspaceId,
      body.name,
      body.profileKey,
      body.id,
    );
  }

  @Post('profile-key')
  async upsertProfileKey(
    @Body() body: { profileKey: string },
  ): Promise<void> {
    const workspaceId = this.userRequest.workspaceId;
    if (!workspaceId) {
      throw new Error(`${WORKSPACE_ID_HEADER} header is required`);
    }
    await this.ayrshareProfiles.upsertProfileForWorkspace(
      workspaceId,
      'Default',
      body.profileKey,
    );
  }

  /**
   * Social (account-level) analytics from Ayrshare.
   * Use daily=true for views per day (Facebook, Instagram, TikTok, YouTube).
   * @see https://www.ayrshare.com/docs/apis/analytics/social
   */
  @Get('analytics/social')
  async getSocialAnalytics(
    @Query('profileId') profileId: string,
    @Query('platforms') platformsStr?: string,
    @Query('daily') dailyStr?: string,
    @Query('quarters') quartersStr?: string,
  ): Promise<Record<string, unknown>> {
    const workspaceId = this.userRequest.workspaceId;
    if (!workspaceId) {
      throw new Error(`${WORKSPACE_ID_HEADER} header is required`);
    }
    if (!profileId?.trim()) {
      throw new Error('profileId query is required');
    }
    const profileKey = await this.ayrshareProfiles.getProfileKeyById(
      profileId,
      workspaceId,
    );
    const requested = platformsStr
      ? platformsStr.split(',').map((p) => p.trim().toLowerCase()).filter(Boolean)
      : ['facebook', 'instagram', 'tiktok', 'youtube'];
    const active = await this.ayrshareProfiles.getActivePlatformsForProfile(
      profileId,
      workspaceId,
    );
    const activeSet = new Set(active.map((p) => p.toLowerCase()));
    const platforms = requested.filter((p) => activeSet.has(p));
    if (platforms.length === 0) {
      return {};
    }
    const daily = dailyStr === 'true' || dailyStr === '1';
    const quarters =
      quartersStr !== undefined && quartersStr !== ''
        ? Math.min(4, Math.max(1, Number(quartersStr) || 1))
        : undefined;
    return this.ayrshare.getSocialAnalytics(
      platforms,
      { daily, quarters },
      profileKey,
    );
  }
}
