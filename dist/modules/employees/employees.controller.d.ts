import { Request, Response, NextFunction } from 'express';
export declare class EmployeeController {
    list(req: Request, res: Response, next: NextFunction): Promise<void>;
    getTeam(req: Request, res: Response, next: NextFunction): Promise<void>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void>;
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
    uploadAvatar(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const employeeController: EmployeeController;
//# sourceMappingURL=employees.controller.d.ts.map