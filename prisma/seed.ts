import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'owner1@example.com';
  const password = 'Passw0rd!';
  const exists = await prisma.user.findUnique({ where: { email }});
  if (!exists) {
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, password: hashed, role: 'OWNER' },
    });
    console.log('Created initial owner:', email);
  } else {
    console.log('Owner exists');
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
