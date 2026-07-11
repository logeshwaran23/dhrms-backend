"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const zod_1 = require("zod");
/**
 * Zod validation middleware.
 * Validates req.body, req.query, or req.params.
 *
 * Usage:
 *   validate(loginSchema)           // validates req.body
 *   validate(querySchema, 'query')  // validates req.query
 */
function validate(schema, source = 'body') {
    return (req, res, next) => {
        try {
            const data = schema.parse(req[source]);
            req[source] = data; // Replace with parsed (cleaned) data
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.errors.map((e) => ({
                    field: e.path.join('.'),
                    message: e.message,
                }));
                res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors,
                });
                return;
            }
            next(error);
        }
    };
}
//# sourceMappingURL=validate.js.map