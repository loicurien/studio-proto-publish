import { UserRequestCredentialsService } from '../../../common/http-client/user-request-credentials.service';
import { AyrshareProfileService } from '../domain/ayrshare-profile.service';
export declare class AyrshareController {
    private readonly ayrshareProfiles;
    private readonly userRequest;
    constructor(ayrshareProfiles: AyrshareProfileService, userRequest: UserRequestCredentialsService);
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
}
