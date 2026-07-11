import { Request, Response, NextFunction } from 'express';
export declare class LeaveController {
    getLeaveTypes(_req: Request, res: Response, next: NextFunction): Promise<void>;
    createLeaveType(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateLeaveType(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteLeaveType(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBalance(req: Request, res: Response, next: NextFunction): Promise<void>;
    apply(req: Request, res: Response, next: NextFunction): Promise<void>;
    getRequests(req: Request, res: Response, next: NextFunction): Promise<void>;
    getTeamRequests(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllRequests(req: Request, res: Response, next: NextFunction): Promise<void>;
    approve(req: Request, res: Response, next: NextFunction): Promise<void>;
    reject(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const leaveController: LeaveController;
//# sourceMappingURL=leave.controller.d.ts.map