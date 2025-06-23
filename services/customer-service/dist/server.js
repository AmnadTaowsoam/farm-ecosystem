"use strict";
// services/data-service/src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dataSource_1 = require("./utils/dataSource");
const routes_1 = __importDefault(require("./routes"));
const auth_1 = require("./middlewares/auth");
const errorHandler_1 = require("./middlewares/errorHandler");
const config_1 = require("./configs/config");
async function startServer() {
    try {
        // 1) Initialize DB connection
        await dataSource_1.AppDataSource.initialize();
        console.log('✅ DataSource has been initialized');
        const app = (0, express_1.default)();
        // 2) Security & logging middleware
        app.use((0, helmet_1.default)());
        app.use((0, cors_1.default)());
        app.use((0, morgan_1.default)('combined'));
        app.use(express_1.default.json());
        // 3) Health-check endpoint
        app.get('/health', (_req, res) => {
            res.sendStatus(200);
        });
        // 4) Public routes (e.g. auth) – mount BEFORE authentication middleware
        // app.post('/api/auth/login', AuthController.login);
        // app.post('/api/auth/refresh', AuthController.refresh);
        // 5) Protected routes
        app.use('/api', auth_1.authenticateToken, routes_1.default);
        // 6) Global error handler
        app.use(errorHandler_1.errorHandler);
        // 7) Start server
        const server = app.listen(config_1.PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${config_1.PORT}`);
        });
        // 8) Graceful shutdown
        const shutdown = () => {
            console.log('⚡️ Shutting down server...');
            server.close(async () => {
                await dataSource_1.AppDataSource.destroy();
                console.log('✅ DataSource has been destroyed');
                process.exit(0);
            });
        };
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    }
    catch (err) {
        console.error('❌ Error during DataSource initialization:', err);
        process.exit(1);
    }
}
startServer();
