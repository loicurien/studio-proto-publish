import { PrismaClient as PgClient } from '@prisma/client';
import { PrismaClient as SqliteClient } from '../src/generated/sqlite';

async function main(): Promise<void> {
  const sqlite = new SqliteClient();
  const pg = new PgClient();

  try {
    const profiles = await sqlite.ayrshareProfile.findMany();

    for (const profile of profiles) {
      await pg.ayrshareProfile.upsert({
        where: { id: profile.id },
        update: {},
        create: {
          id: profile.id,
          workspaceId: profile.workspaceId,
          name: profile.name,
          profileKey: profile.profileKey,
          createdAt: profile.createdAt,
          updatedAt: profile.updatedAt,
        },
      });
    }

    const publications = await sqlite.publication.findMany({
      include: { distributions: true },
    });

    for (const publication of publications) {
      const { distributions, ...pubData } = publication;

      await pg.publication.upsert({
        where: { id: publication.id },
        update: {},
        create: {
          id: pubData.id,
          title: pubData.title,
          description: pubData.description,
          postText: pubData.postText,
          mediaUrls: pubData.mediaUrls,
          mediaUrlsByFormat: pubData.mediaUrlsByFormat,
          scheduledAt: pubData.scheduledAt,
          ayrshareProfileId: pubData.ayrshareProfileId,
          createdAt: pubData.createdAt,
          updatedAt: pubData.updatedAt,
        },
      });

      for (const dist of distributions) {
        await pg.distribution.upsert({
          where: { id: dist.id },
          update: {},
          create: {
            id: dist.id,
            publicationId: dist.publicationId,
            platform: dist.platform,
            status: dist.status,
            ayrsharePostId: dist.ayrsharePostId,
            platformPostId: dist.platformPostId,
            postUrl: dist.postUrl,
            errorMessage: dist.errorMessage,
            scheduledAt: dist.scheduledAt,
            publishedAt: dist.publishedAt,
            postText: dist.postText,
            mediaUrls: dist.mediaUrls,
            platformOptions: dist.platformOptions,
            hashtags: dist.hashtags,
            preferredFormat: dist.preferredFormat,
            viewCount: dist.viewCount,
            likeCount: dist.likeCount,
            createdAt: dist.createdAt,
            updatedAt: dist.updatedAt,
          },
        });
      }
    }
  } finally {
    await Promise.allSettled([sqlite.$disconnect(), pg.$disconnect()]);
  }
}

void main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Migration failed', error);
  process.exit(1);
});

