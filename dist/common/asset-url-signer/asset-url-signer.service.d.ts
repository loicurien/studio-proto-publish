export declare class AssetUrlSignerService {
    private readonly baseUrl;
    private readonly expiration;
    buildSignedAssetUrl(storageKey: string, bearerToken: string, wuid: string): string;
}
