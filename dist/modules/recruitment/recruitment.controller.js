"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recruitmentController = exports.RecruitmentController = void 0;
const config_1 = require("../../config");
class RecruitmentController {
    async getJobs(req, res, next) {
        try {
            const data = await config_1.prisma.jobPosting.findMany();
            res.json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    async getCandidates(req, res, next) {
        try {
            const data = await config_1.prisma.candidate.findMany();
            res.json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    async createCandidate(req, res, next) {
        try {
            const candidate = await config_1.prisma.candidate.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    jobId: req.body.jobId,
                    status: req.body.status || 'SCREENING',
                    appliedDate: req.body.appliedDate || new Date().toISOString(),
                    resumeUrl: req.body.resumeUrl,
                },
            });
            res.json({ success: true, message: 'Candidate added!', data: candidate });
        }
        catch (error) {
            next(error);
        }
    }
    async updateCandidateStatus(req, res, next) {
        try {
            const candidate = await config_1.prisma.candidate.update({
                where: { id: req.params.id },
                data: { status: req.body.status },
            });
            res.json({ success: true, message: 'Candidate status updated', data: candidate });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.RecruitmentController = RecruitmentController;
exports.recruitmentController = new RecruitmentController();
//# sourceMappingURL=recruitment.controller.js.map