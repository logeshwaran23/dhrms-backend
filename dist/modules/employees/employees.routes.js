"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../../config");
const employees_controller_1 = require("./employees.controller");
const middleware_1 = require("../../middleware");
const employees_validation_1 = require("./employees.validation");
const router = (0, express_1.Router)();
// Ensure upload directory exists for avatars
const uploadDir = path_1.default.resolve(config_1.env.UPLOAD_DIR, 'avatars');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'avatar-' + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (_req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Allowed: JPEG, PNG, WebP'));
        }
    },
});
// Self-service profile update (must be before /:id routes)
router.patch('/profile', middleware_1.authenticate, (0, middleware_1.validate)(employees_validation_1.updateProfileSchema), employees_controller_1.employeeController.updateProfile);
router.post('/profile/avatar', middleware_1.authenticate, upload.single('avatar'), employees_controller_1.employeeController.uploadAvatar);
// Team members (manager scope)
router.get('/team', middleware_1.authenticate, (0, middleware_1.authorize)('employee:read:team'), employees_controller_1.employeeController.getTeam);
// Full CRUD (HR/Admin)
router.get('/', middleware_1.authenticate, (0, middleware_1.authorize)('employee:read:all', 'employee:read:team'), employees_controller_1.employeeController.list);
router.get('/:id', middleware_1.authenticate, (0, middleware_1.authorize)('employee:read:own', 'employee:read:all'), employees_controller_1.employeeController.getById);
router.post('/', middleware_1.authenticate, (0, middleware_1.authorize)('employee:create'), (0, middleware_1.validate)(employees_validation_1.createEmployeeSchema), employees_controller_1.employeeController.create);
router.patch('/:id', middleware_1.authenticate, (0, middleware_1.authorize)('employee:update:all'), (0, middleware_1.validate)(employees_validation_1.updateEmployeeSchema), employees_controller_1.employeeController.update);
router.delete('/:id', middleware_1.authenticate, (0, middleware_1.authorize)('employee:delete'), employees_controller_1.employeeController.delete);
exports.default = router;
//# sourceMappingURL=employees.routes.js.map