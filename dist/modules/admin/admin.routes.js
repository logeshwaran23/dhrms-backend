"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const express_1 = require("express");
const config_1 = require("../../config");
const middleware_1 = require("../../middleware");
const utils_1 = require("../../utils");
const router = (0, express_1.Router)();
// ─── Roles ────────────────────────────────────────────────
router.get('/roles', middleware_1.authenticate, (0, middleware_1.authorize)('admin:manage_roles'), async (req, res, next) => {
    try {
        const roles = await config_1.prisma.role.findMany({
            include: {
                _count: { select: { users: true } },
                rolePermissions: { include: { permission: true } },
            },
            orderBy: { name: 'asc' },
        });
        res.json({ success: true, data: roles });
    }
    catch (error) {
        next(error);
    }
});
router.get('/roles/:id', middleware_1.authenticate, (0, middleware_1.authorize)('admin:manage_roles'), async (req, res, next) => {
    try {
        const role = await config_1.prisma.role.findUnique({
            where: { id: req.params.id },
            include: {
                rolePermissions: { include: { permission: true } },
            },
        });
        if (!role)
            throw new middleware_1.AppError('Role not found', 404);
        res.json({ success: true, data: role });
    }
    catch (error) {
        next(error);
    }
});
router.post('/roles', middleware_1.authenticate, (0, middleware_1.authorize)('admin:manage_roles'), async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const role = await config_1.prisma.role.create({ data: { name, description } });
        await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'CREATE', resource: 'role', resourceId: role.id, after: req.body, ip: req.ip });
        res.status(201).json({ success: true, data: role });
    }
    catch (error) {
        next(error);
    }
});
router.patch('/roles/:id/permissions', middleware_1.authenticate, (0, middleware_1.authorize)('admin:manage_roles'), async (req, res, next) => {
    try {
        const { permissionIds } = req.body;
        const roleId = req.params.id;
        // Check for system role protection
        const role = await config_1.prisma.role.findUnique({ where: { id: roleId } });
        if (!role)
            throw new middleware_1.AppError('Role not found', 404);
        // Replace all permissions
        await config_1.prisma.rolePermission.deleteMany({ where: { roleId } });
        await config_1.prisma.rolePermission.createMany({
            data: permissionIds.map((pid) => ({ roleId, permissionId: pid })),
        });
        await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'UPDATE_PERMISSIONS', resource: 'role', resourceId: roleId, after: { permissionIds }, ip: req.ip });
        res.json({ success: true, message: 'Permissions updated' });
    }
    catch (error) {
        next(error);
    }
});
// ─── Permissions ────────────────────────────────────────────
router.get('/permissions', middleware_1.authenticate, (0, middleware_1.authorize)('admin:manage_roles'), async (req, res, next) => {
    try {
        const permissions = await config_1.prisma.permission.findMany({ orderBy: [{ resource: 'asc' }, { action: 'asc' }] });
        res.json({ success: true, data: permissions });
    }
    catch (error) {
        next(error);
    }
});
// ─── Audit Logs ──────────────────────────────────────────────
router.get('/audit-logs', middleware_1.authenticate, (0, middleware_1.authorize)('audit:view'), async (req, res, next) => {
    try {
        const { page, limit, skip } = (0, utils_1.getPaginationParams)(req);
        const resource = req.query.resource;
        const action = req.query.action;
        const where = {};
        if (resource)
            where.resource = resource;
        if (action)
            where.action = action;
        const [logs, total] = await Promise.all([
            config_1.prisma.auditLog.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { user: { select: { email: true, employee: { select: { firstName: true, lastName: true } } } } },
            }),
            config_1.prisma.auditLog.count({ where }),
        ]);
        res.json({ success: true, ...(0, utils_1.createPaginatedResult)(logs, total, { page, limit, skip }) });
    }
    catch (error) {
        next(error);
    }
});
// ─── Departments ──────────────────────────────────────────────
router.get('/departments', middleware_1.authenticate, async (req, res, next) => {
    try {
        const departments = await config_1.prisma.department.findMany({
            include: {
                _count: { select: { employees: true } },
                designations: { select: { id: true, name: true } },
            },
            orderBy: { name: 'asc' },
        });
        res.json({ success: true, data: departments });
    }
    catch (error) {
        next(error);
    }
});
router.post('/departments', middleware_1.authenticate, (0, middleware_1.authorize)('admin:settings'), async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name)
            throw new middleware_1.AppError('Department name is required', 400);
        const department = await config_1.prisma.department.create({ data: { name } });
        await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'CREATE', resource: 'department', resourceId: department.id, after: { name }, ip: req.ip });
        res.status(201).json({ success: true, data: department });
    }
    catch (error) {
        next(error);
    }
});
// ─── Designations ──────────────────────────────────────────────
router.get('/designations', middleware_1.authenticate, async (req, res, next) => {
    try {
        const departmentId = req.query.departmentId;
        const where = departmentId ? { departmentId } : {};
        const designations = await config_1.prisma.designation.findMany({
            where,
            include: { department: { select: { name: true } } },
            orderBy: { name: 'asc' },
        });
        res.json({ success: true, data: designations });
    }
    catch (error) {
        next(error);
    }
});
// ─── System Config ──────────────────────────────────────────────
router.get('/settings', middleware_1.authenticate, (0, middleware_1.authorize)('admin:settings'), async (req, res, next) => {
    try {
        const settings = await config_1.prisma.systemConfig.findMany({ orderBy: { key: 'asc' } });
        res.json({ success: true, data: settings });
    }
    catch (error) {
        next(error);
    }
});
router.patch('/settings', middleware_1.authenticate, (0, middleware_1.authorize)('admin:settings'), async (req, res, next) => {
    try {
        const updates = req.body;
        for (const { key, value } of updates) {
            await config_1.prisma.systemConfig.upsert({
                where: { key },
                update: { value, updatedBy: req.user.userId },
                create: { key, value, updatedBy: req.user.userId },
            });
        }
        await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'UPDATE', resource: 'settings', after: req.body, ip: req.ip });
        res.json({ success: true, message: 'Settings updated' });
    }
    catch (error) {
        next(error);
    }
});
// ─── Holidays ──────────────────────────────────────────────────
router.get('/holidays', middleware_1.authenticate, async (req, res, next) => {
    try {
        const year = req.query.year ? parseInt(req.query.year) : new Date().getFullYear();
        const holidays = await config_1.prisma.holiday.findMany({
            where: { year },
            orderBy: { date: 'asc' },
        });
        res.json({ success: true, data: holidays });
    }
    catch (error) {
        next(error);
    }
});
router.post('/holidays', middleware_1.authenticate, (0, middleware_1.authorize)('admin:settings'), async (req, res, next) => {
    try {
        const { name, date, type, year } = req.body;
        if (!name || !date)
            throw new middleware_1.AppError('Holiday name and date are required', 400);
        const holiday = await config_1.prisma.holiday.create({
            data: { name, date: new Date(date), type, year: year || new Date(date).getFullYear() },
        });
        await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'CREATE', resource: 'holiday', resourceId: holiday.id, after: req.body, ip: req.ip });
        res.status(201).json({ success: true, data: holiday });
    }
    catch (error) {
        next(error);
    }
});
// ─── Users ──────────────────────────────────────────────────────
router.get('/users', middleware_1.authenticate, (0, middleware_1.authorize)('admin:manage_roles'), async (req, res, next) => {
    try {
        const { page, limit, skip } = (0, utils_1.getPaginationParams)(req);
        const search = req.query.search;
        const where = {};
        if (search) {
            where.OR = [
                { email: { contains: search } },
            ];
        }
        const [users, total] = await Promise.all([
            config_1.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    role: { select: { id: true, name: true } },
                    employee: { select: { id: true, firstName: true, lastName: true, employeeCode: true } }
                },
            }),
            config_1.prisma.user.count({ where }),
        ]);
        res.json({ success: true, ...(0, utils_1.createPaginatedResult)(users, total, { page, limit, skip }) });
    }
    catch (error) {
        next(error);
    }
});
router.post('/users', middleware_1.authenticate, (0, middleware_1.authorize)('admin:manage_roles'), async (req, res, next) => {
    try {
        const { email, password, roleId, status, employeeId } = req.body;
        if (!email || !password || !roleId)
            throw new middleware_1.AppError('Email, password, and role are required', 400);
        const passwordHash = await (0, utils_1.hashPassword)(password);
        const user = await config_1.prisma.user.create({
            data: {
                email,
                passwordHash,
                roleId,
                status: status || 'ACTIVE',
                employeeId: employeeId || null,
            },
        });
        await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'CREATE', resource: 'user', resourceId: user.id, after: { email, roleId, status }, ip: req.ip });
        res.status(201).json({ success: true, data: user, message: 'User created successfully' });
    }
    catch (error) {
        next(error);
    }
});
router.patch('/users/:id', middleware_1.authenticate, (0, middleware_1.authorize)('admin:manage_roles'), async (req, res, next) => {
    try {
        const { email, password, roleId, status, employeeId } = req.body;
        const data = {};
        if (email)
            data.email = email;
        if (password)
            data.passwordHash = await (0, utils_1.hashPassword)(password);
        if (roleId)
            data.roleId = roleId;
        if (status)
            data.status = status;
        if (employeeId !== undefined)
            data.employeeId = employeeId || null;
        const user = await config_1.prisma.user.update({
            where: { id: req.params.id },
            data,
        });
        await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'UPDATE', resource: 'user', resourceId: user.id, after: data, ip: req.ip });
        res.json({ success: true, data: user, message: 'User updated successfully' });
    }
    catch (error) {
        next(error);
    }
});
router.delete('/users/:id', middleware_1.authenticate, (0, middleware_1.authorize)('admin:manage_roles'), async (req, res, next) => {
    try {
        // Soft delete by marking as INACTIVE, or hard delete? Let's just delete the user record.
        await config_1.prisma.user.delete({ where: { id: req.params.id } });
        await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'DELETE', resource: 'user', resourceId: req.params.id, ip: req.ip });
        res.json({ success: true, message: 'User deleted successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=admin.routes.js.map