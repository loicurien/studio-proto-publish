export declare const WORKSPACE_ID_HEADER = "X-Nb-Workspace";
export declare class UserRequestCredentialsService {
    private readonly request;
    get workspaceId(): string;
    get token(): string | undefined;
    constructor(request: unknown);
}
