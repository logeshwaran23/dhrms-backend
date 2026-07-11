"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeController = exports.EmployeeController = void 0;
const employees_service_1 = require("./employees.service");
const utils_1 = require("../../utils");
const middleware_1 = require("../../middleware");
class EmployeeController {
    async list(req, res, next) {
        try {
            const result = await employees_service_1.employeeService.list(req);
            res.json({ success: true, ...result });
        }
        catch (error) {
            next(error);
        }
    }
    async getTeam(req, res, next) {
        try {
            const team = await employees_service_1.employeeService.getTeam(req.user.employeeId);
            res.json({ success: true, data: team });
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const employee = await employees_service_1.employeeService.getById(req.params.id);
            res.json({ success: true, data: employee });
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const employee = await employees_service_1.employeeService.create(req.body);
            await (0, utils_1.createAuditLog)({
                userId: req.user.userId,
                action: 'CREATE',
                resource: 'employee',
                resourceId: employee.id,
                after: req.body,
                ip: req.ip,
                userAgent: req.headers['user-agent'],
            });
            res.status(201).json({ success: true, data: employee, message: 'Employee created successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const before = await employees_service_1.employeeService.getById(req.params.id);
            const employee = await employees_service_1.employeeService.update(req.params.id, req.body);
            await (0, utils_1.createAuditLog)({
                userId: req.user.userId,
                action: 'UPDATE',
                resource: 'employee',
                resourceId: employee.id,
                before: before,
                after: req.body,
                ip: req.ip,
                userAgent: req.headers['user-agent'],
            });
            res.json({ success: true, data: employee, message: 'Employee updated successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async updateProfile(req, res, next) {
        try {
            if (!req.user?.employeeId)
                throw new middleware_1.AppError('Only linked employees can update their profile', 403);
            const employee = await employees_service_1.employeeService.updateProfile(req.user.employeeId, req.body);
            await (0, utils_1.createAuditLog)({
                userId: req.user.userId,
                action: 'UPDATE_PROFILE',
                resource: 'employee',
                resourceId: req.user.employeeId,
                after: req.body,
                ip: req.ip,
                userAgent: req.headers['user-agent'],
            });
            res.json({ success: true, data: employee, message: 'Profile updated successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async uploadAvatar(req, res, next) {
        try {
            if (!req.user?.employeeId)
                throw new middleware_1.AppError('Only linked employees can update their avatar', 403);
            if (!req.file)
                throw new middleware_1.AppError('No file uploaded', 400);
            // The file path relative to the root URL (e.g., /uploads/avatars/filename.jpg)
            const avatarPath = `/uploads/avatars/${req.file.filename}`;
            await employees_service_1.employeeService.updateAvatar(req.user.employeeId, avatarPath);
            await (0, utils_1.createAuditLog)({
                userId: req.user.userId,
                action: 'UPDATE_AVATAR',
                resource: 'employee',
                resourceId: req.user.employeeId,
                after: { avatar: avatarPath },
                ip: req.ip,
                userAgent: req.headers['user-agent'],
            });
            res.json({ success: true, avatarUrl: avatarPath, message: 'Profile photo updated' });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            await employees_service_1.employeeService.delete(req.params.id);
            await (0, utils_1.createAuditLog)({
                userId: req.user.userId,
                action: 'DELETE',
                resource: 'employee',
                resourceId: req.params.id,
                ip: req.ip,
                userAgent: req.headers['user-agent'],
            });
            res.json({ success: true, message: 'Employee deactivated successfully' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.EmployeeController = EmployeeController;
exports.employeeController = new EmployeeController();
//# sourceMappingURL=employees.controller.js.map