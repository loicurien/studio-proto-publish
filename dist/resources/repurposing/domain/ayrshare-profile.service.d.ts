import { PrismaService } from '../../../prisma.service';
import { AyrshareRepository } from '../spi/ayrshare.repository';
export interface AyrshareProfileListItem {
    id: string;
    name: string;
    profileKey: string;
}
export declare class AyrshareProfileService {
    private readonly prisma;
    private readonly ayrshare;
    constructor(prisma: PrismaService, ayrshare: AyrshareRepository);
    listProfilesForWorkspace(workspaceId: string): Promise<AyrshareProfileListItem[]>;
    getProfileKeyById(profileId: string, workspaceId: string): Promise<string>;
    getProfileKeyByIdOnly(profileId: string): Promise<string>;
    getFirstProfileKeyForWorkspace(workspaceId: string): Promise<string | null>;
    getActivePlatformsForProfile(profileId: string, workspaceId: string): Promise<string[]>;
    upsertProfileForWorkspace(workspaceId: string, name: string, profileKey: string, profileId?: string): Promise<AyrshareProfileListItem>;
}
