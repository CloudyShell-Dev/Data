// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('votre_mot_de_passe_admin', 10);

  // Création ou mise à jour de l'admin
  await prisma.user.upsert({
    where: { email: 'admin@cloudyshell.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin@cloudyshell.com',
      name: 'Admin',
      password: hashedPassword,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });