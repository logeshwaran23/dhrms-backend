"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const server = app_1.default.listen(config_1.env.PORT, () => {
    console.log(`\n🚀 HRMS Server running on http://localhost:${config_1.env.PORT}`);
    console.log(`📊 Environment: ${config_1.env.NODE_ENV}`);
    console.log(`🔗 Client URL: ${config_1.env.CLIENT_URL}\n`);
});
// Graceful shutdown
const shutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    // Disconnect Prisma to release DB connections
    await config_1.prisma.$disconnect().catch(console.error);
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
    // Force shutdown after 10 seconds
    setTimeout(() => {
        console.error('Could not close connections in time, forcing shutdown.');
        process.exit(1);
    }, 10000);
};
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
//# sourceMappingURL=server.js.map