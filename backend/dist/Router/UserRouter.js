"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cors_1 = __importDefault(require("cors"));
const UsersController_1 = __importDefault(require("../Controller/UsersController"));
const UserFields_Validation_1 = __importDefault(require("../Middlewares/UserFields_Validation"));
const TokenValidation_1 = __importDefault(require("../Middlewares/TokenValidation"));
const upload_1 = __importDefault(require("../Middlewares/upload"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const router = (0, express_1.Router)();
const controller = new UsersController_1.default();
router.post('/create', UserFields_Validation_1.default.validateFields, UserFields_Validation_1.default.validateEmail, (0, express_async_handler_1.default)((req, res) => controller.create(req, res)));
router.put('/update/password/:id', TokenValidation_1.default.validateToken, UserFields_Validation_1.default.validateUpdatePasswordFields, (0, express_async_handler_1.default)((req, res) => controller.update_password(req, res)));
router.put('/update/:id', TokenValidation_1.default.validateToken, upload_1.default.single('avatar'), UserFields_Validation_1.default.validateUpdateFields, UserFields_Validation_1.default.validateEmail, (0, express_async_handler_1.default)((req, res) => controller.update(req, res)));
router.delete('/delete/:id', TokenValidation_1.default.validateToken, (0, express_async_handler_1.default)((req, res) => controller.delete(req, res)));
router.get('/list', TokenValidation_1.default.validateToken, (0, express_async_handler_1.default)((req, res) => controller.getUsersList(req, res)));
router.get('/:id', TokenValidation_1.default.validateToken, (0, express_async_handler_1.default)((req, res) => controller.getUser(req, res)));
exports.default = router;
