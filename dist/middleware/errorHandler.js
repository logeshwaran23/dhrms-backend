"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.errorHandler = errorHandler;
class AppError extends Error {
    statusCode;
    code;
    constructor(message, statusCode, code = 'ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
function errorHandler(err, _req, res, _next) {
    console.error('Error:', err);
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            code: err.code,
        });
        return;
    }
    // Prisma errors
    if (err.constructor.name === 'PrismaClientKnownRequestError') {
        const prismaErr = err;
        if (prismaErr.code === 'P2002') {
            const target = prismaErr.meta?.target;
            res.status(409).json({
                success: false,
                message: `A record with this ${target?.[0] || 'value'} already exists`,
                code: 'DUPLICATE_ENTRY',
            });
            return;
        }
        if (prismaErr.code === 'P2025') {
            res.status(404).json({
                success: false,
                message: 'Record not found',
                code: 'NOT_FOUND',
            });
            return;
        }
    }
    // Fallback
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
        code: 'INTERNAL_ERROR',
    });
}
//# sourceMappingURL=errorHandler.js.map