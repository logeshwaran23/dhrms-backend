import { Request, Response, NextFunction } from 'express';
export declare class PerformanceController {
    getGoals(req: Request, res: Response, next: NextFunction): Promise<void>;
    createGoal(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateGoal(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAppraisals(req: Request, res: Response, next: NextFunction): Promise<void>;
    createAppraisal(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const performanceController: PerformanceController;
//# sourceMappingURL=performance.controller.d.ts.map