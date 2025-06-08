"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserFields_Validation {
    static validateFields(req, res, next) {
        const fields = req.body;
        if (!fields.email || !fields.password || !fields.first_name || !fields.last_name) {
            res.status(400).json({ message: 'All fields must be filled' });
            return;
        }
        next();
    }
    static validateUpdateFields(req, res, next) {
        const fields = req.body;
        if (!fields.email || !fields.first_name || !fields.last_name) {
            res.status(400).json({ message: 'All fields must be filled' });
            return;
        }
        next();
    }
    static validateUpdatePasswordFields(req, res, next) {
        const fields = req.body;
        if (!fields.actual_password || !fields.new_password) {
            res.status(400).json({ message: 'All fields must be filled' });
            return;
        }
        next();
    }
    static validateEmail(req, res, next) {
        const fields = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailCheck = emailRegex.test(fields.email);
        if (emailCheck === false) {
            res.status(400).json({ message: 'Invalid email' });
            return;
        }
        next();
    }
}
exports.default = UserFields_Validation;
;
