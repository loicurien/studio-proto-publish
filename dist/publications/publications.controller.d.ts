import { PublicationsService, CreatePublicationDto } from './publications.service';
import { Publication } from '@prisma/client';
export declare class PublicationsController {
    private readonly publicationsService;
    constructor(publicationsService: PublicationsService);
    getAll(): Promise<Publication[]>;
    create(body: CreatePublicationDto): Promise<Publication>;
}
