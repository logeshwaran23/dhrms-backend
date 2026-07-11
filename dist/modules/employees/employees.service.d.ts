import { Request } from 'express';
import { CreateEmployeeInput, UpdateEmployeeInput, UpdateProfileInput } from './employees.validation';
export declare class EmployeeService {
    list(req: Request): Promise<import("../../utils").PaginatedResult<{
        user: {
            id: string;
            role: {
                name: string;
            };
        } | null;
        department: {
            name: string;
            id: string;
        };
        designation: {
            name: string;
            id: string;
        };
        manager: {
            id: string;
            firstName: string;
            lastName: string;
        } | null;
    } & {
        status: string;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        employeeCode: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        dateOfBirth: Date | null;
        dateOfJoining: Date;
        gender: string | null;
        maritalStatus: string | null;
        bloodGroup: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        pincode: string | null;
        emergencyContact: string | null;
        emergencyPhone: string | null;
        bankName: string | null;
        bankAccount: string | null;
        ifscCode: string | null;
        panNumber: string | null;
        aadharNumber: string | null;
        avatar: string | null;
        departmentId: string;
        designationId: string;
        managerId: string | null;
    }>>;
    getTeam(managerId: string): Promise<({
        user: {
            role: {
                name: string;
            };
        } | null;
        department: {
            name: string;
        };
        designation: {
            name: string;
        };
    } & {
        status: string;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        employeeCode: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        dateOfBirth: Date | null;
        dateOfJoining: Date;
        gender: string | null;
        maritalStatus: string | null;
        bloodGroup: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        pincode: string | null;
        emergencyContact: string | null;
        emergencyPhone: string | null;
        bankName: string | null;
        bankAccount: string | null;
        ifscCode: string | null;
        panNumber: string | null;
        aadharNumber: string | null;
        avatar: string | null;
        departmentId: string;
        designationId: string;
        managerId: string | null;
    })[]>;
    getById(id: string): Promise<{
        user: {
            status: string;
            id: string;
            email: string;
            lastLogin: Date | null;
            role: {
                name: string;
                id: string;
            };
        } | null;
        department: {
            name: string;
            id: string;
        };
        designation: {
            name: string;
            id: string;
        };
        manager: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        } | null;
        directReports: {
            id: string;
            email: string;
            employeeCode: string;
            firstName: string;
            lastName: string;
        }[];
    } & {
        status: string;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        employeeCode: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        dateOfBirth: Date | null;
        dateOfJoining: Date;
        gender: string | null;
        maritalStatus: string | null;
        bloodGroup: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        pincode: string | null;
        emergencyContact: string | null;
        emergencyPhone: string | null;
        bankName: string | null;
        bankAccount: string | null;
        ifscCode: string | null;
        panNumber: string | null;
        aadharNumber: string | null;
        avatar: string | null;
        departmentId: string;
        designationId: string;
        managerId: string | null;
    }>;
    create(data: CreateEmployeeInput): Promise<{
        user: {
            role: {
                name: string;
            };
        } | null;
        department: {
            name: string;
        };
        designation: {
            name: string;
        };
    } & {
        status: string;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        employeeCode: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        dateOfBirth: Date | null;
        dateOfJoining: Date;
        gender: string | null;
        maritalStatus: string | null;
        bloodGroup: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        pincode: string | null;
        emergencyContact: string | null;
        emergencyPhone: string | null;
        bankName: string | null;
        bankAccount: string | null;
        ifscCode: string | null;
        panNumber: string | null;
        aadharNumber: string | null;
        avatar: string | null;
        departmentId: string;
        designationId: string;
        managerId: string | null;
    }>;
    update(id: string, data: UpdateEmployeeInput): Promise<{
        department: {
            name: string;
        };
        designation: {
            name: string;
        };
    } & {
        status: string;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        employeeCode: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        dateOfBirth: Date | null;
        dateOfJoining: Date;
        gender: string | null;
        maritalStatus: string | null;
        bloodGroup: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        pincode: string | null;
        emergencyContact: string | null;
        emergencyPhone: string | null;
        bankName: string | null;
        bankAccount: string | null;
        ifscCode: string | null;
        panNumber: string | null;
        aadharNumber: string | null;
        avatar: string | null;
        departmentId: string;
        designationId: string;
        managerId: string | null;
    }>;
    updateProfile(employeeId: string, data: UpdateProfileInput): Promise<{
        department: {
            name: string;
        };
        designation: {
            name: string;
        };
    } & {
        status: string;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        employeeCode: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        dateOfBirth: Date | null;
        dateOfJoining: Date;
        gender: string | null;
        maritalStatus: string | null;
        bloodGroup: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        pincode: string | null;
        emergencyContact: string | null;
        emergencyPhone: string | null;
        bankName: string | null;
        bankAccount: string | null;
        ifscCode: string | null;
        panNumber: string | null;
        aadharNumber: string | null;
        avatar: string | null;
        departmentId: string;
        designationId: string;
        managerId: string | null;
    }>;
    updateAvatar(employeeId: string, avatarPath: string): Promise<{
        status: string;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        employeeCode: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        dateOfBirth: Date | null;
        dateOfJoining: Date;
        gender: string | null;
        maritalStatus: string | null;
        bloodGroup: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        pincode: string | null;
        emergencyContact: string | null;
        emergencyPhone: string | null;
        bankName: string | null;
        bankAccount: string | null;
        ifscCode: string | null;
        panNumber: string | null;
        aadharNumber: string | null;
        avatar: string | null;
        departmentId: string;
        designationId: string;
        managerId: string | null;
    }>;
    delete(id: string): Promise<{
        status: string;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        employeeCode: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        dateOfBirth: Date | null;
        dateOfJoining: Date;
        gender: string | null;
        maritalStatus: string | null;
        bloodGroup: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        pincode: string | null;
        emergencyContact: string | null;
        emergencyPhone: string | null;
        bankName: string | null;
        bankAccount: string | null;
        ifscCode: string | null;
        panNumber: string | null;
        aadharNumber: string | null;
        avatar: string | null;
        departmentId: string;
        designationId: string;
        managerId: string | null;
    }>;
}
export declare const employeeService: EmployeeService;
//# sourceMappingURL=employees.service.d.ts.map