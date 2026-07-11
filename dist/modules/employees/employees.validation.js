"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = exports.updateEmployeeSchema = exports.createEmployeeSchema = void 0;
const zod_1 = require("zod");
exports.createEmployeeSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name is required').max(100),
    lastName: zod_1.z.string().min(1, 'Last name is required').max(100),
    email: zod_1.z.string().email('Invalid email'),
    phone: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().optional(),
    dateOfJoining: zod_1.z.string().min(1, 'Date of joining is required'),
    gender: zod_1.z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
    departmentId: zod_1.z.string().min(1, 'Department is required'),
    designationId: zod_1.z.string().min(1, 'Designation is required'),
    managerId: zod_1.z.string().optional().nullable(),
    roleId: zod_1.z.string().min(1, 'Role is required'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters').optional(),
});
exports.updateEmployeeSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(100).optional(),
    lastName: zod_1.z.string().min(1).max(100).optional(),
    phone: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().optional(),
    gender: zod_1.z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
    departmentId: zod_1.z.string().optional(),
    designationId: zod_1.z.string().optional(),
    managerId: zod_1.z.string().optional().nullable(),
    status: zod_1.z.enum(['ACTIVE', 'INACTIVE', 'ON_NOTICE', 'TERMINATED']).optional(),
    address: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    pincode: zod_1.z.string().optional(),
    emergencyContact: zod_1.z.string().optional(),
    emergencyPhone: zod_1.z.string().optional(),
    bankName: zod_1.z.string().optional(),
    bankAccount: zod_1.z.string().optional(),
    ifscCode: zod_1.z.string().optional(),
    panNumber: zod_1.z.string().optional(),
    aadharNumber: zod_1.z.string().optional(),
    maritalStatus: zod_1.z.string().optional(),
    bloodGroup: zod_1.z.string().optional(),
});
exports.updateProfileSchema = zod_1.z.object({
    phone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    pincode: zod_1.z.string().optional(),
    emergencyContact: zod_1.z.string().optional(),
    emergencyPhone: zod_1.z.string().optional(),
    bankName: zod_1.z.string().optional(),
    bankAccount: zod_1.z.string().optional(),
    ifscCode: zod_1.z.string().optional(),
    maritalStatus: zod_1.z.string().optional(),
    bloodGroup: zod_1.z.string().optional(),
});
//# sourceMappingURL=employees.validation.js.map