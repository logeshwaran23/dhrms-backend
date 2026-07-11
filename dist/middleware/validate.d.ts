import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
/**
 * Zod validation middleware.
 * Validates req.body, req.query, or req.params.
 *
 * Usage:
 *   validate(loginSchema)           // validates req.body
 *   validate(querySchema, 'query')  // validates req.query
 */
export declare function validate(schema: ZodSchema, source?: 'body' | 'query' | 'params'): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.d.ts.map