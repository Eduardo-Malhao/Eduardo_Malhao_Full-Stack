"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersService_1 = __importDefault(require("../Service/UsersService"));
const mapStatusHTTP_1 = __importDefault(require("../Utils/mapStatusHTTP"));
const UserDto_1 = __importDefault(require("./DTO/UserDto"));
class UsersControllers {
    constructor() { this.service = new UsersService_1.default(); }
    async getUser(req, res) {
        const user_id = Number(req.params.id);
        const { status, data } = await this.service.getUser(user_id);
        res.status((0, mapStatusHTTP_1.default)(status)).json({ data: data });
        return;
    }
    async getUsersList(req, res) {
        const page = Number(req.query.page) || 1;
        const per_page = Number(req.query.per_page) || 5;
        const { status, data } = await this.service.getUsersList(page, per_page);
        res.status((0, mapStatusHTTP_1.default)(status)).json(data);
        return;
    }
    async create(req, res) {
        const body = UserDto_1.default.BodyToUser(req.body);
        const { status, data } = await this.service.create(body);
        res.status((0, mapStatusHTTP_1.default)(status)).json({ data: data });
        return;
    }
    async update(req, res) {
        const user = req.body;
        const avatar = req.file;
        const user_id = Number(req.params.id);
        const { status, data } = await this.service.update(user, user_id, avatar);
        res.status((0, mapStatusHTTP_1.default)(status)).json({ data: data });
        return;
    }
    async update_password(req, res) {
        const password = req.body;
        const user_id = Number(req.params.id);
        const { status, data } = await this.service.update_password(password, user_id);
        res.status((0, mapStatusHTTP_1.default)(status)).json({ data: data });
        return;
    }
    async delete(req, res) {
        const user_id = Number(req.params.id);
        const { status, data } = await this.service.delete(user_id);
        res.status((0, mapStatusHTTP_1.default)(status)).json({ data: data });
        return;
    }
}
exports.default = UsersControllers;
;
