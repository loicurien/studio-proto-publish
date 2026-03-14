import { UserRequestCredentialsService } from '../../../common/http-client/user-request-credentials.service';
import { AyrshareProfileService } from '../domain/ayrshare-profile.service';
import { AyrshareRepository } from '../spi/ayrshare.repository';
export declare class AyrshareController {
    private readonly ayrshareProfiles;
    private readonly ayrshare;
    private readonly userRequest;
    constructor(ayrshareProfiles: AyrshareProfileService, ayrshare: AyrshareRepository, userRequest: UserRequestCredentialsService);
    listProfiles(): Promise<{
        profiles: {
            id: string;
            name: string;
            profileKey: string;
        }[];
    }>;
    getActivePlatforms(profileId: string): Promise<{
        platforms: string[];
    }>;
    createOrUpdateProfile(body: {
        name: string;
        profileKey: string;
        id?: string;
    }): Promise<{
        id: string;
        name: string;
        profileKey: string;
    }>;
    upsertProfileKey(body: {
        profileKey: string;
    }): Promise<void>;
    getSocialAnalytics(profileId: string, platformsStr?: string, dailyStr?: string, quartersStr?: string): Promise<Record<string, unknown>>;
}
