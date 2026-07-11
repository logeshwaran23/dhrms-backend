export declare class AttendanceService {
    checkIn(employeeId: string): Promise<{
        checkInTime: string;
        status: string;
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        checkIn: Date | null;
        checkOut: Date | null;
        workHours: number | null;
        source: string;
        notes: string | null;
    }>;
    checkOut(employeeId: string): Promise<{
        checkOutTime: string;
        formattedWorkHours: string;
        status: string;
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        checkIn: Date | null;
        checkOut: Date | null;
        workHours: number | null;
        source: string;
        notes: string | null;
    }>;
    getTodayStatus(employeeId: string): Promise<{
        present: boolean;
        checkIn: null;
        checkOut: null;
        workHours: number;
        status: string;
        completed?: undefined;
    } | {
        present: boolean;
        checkIn: string | null;
        checkOut: string | null;
        workHours: number;
        status: string;
        completed: boolean;
    }>;
    getMyAttendance(employeeId: string, month?: number, year?: number): Promise<{
        status: string;
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        checkIn: Date | null;
        checkOut: Date | null;
        workHours: number | null;
        source: string;
        notes: string | null;
    }[]>;
    getTeamAttendance(managerId: string, date?: string): Promise<{
        id: string;
        date: Date;
        status: string;
        checkIn: Date | null;
        checkOut: Date | null;
        workHours: number | null;
        employee: {
            id: string;
            employeeCode: string;
            firstName: string;
            lastName: string;
        };
        employeeId?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        source?: string | undefined;
        notes?: string | null | undefined;
    }[]>;
    getAllAttendance(date?: string): Promise<{
        id: string;
        date: Date;
        status: string;
        checkIn: Date | null;
        checkOut: Date | null;
        workHours: number | null;
        employee: {
            id: string;
            department: {
                name: string;
            };
            employeeCode: string;
            firstName: string;
            lastName: string;
        };
        employeeId?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        source?: string | undefined;
        notes?: string | null | undefined;
    }[]>;
    requestRegularization(employeeId: string, attendanceId: string, reason: string, checkIn?: string, checkOut?: string): Promise<{
        status: string;
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        reason: string;
        approverId: string | null;
        approverComment: string | null;
        requestedCheckIn: Date | null;
        requestedCheckOut: Date | null;
        attendanceId: string;
    }>;
}
export declare const attendanceService: AttendanceService;
//# sourceMappingURL=attendance.service.d.ts.map