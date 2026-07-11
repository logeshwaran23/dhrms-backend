import { Request } from 'express';
export interface PaginationParams {
    page: number;
    limit: number;
    skip: number;
}
export interface PaginatedResult<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
export declare function getPaginationParams(req: Request): PaginationParams;
export declare function createPaginatedResult<T>(data: T[], total: number, params: PaginationParams): PaginatedResult<T>;
//# sourceMappingURL=pagination.d.ts.map