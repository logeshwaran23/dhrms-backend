"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuditLog = createAuditLog;
const config_1 = require("../config");
async function createAuditLog(entry) {
    try {
        await config_1.prisma.auditLog.create({
            data: {
                userId: entry.userId,
                action: entry.action,
                resource: entry.resource,
                resourceId: entry.resourceId,
                before: entry.before ? JSON.parse(JSON.stringify(entry.before)) : null,
                after: entry.after ? JSON.parse(JSON.stringify(entry.after)) : null,
                ip: entry.ip ?? null,
                userAgent: entry.userAgent ?? null,
            },
        });
    }
    catch (error) {
        // Audit logging should never break the main flow
        console.error('Failed to write audit log:', error);
    }
}
//# sourceMappingURL=auditLog.js.map