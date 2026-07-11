interface AuditLogEntry {
    userId?: string;
    action: string;
    resource: string;
    resourceId?: string;
    before?: Record<string, unknown> | null;
    after?: Record<string, unknown> | null;
    ip?: string;
    userAgent?: string;
}
export declare function createAuditLog(entry: AuditLogEntry): Promise<void>;
export {};
//# sourceMappingURL=auditLog.d.ts.map