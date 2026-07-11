export interface TokenPayload {
    userId: string;
    role?: string;
    email?: string;
    employeeId?: string;
    permissions?: string[];
    roleName?: string;
    employee?: any;
}
export declare const signAccessToken: (payload: TokenPayload) => string;
export declare const signRefreshToken: (payload: TokenPayload) => string;
export declare const verifyAccessToken: (token: string) => TokenPayload;
export declare const verifyRefreshToken: (token: string) => TokenPayload;
export type TokenPayloadType = TokenPayload;
//# sourceMappingURL=jwt.d.ts.map