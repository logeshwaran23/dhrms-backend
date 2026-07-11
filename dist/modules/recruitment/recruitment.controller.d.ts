import { Request, Response, NextFunction } from 'express';
export declare class RecruitmentController {
    getJobs(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCandidates(req: Request, res: Response, next: NextFunction): Promise<void>;
    createCandidate(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateCandidateStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const recruitmentController: RecruitmentController;
//# sourceMappingURL=recruitment.controller.d.ts.map