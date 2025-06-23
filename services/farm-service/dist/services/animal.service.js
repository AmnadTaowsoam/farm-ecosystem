"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalService = void 0;
// src/services/animal.service.ts
const dataSource_1 = require("../utils/dataSource");
const animal_model_1 = require("../models/animal.model");
class AnimalService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(animal_model_1.Animal);
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        return this.repo.findOne({ where: { animal_id: id } });
    }
    async create(data) {
        const animal = this.repo.create(data);
        return this.repo.save(animal);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.AnimalService = AnimalService;
