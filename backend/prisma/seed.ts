/// <reference types="node" />
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      first_name: 'João',
      last_name: 'Silva',
      email: 'joao.silva@example.com',
      password: '$2b$10$LTkr2VauA2abfeIdxVS70.yOnYs.ta82Bg3Dx6MFst5i0lDTcLAby', // senha: 123456789
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      first_name: 'Maria',
      last_name: 'Santos',
      email: 'maria.santos@example.com',
      password: '$2b$10$LTkr2VauA2abfeIdxVS70.yOnYs.ta82Bg3Dx6MFst5i0lDTcLAby',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      first_name: 'Carlos',
      last_name: 'Oliveira',
      email: 'carlos.oliveira@example.com',
      password: '$2b$10$LTkr2VauA2abfeIdxVS70.yOnYs.ta82Bg3Dx6MFst5i0lDTcLAby',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      first_name: 'Ana',
      last_name: 'Costa',
      email: 'ana.costa@example.com',
      password: '$2b$10$LTkr2VauA2abfeIdxVS70.yOnYs.ta82Bg3Dx6MFst5i0lDTcLAby',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      first_name: 'Pedro',
      last_name: 'Souza',
      email: 'pedro.souza@example.com',
      password: '$2b$10$LTkr2VauA2abfeIdxVS70.yOnYs.ta82Bg3Dx6MFst5i0lDTcLAby',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      first_name: 'Juliana',
      last_name: 'Almeida',
      email: 'juliana.almeida@example.com',
      password: '$2b$10$LTkr2VauA2abfeIdxVS70.yOnYs.ta82Bg3Dx6MFst5i0lDTcLAby',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
    },
    {
      first_name: 'Lucas',
      last_name: 'Pereira',
      email: 'lucas.pereira@example.com',
      password: '$2b$10$LTkr2VauA2abfeIdxVS70.yOnYs.ta82Bg3Dx6MFst5i0lDTcLAby',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    {
      first_name: 'Fernanda',
      last_name: 'Lima',
      email: 'fernanda.lima@example.com',
      password: '$2b$10$LTkr2VauA2abfeIdxVS70.yOnYs.ta82Bg3Dx6MFst5i0lDTcLAby',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      first_name: 'Rafael',
      last_name: 'Martins',
      email: 'rafael.martins@example.com',
      password: '$2b$10$LTkr2VauA2abfeIdxVS70.yOnYs.ta82Bg3Dx6MFst5i0lDTcLAby',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
      first_name: 'Patrícia',
      last_name: 'Rocha',
      email: 'patricia.rocha@example.com',
      password: '$2b$10$LTkr2VauA2abfeIdxVS70.yOnYs.ta82Bg3Dx6MFst5i0lDTcLAby',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
    }
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });