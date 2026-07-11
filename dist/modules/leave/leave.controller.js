"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveController = exports.LeaveController = void 0;
const leave_service_1 = require("./leave.service");
const utils_1 = require("../../utils");
class LeaveController {
    async getLeaveTypes(_req, res, next) {
        try {
            const types = await leave_service_1.leaveService.getLeaveTypes();
            res.json({ success: true, data: types });
        }
        catch (error) {
            next(error);
        }
    }
    async createLeaveType(req, res, next) {
        try {
            const { name, defaultBalance, carryForward, maxCarryDays } = req.body;
            const type = await leave_service_1.leaveService.createLeaveType({ name, defaultBalance, carryForward, maxCarryDays });
            await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'CREATE', resource: 'leave_type', resourceId: type.id, after: req.body, ip: req.ip });
            res.status(201).json({ success: true, data: type, message: 'Leave type created successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async updateLeaveType(req, res, next) {
        try {
            const { name, defaultBalance, carryForward, maxCarryDays, isActive } = req.body;
            const type = await leave_service_1.leaveService.updateLeaveType(req.params.id, { name, defaultBalance, carryForward, maxCarryDays, isActive });
            await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'UPDATE', resource: 'leave_type', resourceId: type.id, after: req.body, ip: req.ip });
            res.json({ success: true, data: type, message: 'Leave type updated successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteLeaveType(req, res, next) {
        try {
            const type = await leave_service_1.leaveService.deleteLeaveType(req.params.id);
            await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'DELETE', resource: 'leave_type', resourceId: req.params.id, ip: req.ip });
            res.json({ success: true, data: type, message: 'Leave type deleted successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async getBalance(req, res, next) {
        try {
            const employeeId = req.params.employeeId || req.user.employeeId;
            const year = req.query.year ? parseInt(req.query.year) : undefined;
            const balances = await leave_service_1.leaveService.getBalance(employeeId, year);
            res.json({ success: true, data: balances });
        }
        catch (error) {
            next(error);
        }
    }
    async apply(req, res, next) {
        try {
            const result = await leave_service_1.leaveService.apply(req.user.employeeId, req.body);
            await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'APPLY', resource: 'leave', resourceId: result.id, after: req.body, ip: req.ip });
            res.status(201).json({ success: true, data: result, message: 'Leave request submitted successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async getRequests(req, res, next) {
        try {
            const requests = await leave_service_1.leaveService.getRequests(req.user.employeeId);
            res.json({ success: true, data: requests });
        }
        catch (error) {
            next(error);
        }
    }
    async getTeamRequests(req, res, next) {
        try {
            const status = req.query.status;
            const requests = await leave_service_1.leaveService.getTeamRequests(req.user.employeeId, status);
            res.json({ success: true, data: requests });
        }
        catch (error) {
            next(error);
        }
    }
    async getAllRequests(req, res, next) {
        try {
            const status = req.query.status;
            const requests = await leave_service_1.leaveService.getAllRequests(status);
            res.json({ success: true, data: requests });
        }
        catch (error) {
            next(error);
        }
    }
    async approve(req, res, next) {
        try {
            const result = await leave_service_1.leaveService.approve(req.params.id, req.user.employeeId, req.body.comment);
            await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'APPROVE', resource: 'leave', resourceId: req.params.id, ip: req.ip });
            res.json({ success: true, data: result, message: 'Leave approved' });
        }
        catch (error) {
            next(error);
        }
    }
    async reject(req, res, next) {
        try {
            const result = await leave_service_1.leaveService.reject(req.params.id, req.user.employeeId, req.body.comment);
            await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'REJECT', resource: 'leave', resourceId: req.params.id, ip: req.ip });
            res.json({ success: true, data: result, message: 'Leave rejected' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.LeaveController = LeaveController;
exports.leaveController = new LeaveController();
//# sourceMappingURL=leave.controller.js.map