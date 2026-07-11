"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceController = exports.AttendanceController = void 0;
const attendance_service_1 = require("./attendance.service");
const utils_1 = require("../../utils");
class AttendanceController {
    async checkIn(req, res, next) {
        try {
            if (!req.user?.employeeId)
                throw new AppError('Only employees can check in', 403);
            const result = await attendance_service_1.attendanceService.checkIn(req.user.employeeId);
            await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'CHECK_IN', resource: 'attendance', ip: req.ip });
            res.json({ success: true, data: result, message: 'Checked in successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async checkOut(req, res, next) {
        try {
            if (!req.user?.employeeId)
                throw new AppError('Only employees can check out', 403);
            const result = await attendance_service_1.attendanceService.checkOut(req.user.employeeId);
            await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'CHECK_OUT', resource: 'attendance', ip: req.ip });
            res.json({ success: true, data: result, message: 'Checked out successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async getTodayStatus(req, res, next) {
        try {
            if (!req.user?.employeeId)
                return res.json({ success: true, data: { present: false, status: 'NOT_APPLICABLE' } });
            const result = await attendance_service_1.attendanceService.getTodayStatus(req.user.employeeId);
            res.json({ success: true, data: result });
        }
        catch (error) {
            next(error);
        }
    }
    async getMyAttendance(req, res, next) {
        try {
            if (!req.user?.employeeId)
                return res.json({ success: true, data: [] });
            const month = req.query.month ? parseInt(req.query.month) : undefined;
            const year = req.query.year ? parseInt(req.query.year) : undefined;
            const data = await attendance_service_1.attendanceService.getMyAttendance(req.user.employeeId, month, year);
            res.json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    async getTeamAttendance(req, res, next) {
        try {
            if (!req.user?.employeeId)
                return res.json({ success: true, data: [] });
            const data = await attendance_service_1.attendanceService.getTeamAttendance(req.user.employeeId, req.query.date);
            res.json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    async getAllAttendance(req, res, next) {
        try {
            const data = await attendance_service_1.attendanceService.getAllAttendance(req.query.date);
            res.json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    async regularize(req, res, next) {
        try {
            if (!req.user?.employeeId)
                throw new AppError('Only employees can regularize attendance', 403);
            const { attendanceId, reason, checkIn, checkOut } = req.body;
            const result = await attendance_service_1.attendanceService.requestRegularization(req.user.employeeId, attendanceId, reason, checkIn, checkOut);
            await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'REGULARIZE', resource: 'attendance', resourceId: attendanceId, ip: req.ip });
            res.json({ success: true, data: result, message: 'Regularization request submitted' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AttendanceController = AttendanceController;
exports.attendanceController = new AttendanceController();
//# sourceMappingURL=attendance.controller.js.map