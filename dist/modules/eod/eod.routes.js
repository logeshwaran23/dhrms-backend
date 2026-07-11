"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const config_1 = require("../../config");
const middleware_1 = require("../../middleware");
const utils_1 = require("../../utils");
const router = (0, express_1.Router)();
const eodSchema = zod_1.z.object({
    summary: zod_1.z.string().min(1, 'Summary is required'),
    completedTasks: zod_1.z.string().min(1, 'Completed tasks are required'),
    workLocation: zod_1.z.string().default('Office'),
    extraHours: zod_1.z.coerce.number().default(0),
});
// Submit EOD
router.post('/', middleware_1.authenticate, (0, middleware_1.validate)(eodSchema), async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const existing = await config_1.prisma.eODReport.findUnique({
            where: { employeeId_date: { employeeId: req.user.employeeId, date: today } },
        });
        if (existing) {
            // Update existing
            const updated = await config_1.prisma.eODReport.update({
                where: { id: existing.id },
                data: req.body,
            });
            res.json({ success: true, data: updated, message: 'EOD report updated' });
            return;
        }
        const report = await config_1.prisma.eODReport.create({
            data: { employeeId: req.user.employeeId, date: today, ...req.body },
        });
        await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'SUBMIT', resource: 'eod', resourceId: report.id, ip: req.ip });
        res.status(201).json({ success: true, data: report, message: 'EOD report submitted' });
    }
    catch (error) {
        next(error);
    }
});
// Get own EOD reports
router.get('/', middleware_1.authenticate, async (req, res, next) => {
    try {
        const reports = await config_1.prisma.eODReport.findMany({
            where: { employeeId: req.user.employeeId },
            orderBy: { date: 'desc' },
            take: 30,
        });
        res.json({ success: true, data: reports });
    }
    catch (error) {
        next(error);
    }
});
// Get team EOD reports
router.get('/team', middleware_1.authenticate, (0, middleware_1.authorize)('eod:read:team'), async (req, res, next) => {
    try {
        const date = req.query.date ? new Date(req.query.date) : new Date();
        date.setHours(0, 0, 0, 0);
        const reports = await config_1.prisma.eODReport.findMany({
            where: {
                date,
                employee: { managerId: req.user.employeeId },
            },
            include: { employee: { select: { firstName: true, lastName: true, employeeCode: true } } },
            orderBy: { createdAt: 'desc' },
        });
        res.json({ success: true, data: reports });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=eod.routes.js.map