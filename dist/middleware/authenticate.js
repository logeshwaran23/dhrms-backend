"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const utils_1 = require("../utils");
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ success: false, message: 'Access token required' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = (0, utils_1.verifyAccessToken)(token);
        req.user = payload;
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ success: false, message: 'Token expired', code: 'TOKEN_EXPIRED' });
            return;
        }
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
}
//# sourceMappingURL=authenticate.js.map