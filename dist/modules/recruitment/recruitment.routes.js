"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recruitment_controller_1 = require("./recruitment.controller");
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.use(middleware_1.authenticate);
router.get('/jobs', recruitment_controller_1.recruitmentController.getJobs);
router.get('/candidates', recruitment_controller_1.recruitmentController.getCandidates);
router.post('/candidates', recruitment_controller_1.recruitmentController.createCandidate);
router.patch('/candidates/:id/status', recruitment_controller_1.recruitmentController.updateCandidateStatus);
exports.default = router;
//# sourceMappingURL=recruitment.routes.js.map