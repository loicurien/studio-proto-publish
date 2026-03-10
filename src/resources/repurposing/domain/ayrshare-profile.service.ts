import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { AyrshareRepository } from '../spi/ayrshare.repository';

export interface AyrshareProfileListItem {
  id: string;
  name: string;
  profileKey: string;
}

@Injectable()
export class AyrshareProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ayrshare: AyrshareRepository,
  ) {}

  async listProfilesForWorkspace(workspaceId: string): Promise<AyrshareProfileListItem[]> {
    const rows = await this.prisma.ayrshareProfile.findMany({
      where: { workspaceId },
      orderBy: { name: 'asc' },
    });
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      profileKey: r.profileKey,
    }));
  }

  async getProfileKeyById(profileId: string, workspaceId: string): Promise<string> {
    const record = await this.prisma.ayrshareProfile.findFirst({
      where: { id: profileId, workspaceId },
    });
    if (!record) {
      throw new NotFoundException(`Ayrshare profile ${profileId} not found`);
    }
    return record.profileKey;
  }

  async getProfileKeyByIdOnly(profileId: string): Promise<string> {
    const record = await this.prisma.ayrshareProfile.findUnique({
      where: { id: profileId },
    });
    if (!record) {
      throw new NotFoundException(`Ayrshare profile ${profileId} not found`);
    }
    return record.profileKey;
  }

  async getFirstProfileKeyForWorkspace(workspaceId: string): Promise<string | null> {
    const record = await this.prisma.ayrshareProfile.findFirst({
      where: { workspaceId },
      orderBy: { name: 'asc' },
    });
    return record?.profileKey ?? null;
  }

  async getActivePlatformsForProfile(
    profileId: string,
    workspaceId: string,
  ): Promise<string[]> {
    const profileKey = await this.getProfileKeyById(profileId, workspaceId);
    const profile = await this.ayrshare.getUserProfile(profileKey);
    const raw = (profile.activeSocialAccounts ?? []) as string[];
    return raw.map((p) => {
      if (p === 'gmb') return 'googlebusiness';
      return p;
    });
  }

  async upsertProfileForWorkspace(
    workspaceId: string,
    name: string,
    profileKey: string,
    profileId?: string,
  ): Promise<AyrshareProfileListItem> {
    if (!name?.trim()) {
      throw new BadRequestException('Profile name is required');
    }
    if (!profileKey?.trim()) {
      throw new BadRequestException('Profile key is required');
    }
    if (profileId) {
      await this.prisma.ayrshareProfile.updateMany({
        where: { id: profileId, workspaceId },
        data: { name: name.trim(), profileKey: profileKey.trim() },
      });
      const row = await this.prisma.ayrshareProfile.findUniqueOrThrow({
        where: { id: profileId },
      });
      return { id: row.id, name: row.name, profileKey: row.profileKey };
    }
    const row = await this.prisma.ayrshareProfile.upsert({
      where: {
        workspaceId_profileKey: { workspaceId, profileKey: profileKey.trim() },
      },
      update: { name: name.trim() },
      create: {
        workspaceId,
        name: name.trim(),
        profileKey: profileKey.trim(),
      },
    });
    return { id: row.id, name: row.name, profileKey: row.profileKey };
  }
}
