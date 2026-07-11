import { Request, Response, NextFunction } from 'express';
export declare class AttendanceController {
    checkIn(req: Request, res: Response, next: NextFunction): Promise<void>;
    checkOut(req: Request, res: Response, next: NextFunction): Promise<void>;
    getTodayStatus(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    getMyAttendance(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    getTeamAttendance(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    getAllAttendance(req: Request, res: Response, next: NextFunction): Promise<void>;
    regularize(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const attendanceController: AttendanceController;
//# sourceMappingURL=attendance.controller.d.ts.map