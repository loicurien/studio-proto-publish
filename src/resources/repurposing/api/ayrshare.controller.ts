import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  UserRequestCredentialsService,
  WORKSPACE_ID_HEADER,
} from '../../../common/http-client/user-request-credentials.service';
import { AyrshareProfileService } from '../domain/ayrshare-profile.service';

@Controller('repurposing/ayrshare')
export class AyrshareController {
  constructor(
    private readonly ayrshareProfiles: AyrshareProfileService,
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
}
