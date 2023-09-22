const Prisma = require('prisma/prisma-client');

const prisma = new Prisma.PrismaClient({
    errorFormat: 'minimal'
});

module.exports = prisma;