import { Request, Response, NextFunction } from 'express';
import { TokenPayload } from '../utils';
declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}
export declare function authenticate(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=authenticate.d.ts.map