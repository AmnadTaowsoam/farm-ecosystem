// feedBatchAssignments.service.ts
import { Repository } from 'typeorm';
import { FeedBatchAssignment } from '../models/feedBatchAssignments.model';

export class FeedBatchAssignmentsService {
  constructor(private repo: Repository<FeedBatchAssignment>) {}

  async create(data: Partial<FeedBatchAssignment>) {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(id: number) {
    return await this.repo.findOneBy({ assignmentId: id });
  }

  async update(id: number, data: Partial<FeedBatchAssignment>) {
    await this.repo.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }
}
