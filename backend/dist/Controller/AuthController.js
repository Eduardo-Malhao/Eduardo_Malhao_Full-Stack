"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("../Service/AuthService"));
const mapStatusHTTP_1 = __importDefault(require("../Utils/mapStatusHTTP"));
class AuthControllers {
    constructor() { this.service = new AuthService_1.default(); }
    async login(req, res) {
        const user = (req.body);
        const { status, data } = await this.service.login(user);
        res.status((0, mapStatusHTTP_1.default)(status)).json({ data: data });
        return;
    }
}
exports.default = AuthControllers;
