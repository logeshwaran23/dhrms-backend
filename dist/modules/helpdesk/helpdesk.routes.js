"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const config_1 = require("../../config");
const middleware_1 = require("../../middleware");
const utils_1 = require("../../utils");
const router = (0, express_1.Router)();
const createTicketSchema = zod_1.z.object({
    category: zod_1.z.enum(['PAYROLL', 'LEAVE', 'ATTENDANCE', 'IT_SUPPORT', 'POLICY', 'GENERAL', 'GRIEVANCE']),
    subject: zod_1.z.string().min(1, 'Subject is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    priority: zod_1.z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
});
const resolveTicketSchema = zod_1.z.object({
    resolution: zod_1.z.string().min(1, 'Resolution is required'),
});
// Create ticket
router.post('/', middleware_1.authenticate, (0, middleware_1.validate)(createTicketSchema), async (req, res, next) => {
    try {
        const ticket = await config_1.prisma.ticket.create({
            data: { employeeId: req.user.employeeId, ...req.body },
        });
        await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'CREATE', resource: 'ticket', resourceId: ticket.id, ip: req.ip });
        res.status(201).json({ success: true, data: ticket, message: 'Ticket created successfully' });
    }
    catch (error) {
        next(error);
    }
});
// Get own tickets
router.get('/', middleware_1.authenticate, async (req, res, next) => {
    try {
        const userPerms = req.user.permissions || [];
        const isHR = userPerms.includes('helpdesk:manage');
        const where = isHR ? {} : { employeeId: req.user.employeeId };
        if (req.query.status) {
            where.status = req.query.status;
        }
        const tickets = await config_1.prisma.ticket.findMany({
            where,
            include: {
                employee: { select: { firstName: true, lastName: true, employeeCode: true } },
                assignee: { select: { firstName: true, lastName: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json({ success: true, data: tickets });
    }
    catch (error) {
        next(error);
    }
});
// Resolve ticket
router.patch('/:id/resolve', middleware_1.authenticate, (0, middleware_1.authorize)('helpdesk:manage'), (0, middleware_1.validate)(resolveTicketSchema), async (req, res, next) => {
    try {
        const ticket = await config_1.prisma.ticket.findUnique({ where: { id: req.params.id } });
        if (!ticket)
            throw new middleware_1.AppError('Ticket not found', 404);
        const updated = await config_1.prisma.ticket.update({
            where: { id: req.params.id },
            data: {
                status: 'RESOLVED',
                resolution: req.body.resolution,
                resolvedAt: new Date(),
                assignedTo: req.user.employeeId,
            },
        });
        await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'RESOLVE', resource: 'ticket', resourceId: req.params.id, ip: req.ip });
        res.json({ success: true, data: updated, message: 'Ticket resolved' });
    }
    catch (error) {
        next(error);
    }
});
// Update ticket status
router.patch('/:id/status', middleware_1.authenticate, (0, middleware_1.authorize)('helpdesk:manage'), async (req, res, next) => {
    try {
        const { status } = req.body;
        const updated = await config_1.prisma.ticket.update({
            where: { id: req.params.id },
            data: { status, assignedTo: req.user.employeeId },
        });
        res.json({ success: true, data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=helpdesk.routes.js.map