"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const express_1 = require("express");
const config_1 = require("../../config");
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
// Get dashboard data (role-scoped)
router.get('/', middleware_1.authenticate, async (req, res, next) => {
    try {
        const employeeId = req.user.employeeId;
        const roleName = req.user.roleName;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        // Attendance status for today
        const todayAttendance = await config_1.prisma.attendance.findUnique({
            where: { employeeId_date: { employeeId, date: today } },
        });
        // Leave balance
        const leaveBalances = await config_1.prisma.leaveBalance.findMany({
            where: { employeeId, year: currentYear },
            include: { leaveType: { select: { name: true } } },
        });
        const totalLeaveBalance = leaveBalances.reduce((sum, b) => sum + b.remaining, 0);
        // Pending leave requests
        const pendingLeaves = await config_1.prisma.leaveRequest.count({
            where: { employeeId, status: 'PENDING' },
        });
        // Monthly attendance stats
        const monthStart = new Date(currentYear, currentMonth - 1, 1);
        const monthEnd = new Date(currentYear, currentMonth, 0);
        const monthAttendances = await config_1.prisma.attendance.findMany({
            where: { employeeId, date: { gte: monthStart, lte: monthEnd } },
        });
        const presentDays = monthAttendances.filter(a => a.status === 'PRESENT').length;
        const totalWorkHours = monthAttendances.reduce((sum, a) => sum + (a.workHours || 0), 0);
        // Notifications
        const notifications = await config_1.prisma.notification.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' },
            take: 10,
        });
        const unreadCount = await config_1.prisma.notification.count({
            where: { userId: req.user.userId, isRead: false },
        });
        // Upcoming holidays
        const holidays = await config_1.prisma.holiday.findMany({
            where: { date: { gte: today }, year: currentYear },
            orderBy: { date: 'asc' },
            take: 5,
        });
        // Base response for all roles
        const dashboardData = {
            attendance: {
                present: !!todayAttendance?.checkIn && !todayAttendance?.checkOut,
                completed: !!todayAttendance?.checkOut,
                checkIn: todayAttendance?.checkIn?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) || null,
                checkOut: todayAttendance?.checkOut?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) || null,
                workHours: todayAttendance?.workHours || 0,
                status: todayAttendance?.status || 'ABSENT',
            },
            leaveBalance: totalLeaveBalance,
            leaveBalanceDetails: leaveBalances.map(b => ({
                type: b.leaveType.name,
                allocated: b.allocated,
                used: b.used,
                remaining: b.remaining,
            })),
            pendingLeaves,
            monthlyStats: {
                presentDays,
                totalWorkHours: Math.round(totalWorkHours * 10) / 10,
                workingDays: monthEnd.getDate(),
            },
            notifications,
            unreadNotifications: unreadCount,
            holidays,
        };
        // Manager-level stats
        if (['MANAGER', 'HR_ADMIN', 'SUPER_ADMIN'].includes(roleName)) {
            const teamWhere = roleName === 'MANAGER'
                ? { managerId: employeeId, status: 'ACTIVE' }
                : { status: 'ACTIVE' };
            const teamCount = await config_1.prisma.employee.count({ where: teamWhere });
            const teamIds = (await config_1.prisma.employee.findMany({
                where: teamWhere, select: { id: true },
            })).map(e => e.id);
            const teamPresentToday = await config_1.prisma.attendance.count({
                where: { employeeId: { in: teamIds }, date: today, status: 'PRESENT' },
            });
            const pendingApprovals = await config_1.prisma.leaveRequest.count({
                where: {
                    status: 'PENDING',
                    employee: roleName === 'MANAGER' ? { managerId: employeeId } : {},
                },
            });
            dashboardData.team = {
                totalMembers: teamCount,
                presentToday: teamPresentToday,
                absentToday: teamCount - teamPresentToday,
                pendingApprovals,
            };
        }
        // HR/Admin-level stats
        if (['HR_ADMIN', 'SUPER_ADMIN'].includes(roleName)) {
            const totalEmployees = await config_1.prisma.employee.count({ where: { status: 'ACTIVE' } });
            const departments = await config_1.prisma.department.findMany({
                include: { _count: { select: { employees: true } } },
            });
            const openTickets = await config_1.prisma.ticket.count({
                where: { status: { in: ['OPEN', 'IN_PROGRESS'] } },
            });
            dashboardData.organization = {
                totalEmployees,
                departments: departments.map(d => ({ name: d.name, count: d._count.employees })),
                openTickets,
            };
        }
        res.json({ success: true, data: dashboardData });
    }
    catch (error) {
        next(error);
    }
});
// Get notifications
router.get('/notifications', middleware_1.authenticate, async (req, res, next) => {
    try {
        const notifications = await config_1.prisma.notification.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
        res.json({ success: true, data: notifications });
    }
    catch (error) {
        next(error);
    }
});
// Mark notification as read
router.patch('/notifications/:id/read', middleware_1.authenticate, async (req, res, next) => {
    try {
        await config_1.prisma.notification.update({
            where: { id: req.params.id },
            data: { isRead: true },
        });
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=dashboard.routes.js.map