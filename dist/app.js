"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
// Route imports
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const employees_routes_1 = __importDefault(require("./modules/employees/employees.routes"));
const leave_routes_1 = __importDefault(require("./modules/leave/leave.routes"));
const attendance_routes_1 = __importDefault(require("./modules/attendance/attendance.routes"));
const eod_routes_1 = __importDefault(require("./modules/eod/eod.routes"));
const documents_routes_1 = __importDefault(require("./modules/documents/documents.routes"));
const helpdesk_routes_1 = __importDefault(require("./modules/helpdesk/helpdesk.routes"));
const payroll_routes_1 = __importDefault(require("./modules/payroll/payroll.routes"));
const dashboard_routes_1 = __importDefault(require("./modules/dashboard/dashboard.routes"));
const admin_routes_1 = __importDefault(require("./modules/admin/admin.routes"));
const performance_routes_1 = __importDefault(require("./modules/performance/performance.routes"));
const recruitment_routes_1 = __importDefault(require("./modules/recruitment/recruitment.routes"));
const app = (0, express_1.default)();
// ─── Trust Proxy (Render/Vercel) ─────────────────────────────
// Required for rate-limiting to use real client IPs, not proxy IP
app.set('trust proxy', 1);
// ─── Security ────────────────────────────────────────────────
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin)
            return callback(null, true);
        // In development, allow all origins for easier testing
        if (config_1.env.NODE_ENV === 'development') {
            return callback(null, true);
        }
        const allowedOrigins = [
            config_1.env.CLIENT_URL,
            'https://dhrms-w47g.vercel.app',
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'http://localhost:3000',
            'http://127.0.0.1:3000',
        ].filter(Boolean);
        if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// ─── Parsing ─────────────────────────────────────────────────
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// ─── Rate Limiting ───────────────────────────────────────────
app.use('/api', middleware_1.apiLimiter);
// ─── Static Files ────────────────────────────────────────────
app.use('/uploads', express_1.default.static(path_1.default.resolve(config_1.env.UPLOAD_DIR || './uploads')));
// ─── Health Check ────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', version: 'v2-ist-fix', timestamp: new Date().toISOString() });
});
// ─── API Routes ──────────────────────────────────────────────
app.use('/api/auth', auth_routes_1.default);
app.use('/api/employees', employees_routes_1.default);
app.use('/api/leave', leave_routes_1.default);
app.use('/api/attendance', attendance_routes_1.default);
app.use('/api/eod', eod_routes_1.default);
app.use('/api/documents', documents_routes_1.default);
app.use('/api/helpdesk', helpdesk_routes_1.default);
app.use('/api/payroll', payroll_routes_1.default);
app.use('/api/dashboard', dashboard_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
app.use('/api/performance', performance_routes_1.default);
app.use('/api/recruitment', recruitment_routes_1.default);
// ─── 404 ─────────────────────────────────────────────────────
app.use('/api/*', (_req, res) => {
    res.status(404).json({ success: false, message: 'API endpoint not found' });
});
// ─── Error Handler ───────────────────────────────────────────
app.use(middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map