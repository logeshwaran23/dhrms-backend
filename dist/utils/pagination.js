"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationParams = getPaginationParams;
exports.createPaginatedResult = createPaginatedResult;
function getPaginationParams(req) {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;
    return { page, limit, skip };
}
function createPaginatedResult(data, total, params) {
    const totalPages = Math.ceil(total / params.limit);
    return {
        data,
        pagination: {
            page: params.page,
            limit: params.limit,
            total,
            totalPages,
            hasNext: params.page < totalPages,
            hasPrev: params.page > 1,
        },
    };
}
//# sourceMappingURL=pagination.js.map