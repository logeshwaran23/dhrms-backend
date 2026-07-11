import { z } from 'zod';
export declare const applyLeaveSchema: z.ZodObject<{
    leaveTypeId: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodString;
    durationType: z.ZodDefault<z.ZodEnum<["FULL_DAY", "HALF_DAY", "SHORT_LEAVE"]>>;
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    leaveTypeId: string;
    startDate: string;
    endDate: string;
    durationType: "FULL_DAY" | "HALF_DAY" | "SHORT_LEAVE";
    reason: string;
}, {
    leaveTypeId: string;
    startDate: string;
    endDate: string;
    reason: string;
    durationType?: "FULL_DAY" | "HALF_DAY" | "SHORT_LEAVE" | undefined;
}>;
export declare const leaveActionSchema: z.ZodObject<{
    comment: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    comment?: string | undefined;
}, {
    comment?: string | undefined;
}>;
export type ApplyLeaveInput = z.infer<typeof applyLeaveSchema>;
//# sourceMappingURL=leave.validation.d.ts.map