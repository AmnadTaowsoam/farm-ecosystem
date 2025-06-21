"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseService = void 0;
// src/services/house.service.ts
const dataSource_1 = require("../utils/dataSource");
const house_model_1 = require("../models/house.model");
class HouseService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(house_model_1.House);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { house_id: id } });
    }
    async create(data) {
        const house = this.repo.create(data);
        return this.repo.save(house);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.HouseService = HouseService;
