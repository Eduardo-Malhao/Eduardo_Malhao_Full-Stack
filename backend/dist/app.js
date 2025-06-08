"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router_1 = __importDefault(require("./Router"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.config();
        this.routes();
        this.app.use((0, cors_1.default)());
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(accessControl);
        // this.app.use(cors({
        //   origin: 'http://localhost:5173',
        //   methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT', 'PATCH'],
        //   allowedHeaders: ['Content-Type', 'Authorization'], // defina os headers que usa
        //   credentials: true
        // }));
    }
    routes() { this.app.use(Router_1.default); }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}
exports.default = App;
