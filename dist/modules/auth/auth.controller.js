"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const utils_1 = require("../../utils");
class AuthController {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await auth_service_1.authService.login(email, password);
            await (0, utils_1.createAuditLog)({
                userId: result.user.id,
                action: 'LOGIN',
                resource: 'auth',
                ip: req.ip,
                userAgent: req.headers['user-agent'],
            });
            res.json({ success: true, ...result });
        }
        catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const result = await auth_service_1.authService.refreshToken(refreshToken);
            res.json({ success: true, ...result });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            await auth_service_1.authService.logout(req.user.userId);
            await (0, utils_1.createAuditLog)({
                userId: req.user.userId,
                action: 'LOGOUT',
                resource: 'auth',
                ip: req.ip,
                userAgent: req.headers['user-agent'],
            });
            res.json({ success: true, message: 'Logged out successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async getMe(req, res, next) {
        try {
            const user = await auth_service_1.authService.getMe(req.user.userId);
            res.json({ success: true, user });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map