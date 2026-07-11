export declare class AuthService {
    /**
     * Authenticate user with email and password.
     * Returns access token, refresh token, and user info.
     */
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: string;
            permissions: string[];
            employee: {
                id: string;
                firstName: string;
                lastName: string;
                name: string;
                employeeCode: string;
                avatar: string | null;
                department: string;
                designation: string;
            } | null;
        };
    }>;
    /**
     * Refresh access token using a valid refresh token.
     */
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    /**
     * Logout: invalidate refresh token.
     */
    logout(userId: string): Promise<void>;
    /**
     * Get current user data from token.
     */
    getMe(userId: string): Promise<{
        id: string;
        email: string;
        role: string;
        roleId: string;
        permissions: string[];
        employee: {
            id: string;
            firstName: string;
            lastName: string;
            name: string;
            employeeCode: string;
            avatar: string | null;
            phone: string | null;
            email: string;
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
                name: string;
            } | null;
            dateOfJoining: Date;
        } | null;
    }>;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map