"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveActionSchema = exports.applyLeaveSchema = void 0;
const zod_1 = require("zod");
exports.applyLeaveSchema = zod_1.z.object({
    leaveTypeId: zod_1.z.string().min(1, 'Leave type is required'),
    startDate: zod_1.z.string().min(1, 'Start date is required'),
    endDate: zod_1.z.string().min(1, 'End date is required'),
    durationType: zod_1.z.enum(['FULL_DAY', 'HALF_DAY', 'SHORT_LEAVE']).default('FULL_DAY'),
    reason: zod_1.z.string().min(1, 'Reason is required'),
});
exports.leaveActionSchema = zod_1.z.object({
    comment: zod_1.z.string().optional(),
});
//# sourceMappingURL=leave.validation.js.map