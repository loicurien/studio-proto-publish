import { PrismaService } from '../prisma.service';
import { Publication } from '@prisma/client';
export interface CreatePublicationDto {
    title: string;
    description?: string;
    postText?: string;
    mediaUrls?: string;
    mediaUrlsByFormat?: string;
    scheduledAt?: Date;
    ayrshareProfileId?: string;
}
export declare class PublicationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Publication[]>;
    create(dto: CreatePublicationDto): Promise<Publication>;
}
