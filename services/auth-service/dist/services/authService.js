"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const hash_1 = require("../utils/hash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../configs/config");
class AuthService {
    constructor(userRepo, tokenRepo) {
        this.userRepo = userRepo;
        this.tokenRepo = tokenRepo;
    }
    signup(email, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepo.findOneBy({ username });
            if (existingUser) {
                throw new Error('Username already exists');
            }
            const password_hash = yield (0, hash_1.hashPassword)(password);
            const user = this.userRepo.create({ email, username, password_hash });
            yield this.userRepo.save(user);
            return { message: 'User created' };
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOneBy({ username });
            if (!user)
                throw new Error('Invalid username or password');
            const valid = yield (0, hash_1.comparePassword)(password, user.password_hash);
            if (!valid)
                throw new Error('Invalid username or password');
            const accessToken = jsonwebtoken_1.default.sign({ sub: user.user_id, username: user.username, role: user.role }, config_1.JWT_SECRET, { expiresIn: `${config_1.ACCESS_TOKEN_EXPIRE_MINUTES}m` });
            const refreshTokenValue = jsonwebtoken_1.default.sign({ sub: user.user_id }, config_1.JWT_SECRET, { expiresIn: `${config_1.REFRESH_TOKEN_EXPIRE_DAYS}d` });
            const refreshToken = this.tokenRepo.create({
                user,
                refresh_token: refreshTokenValue,
                expires_at: new Date(Date.now() + config_1.REFRESH_TOKEN_EXPIRE_DAYS * 86400000),
            });
            yield this.tokenRepo.save(refreshToken);
            return {
                access_token: accessToken,
                refresh_token: refreshTokenValue,
                token_type: 'bearer',
            };
        });
    }
    refresh(refreshTokenValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedToken = yield this.tokenRepo.findOne({
                where: { refresh_token: refreshTokenValue, revoked: false },
                relations: ['user'],
            });
            if (!storedToken) {
                throw new Error('Invalid refresh token');
            }
            if (storedToken.expires_at && storedToken.expires_at < new Date()) {
                throw new Error('Refresh token expired');
            }
            // Verify token signature
            try {
                jsonwebtoken_1.default.verify(refreshTokenValue, config_1.JWT_SECRET);
            }
            catch (_a) {
                throw new Error('Invalid refresh token');
            }
            const user = storedToken.user;
            // Issue new access token
            const accessToken = jsonwebtoken_1.default.sign({ sub: user.user_id, username: user.username, role: user.role }, config_1.JWT_SECRET, { expiresIn: `${config_1.ACCESS_TOKEN_EXPIRE_MINUTES}m` });
            return {
                access_token: accessToken,
                token_type: 'bearer',
            };
        });
    }
}
exports.AuthService = AuthService;
