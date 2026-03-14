/**
 * One-off: rename the Ayrshare profile with id "migrated-studio" to "Studio (Default)".
 * Run: npx ts-node scripts/rename-ayrshare-profile.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const result = await prisma.ayrshareProfile.updateMany({
    where: { id: 'migrated-studio' },
    data: { name: 'Studio (Default)' },
  });
  if (result.count === 0) {
    // eslint-disable-next-line no-console
    console.warn('No profile with id "migrated-studio" found. Listing profiles:');
    const list = await prisma.ayrshareProfile.findMany({
      select: { id: true, name: true, workspaceId: true },
    });
    list.forEach((p) => console.log(`  id=${p.id} name=${JSON.stringify(p.name)} workspaceId=${p.workspaceId}`));
    process.exitCode = 1;
    return;
  }
  // eslint-disable-next-line no-console
  console.log('Renamed profile "migrated-studio" to "Studio (Default)".');
}

void main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
