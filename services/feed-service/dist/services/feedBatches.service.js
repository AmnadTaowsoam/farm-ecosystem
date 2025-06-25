"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedBatchesService = void 0;
class FeedBatchesService {
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
    async findById(productionDate, feedBatchId) {
        return await this.repo.findOneBy({ productionDate, feedBatchId });
    }
    async update(productionDate, feedBatchId, data) {
        await this.repo.update({ productionDate, feedBatchId }, data);
        return await this.findById(productionDate, feedBatchId);
    }
    async delete(productionDate, feedBatchId) {
        return await this.repo.delete({ productionDate, feedBatchId });
    }
}
exports.FeedBatchesService = FeedBatchesService;
