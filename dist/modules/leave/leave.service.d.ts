import { ApplyLeaveInput } from './leave.validation';
export declare class LeaveService {
    getLeaveTypes(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        defaultBalance: number;
        carryForward: boolean;
        maxCarryDays: number;
        isActive: boolean;
    }[]>;
    createLeaveType(data: {
        name: string;
        defaultBalance: number;
        carryForward?: boolean;
        maxCarryDays?: number;
    }): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        defaultBalance: number;
        carryForward: boolean;
        maxCarryDays: number;
        isActive: boolean;
    }>;
    updateLeaveType(id: string, data: {
        name?: string;
        defaultBalance?: number;
        carryForward?: boolean;
        maxCarryDays?: number;
        isActive?: boolean;
    }): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        defaultBalance: number;
        carryForward: boolean;
        maxCarryDays: number;
        isActive: boolean;
    }>;
    deleteLeaveType(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        defaultBalance: number;
        carryForward: boolean;
        maxCarryDays: number;
        isActive: boolean;
    }>;
    getBalance(employeeId: string, year?: number): Promise<({
        leaveType: {
            name: string;
        };
    } & {
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        leaveTypeId: string;
        allocated: number;
        used: number;
        remaining: number;
    })[]>;
    apply(employeeId: string, data: ApplyLeaveInput): Promise<{
        employee: {
            firstName: string;
            lastName: string;
        };
        leaveType: {
            name: string;
        };
    } & {
        status: string;
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        leaveTypeId: string;
        startDate: Date;
        endDate: Date;
        durationType: string;
        reason: string;
        duration: number;
        approverId: string | null;
        approverComment: string | null;
        approvedAt: Date | null;
    }>;
    getRequests(employeeId: string): Promise<({
        leaveType: {
            name: string;
        };
        approver: {
            firstName: string;
            lastName: string;
        } | null;
    } & {
        status: string;
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        leaveTypeId: string;
        startDate: Date;
        endDate: Date;
        durationType: string;
        reason: string;
        duration: number;
        approverId: string | null;
        approverComment: string | null;
        approvedAt: Date | null;
    })[]>;
    getTeamRequests(managerId: string, status?: string): Promise<({
        employee: {
            id: string;
            employeeCode: string;
            firstName: string;
            lastName: string;
        };
        leaveType: {
            name: string;
        };
    } & {
        status: string;
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        leaveTypeId: string;
        startDate: Date;
        endDate: Date;
        durationType: string;
        reason: string;
        duration: number;
        approverId: string | null;
        approverComment: string | null;
        approvedAt: Date | null;
    })[]>;
    getAllRequests(status?: string): Promise<({
        employee: {
            id: string;
            department: {
                name: string;
            };
            employeeCode: string;
            firstName: string;
            lastName: string;
        };
        leaveType: {
            name: string;
        };
        approver: {
            firstName: string;
            lastName: string;
        } | null;
    } & {
        status: string;
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        leaveTypeId: string;
        startDate: Date;
        endDate: Date;
        durationType: string;
        reason: string;
        duration: number;
        approverId: string | null;
        approverComment: string | null;
        approvedAt: Date | null;
    })[]>;
    approve(requestId: string, approverId: string, comment?: string): Promise<{
        employee: {
            firstName: string;
            lastName: string;
        };
        leaveType: {
            name: string;
        };
    } & {
        status: string;
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        leaveTypeId: string;
        startDate: Date;
        endDate: Date;
        durationType: string;
        reason: string;
        duration: number;
        approverId: string | null;
        approverComment: string | null;
        approvedAt: Date | null;
    }>;
    reject(requestId: string, approverId: string, comment?: string): Promise<{
        employee: {
            firstName: string;
            lastName: string;
        };
        leaveType: {
            name: string;
        };
    } & {
        status: string;
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        leaveTypeId: string;
        startDate: Date;
        endDate: Date;
        durationType: string;
        reason: string;
        duration: number;
        approverId: string | null;
        approverComment: string | null;
        approvedAt: Date | null;
    }>;
}
export declare const leaveService: LeaveService;
//# sourceMappingURL=leave.service.d.ts.map