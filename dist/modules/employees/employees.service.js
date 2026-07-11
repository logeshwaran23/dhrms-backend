"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeService = exports.EmployeeService = void 0;
const config_1 = require("../../config");
const utils_1 = require("../../utils");
const middleware_1 = require("../../middleware");
class EmployeeService {
    async list(req) {
        const { page, limit, skip } = (0, utils_1.getPaginationParams)(req);
        const search = req.query.search;
        const department = req.query.department;
        const status = req.query.status;
        const where = {};
        if (search) {
            where.OR = [
                { firstName: { contains: search } },
                { lastName: { contains: search } },
                { email: { contains: search } },
                { employeeCode: { contains: search } },
            ];
        }
        if (department)
            where.departmentId = department;
        if (status)
            where.status = status;
        const [employees, total] = await Promise.all([
            config_1.prisma.employee.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    department: { select: { id: true, name: true } },
                    designation: { select: { id: true, name: true } },
                    manager: { select: { id: true, firstName: true, lastName: true } },
                    user: { select: { id: true, role: { select: { name: true } } } },
                },
            }),
            config_1.prisma.employee.count({ where }),
        ]);
        return (0, utils_1.createPaginatedResult)(employees, total, { page, limit, skip });
    }
    async getTeam(managerId) {
        return config_1.prisma.employee.findMany({
            where: { managerId },
            include: {
                department: { select: { name: true } },
                designation: { select: { name: true } },
                user: { select: { role: { select: { name: true } } } },
            },
            orderBy: { firstName: 'asc' },
        });
    }
    async getById(id) {
        const employee = await config_1.prisma.employee.findUnique({
            where: { id },
            include: {
                department: { select: { id: true, name: true } },
                designation: { select: { id: true, name: true } },
                manager: { select: { id: true, firstName: true, lastName: true, email: true } },
                directReports: {
                    select: { id: true, firstName: true, lastName: true, email: true, employeeCode: true },
                },
                user: { select: { id: true, email: true, status: true, role: { select: { id: true, name: true } }, lastLogin: true } },
            },
        });
        if (!employee) {
            throw new middleware_1.AppError('Employee not found', 404, 'NOT_FOUND');
        }
        return employee;
    }
    async create(data) {
        // Generate employee code
        const lastEmployee = await config_1.prisma.employee.findFirst({
            orderBy: { employeeCode: 'desc' },
            select: { employeeCode: true },
        });
        let nextCode = 'DST-001';
        if (lastEmployee?.employeeCode) {
            const lastNum = parseInt(lastEmployee.employeeCode.split('-')[1]) || 0;
            nextCode = `DST-${String(lastNum + 1).padStart(3, '0')}`;
        }
        const existingUser = await config_1.prisma.user.findUnique({ where: { email: data.email } });
        if (existingUser && existingUser.employeeId) {
            throw new middleware_1.AppError('Email is already linked to another employee profile', 400);
        }
        const passwordHash = await (0, utils_1.hashPassword)(data.password || 'Welcome@123');
        // Create the employee record without the nested user create
        const employee = await config_1.prisma.employee.create({
            data: {
                employeeCode: nextCode,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
                dateOfJoining: new Date(data.dateOfJoining),
                gender: data.gender,
                departmentId: data.departmentId,
                designationId: data.designationId,
                managerId: data.managerId,
            },
        });
        if (existingUser) {
            // Link the existing user to the new employee
            await config_1.prisma.user.update({
                where: { id: existingUser.id },
                data: { employeeId: employee.id, roleId: data.roleId },
            });
        }
        else {
            // Create a new user and link it
            await config_1.prisma.user.create({
                data: {
                    email: data.email,
                    passwordHash,
                    roleId: data.roleId,
                    employeeId: employee.id,
                },
            });
        }
        // Refetch the complete employee record to return
        const createdEmployee = await config_1.prisma.employee.findUniqueOrThrow({
            where: { id: employee.id },
            include: {
                department: { select: { name: true } },
                designation: { select: { name: true } },
                user: { select: { role: { select: { name: true } } } },
            },
        });
        // Create leave balances for the new employee
        const leaveTypes = await config_1.prisma.leaveType.findMany({ where: { isActive: true } });
        const currentYear = new Date().getFullYear();
        await config_1.prisma.leaveBalance.createMany({
            data: leaveTypes.map((lt) => ({
                employeeId: employee.id,
                leaveTypeId: lt.id,
                year: currentYear,
                allocated: lt.defaultBalance,
                remaining: lt.defaultBalance,
            })),
        });
        return createdEmployee;
    }
    async update(id, data) {
        const employee = await config_1.prisma.employee.update({
            where: { id },
            data: {
                ...data,
                dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
            },
            include: {
                department: { select: { name: true } },
                designation: { select: { name: true } },
            },
        });
        return employee;
    }
    async updateProfile(employeeId, data) {
        return config_1.prisma.employee.update({
            where: { id: employeeId },
            data,
            include: {
                department: { select: { name: true } },
                designation: { select: { name: true } },
            },
        });
    }
    async updateAvatar(employeeId, avatarPath) {
        return config_1.prisma.employee.update({
            where: { id: employeeId },
            data: { avatar: avatarPath },
        });
    }
    async delete(id) {
        // Soft delete — mark as TERMINATED
        return config_1.prisma.employee.update({
            where: { id },
            data: { status: 'TERMINATED' },
        });
    }
}
exports.EmployeeService = EmployeeService;
exports.employeeService = new EmployeeService();
//# sourceMappingURL=employees.service.js.map