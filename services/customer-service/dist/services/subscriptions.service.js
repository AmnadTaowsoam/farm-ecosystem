"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
// src/services/subscription.service.ts
const dataSource_1 = require("../utils/dataSource");
const subscription_model_1 = require("../models/subscription.model");
class SubscriptionService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(subscription_model_1.Subscription);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { subscription_id: id } });
    }
    async create(data) {
        const sub = this.repo.create(data);
        return this.repo.save(sub);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.SubscriptionService = SubscriptionService;
