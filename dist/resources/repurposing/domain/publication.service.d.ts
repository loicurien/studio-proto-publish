import { PrismaService } from '../../../prisma.service';
import { Publication, Distribution } from '@prisma/client';
export interface CreatePublicationInput {
    title: string;
    description?: string;
    postText?: string;
    mediaUrls?: string[];
    mediaUrlsByFormat?: Record<string, string[]>;
    scheduledAt?: Date;
    ayrshareProfileId?: string;
}
export interface UpdatePublicationInput {
    title?: string;
    description?: string;
    postText?: string;
    mediaUrls?: string[];
    scheduledAt?: Date;
    ayrshareProfileId?: string;
}
export declare class PublicationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(limit?: number, offset?: number): Promise<(Publication & {
        distributions: Distribution[];
    })[]>;
    findOne(id: string): Promise<Publication & {
        distributions: Distribution[];
    }>;
    create(input: CreatePublicationInput): Promise<Publication>;
    update(id: string, input: UpdatePublicationInput): Promise<Publication>;
    remove(id: string): Promise<void>;
    suggestContent(prompt?: string): Promise<{
        title: string;
        description?: string;
        postText?: string;
        hashtags?: string[];
    }>;
}
