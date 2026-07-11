import { Request, Response, NextFunction } from 'express';
/**
 * Authorization middleware using permission strings.
 * Accepts multiple permissions with OR logic — the user must have at least one.
 *
 * Usage:
 *   authorize('employee:read:all')
 *   authorize('employee:read:own', 'employee:read:all')  // OR logic
 */
export declare function authorize(...requiredPermissions: string[]): (req: Request, res: Response, next: NextFunction) => void;
/**
 * Check if current user can access a resource by scope.
 * Returns the effective scope: 'own', 'team', or 'all'.
 */
export declare function getEffectiveScope(userPermissions: string[], resource: string, action: string): 'own' | 'team' | 'all' | null;
//# sourceMappingURL=authorize.d.ts.map