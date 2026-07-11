"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const middleware_1 = require("../../middleware");
const middleware_2 = require("../../middleware");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
router.post('/login', middleware_2.authLimiter, (0, middleware_1.validate)(auth_validation_1.loginSchema), auth_controller_1.authController.login);
router.post('/refresh', (0, middleware_1.validate)(auth_validation_1.refreshTokenSchema), auth_controller_1.authController.refresh);
router.post('/logout', middleware_1.authenticate, auth_controller_1.authController.logout);
router.get('/me', middleware_1.authenticate, auth_controller_1.authController.getMe);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map