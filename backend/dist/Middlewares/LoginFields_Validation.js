"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginFields_Validation {
    static validateFields(req, res, next) {
        const fields = req.body;
        if (!fields.email || !fields.password) {
            res.status(400).json({ message: 'All fields must be filled' });
            return;
        }
        next();
    }
}
exports.default = LoginFields_Validation;
