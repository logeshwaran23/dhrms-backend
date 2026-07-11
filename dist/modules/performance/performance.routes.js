"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const performance_controller_1 = require("./performance.controller");
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.use(middleware_1.authenticate);
router.get('/goals', performance_controller_1.performanceController.getGoals);
router.post('/goals', performance_controller_1.performanceController.createGoal);
router.patch('/goals/:id', performance_controller_1.performanceController.updateGoal);
router.get('/appraisals', performance_controller_1.performanceController.getAppraisals);
router.post('/appraisals', performance_controller_1.performanceController.createAppraisal);
exports.default = router;
//# sourceMappingURL=performance.routes.js.map