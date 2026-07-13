"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const globalForPrisma = globalThis;
// Handle SQLite concurrency locks by setting connection_limit to 1
let dbUrl = process.env.DATABASE_URL || 'file:./dev.db';
if (dbUrl.startsWith('file:') && !dbUrl.includes('connection_limit')) {
    dbUrl = dbUrl.includes('?') ? `${dbUrl}&connection_limit=1` : `${dbUrl}?connection_limit=1`;
}
exports.prisma = globalForPrisma.prisma || new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    datasources: {
        db: { url: dbUrl },
    },
});
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = exports.prisma;
}
// Graceful disconnect on shutdown
process.on('beforeExit', async () => {
    await exports.prisma.$disconnect();
});
//# sourceMappingURL=database.js.map