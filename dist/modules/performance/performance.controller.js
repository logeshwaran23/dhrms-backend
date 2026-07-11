"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceController = exports.PerformanceController = void 0;
const config_1 = require("../../config");
class PerformanceController {
    async getGoals(req, res, next) {
        try {
            const { employeeId } = req.query;
            const data = await config_1.prisma.performanceGoal.findMany({
                where: employeeId ? { employeeId: employeeId } : undefined,
            });
            res.json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    async createGoal(req, res, next) {
        try {
            const goal = await config_1.prisma.performanceGoal.create({
                data: {
                    employeeId: req.body.employeeId,
                    title: req.body.title,
                    description: req.body.description,
                    dueDate: req.body.dueDate,
                    status: req.body.status || 'NOT_STARTED',
                    progress: req.body.progress || 0,
                },
            });
            res.json({ success: true, message: 'Goal created!', data: goal });
        }
        catch (error) {
            next(error);
        }
    }
    async updateGoal(req, res, next) {
        try {
            const { id } = req.params;
            const { status, progress } = req.body;
            const goal = await config_1.prisma.performanceGoal.update({
                where: { id },
                data: {
                    ...(status && { status }),
                    ...(progress !== undefined && { progress: Number(progress) })
                },
            });
            res.json({ success: true, message: 'Goal updated!', data: goal });
        }
        catch (error) {
            next(error);
        }
    }
    async getAppraisals(req, res, next) {
        try {
            const { employeeId } = req.query;
            const data = await config_1.prisma.performanceAppraisal.findMany({
                where: employeeId ? { employeeId: employeeId } : undefined,
            });
            res.json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    async createAppraisal(req, res, next) {
        try {
            const { employeeId, year, rating, feedback } = req.body;
            const managerName = req.user?.employee ? `${req.user.employee.firstName} ${req.user.employee.lastName}` : req.user.email;
            const appraisal = await config_1.prisma.performanceAppraisal.create({
                data: {
                    employeeId,
                    year: Number(year),
                    rating: Number(rating),
                    feedback,
                    managerName,
                },
            });
            res.json({ success: true, message: 'Appraisal created!', data: appraisal });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PerformanceController = PerformanceController;
exports.performanceController = new PerformanceController();
//# sourceMappingURL=performance.controller.js.map