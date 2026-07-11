"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
exports.getEffectiveScope = getEffectiveScope;
const utils_1 = require("../utils");
/**
 * Authorization middleware using permission strings.
 * Accepts multiple permissions with OR logic — the user must have at least one.
 *
 * Usage:
 *   authorize('employee:read:all')
 *   authorize('employee:read:own', 'employee:read:all')  // OR logic
 */
function authorize(...requiredPermissions) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Authentication required' });
            return;
        }
        const userPermissions = req.user.permissions || [];
        // Check if user has at least one of the required permissions
        const hasPermission = requiredPermissions.some((required) => {
            // Direct match
            if (userPermissions.includes(required))
                return true;
            // Check if user has a broader scope
            // e.g., 'employee:read:all' covers 'employee:read:own' and 'employee:read:team'
            const [resource, action, scope] = required.split(':');
            if (scope === 'own' || scope === 'team') {
                return userPermissions.includes(`${resource}:${action}:all`);
            }
            return false;
        });
        if (!hasPermission) {
            // Log unauthorized attempt
            (0, utils_1.createAuditLog)({
                userId: req.user.userId,
                action: 'UNAUTHORIZED_ACCESS',
                resource: req.originalUrl,
                ip: req.ip,
                userAgent: req.headers['user-agent'],
                after: { requiredPermissions, userPermissions },
            });
            res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action',
            });
            return;
        }
        next();
    };
}
/**
 * Check if current user can access a resource by scope.
 * Returns the effective scope: 'own', 'team', or 'all'.
 */
function getEffectiveScope(userPermissions, resource, action) {
    if (userPermissions.includes(`${resource}:${action}:all`))
        return 'all';
    if (userPermissions.includes(`${resource}:${action}:team`))
        return 'team';
    if (userPermissions.includes(`${resource}:${action}:own`))
        return 'own';
    if (userPermissions.includes(`${resource}:${action}`))
        return 'own';
    return null;
}
//# sourceMappingURL=authorize.js.map