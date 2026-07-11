"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_1 = require("./attendance.controller");
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.post('/check-in', middleware_1.authenticate, attendance_controller_1.attendanceController.checkIn);
router.post('/check-out', middleware_1.authenticate, attendance_controller_1.attendanceController.checkOut);
router.get('/today', middleware_1.authenticate, attendance_controller_1.attendanceController.getTodayStatus);
router.get('/', middleware_1.authenticate, attendance_controller_1.attendanceController.getMyAttendance);
router.get('/team', middleware_1.authenticate, (0, middleware_1.authorize)('attendance:read:team'), attendance_controller_1.attendanceController.getTeamAttendance);
router.get('/all', middleware_1.authenticate, (0, middleware_1.authorize)('attendance:read:all'), attendance_controller_1.attendanceController.getAllAttendance);
router.post('/regularize', middleware_1.authenticate, (0, middleware_1.authorize)('attendance:regularize'), attendance_controller_1.attendanceController.regularize);
exports.default = router;
//# sourceMappingURL=attendance.routes.js.map