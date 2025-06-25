"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixingConditionService = void 0;
class MixingConditionService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        const entity = this.repo.create(data);
        return await this.repo.save(entity);
    }
    async findAll() {
        return await this.repo.find();
    }
    async findById(id) {
        return await this.repo.findOneBy({ id });
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return await this.findById(id);
    }
    async delete(id) {
        return await this.repo.delete(id);
    }
}
exports.MixingConditionService = MixingConditionService;
