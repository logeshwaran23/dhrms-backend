"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../../config");
const config_2 = require("../../config");
const middleware_1 = require("../../middleware");
const utils_1 = require("../../utils");
const router = (0, express_1.Router)();
// Ensure upload directory exists
const uploadDir = path_1.default.resolve(config_2.env.UPLOAD_DIR);
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (_req, file, cb) => {
        const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Allowed: PDF, JPEG, PNG, WebP, DOC, DOCX'));
        }
    },
});
// Upload document
router.post('/upload', middleware_1.authenticate, upload.single('file'), async (req, res, next) => {
    try {
        if (!req.file)
            throw new middleware_1.AppError('No file uploaded', 400);
        const doc = await config_1.prisma.document.create({
            data: {
                employeeId: req.user.employeeId,
                name: req.body.name || req.file.originalname,
                type: req.body.type || 'OTHER',
                filePath: req.file.path,
                fileSize: req.file.size,
                mimeType: req.file.mimetype,
            },
        });
        await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'UPLOAD', resource: 'document', resourceId: doc.id, ip: req.ip });
        res.status(201).json({ success: true, data: doc, message: 'Document uploaded successfully' });
    }
    catch (error) {
        next(error);
    }
});
// Get own documents
router.get('/', middleware_1.authenticate, async (req, res, next) => {
    try {
        const docs = await config_1.prisma.document.findMany({
            where: { employeeId: req.user.employeeId },
            orderBy: { uploadedAt: 'desc' },
        });
        res.json({ success: true, data: docs });
    }
    catch (error) {
        next(error);
    }
});
// Get employee documents (HR)
router.get('/:employeeId', middleware_1.authenticate, (0, middleware_1.authorize)('document:read:all'), async (req, res, next) => {
    try {
        const docs = await config_1.prisma.document.findMany({
            where: { employeeId: req.params.employeeId },
            orderBy: { uploadedAt: 'desc' },
        });
        res.json({ success: true, data: docs });
    }
    catch (error) {
        next(error);
    }
});
// Verify document (HR)
router.patch('/:id/verify', middleware_1.authenticate, (0, middleware_1.authorize)('document:read:all'), async (req, res, next) => {
    try {
        const doc = await config_1.prisma.document.update({
            where: { id: req.params.id },
            data: { verified: true, verifiedBy: req.user.userId },
        });
        await (0, utils_1.createAuditLog)({ userId: req.user.userId, action: 'VERIFY', resource: 'document', resourceId: doc.id, ip: req.ip });
        res.json({ success: true, data: doc, message: 'Document verified' });
    }
    catch (error) {
        next(error);
    }
});
// Download document
router.get('/:id/download', middleware_1.authenticate, async (req, res, next) => {
    try {
        const doc = await config_1.prisma.document.findUnique({ where: { id: req.params.id } });
        if (!doc)
            throw new middleware_1.AppError('Document not found', 404);
        // Check ownership or HR access
        const userPerms = req.user.permissions || [];
        if (doc.employeeId !== req.user.employeeId && !userPerms.includes('document:read:all')) {
            throw new middleware_1.AppError('Access denied', 403);
        }
        res.download(doc.filePath, doc.name);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=documents.routes.js.map