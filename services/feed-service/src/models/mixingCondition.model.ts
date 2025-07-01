// mixingCondition.model.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FeedBatch } from '../models/feedBatch.model';

@Entity({ schema: 'feeds', name: 'mixing_condition' })
export class MixingCondition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'customer_id', type: 'int' })
  customerId!: number;

  @Column({ name: 'production_date', type: 'timestamptz' })
  productionDate!: Date;

  @Column({ name: 'feed_batch_id' })
  feedBatchId!: number;

  @Column({ name: 'parameter_name', length: 100 })
  parameterName!: string;

  @Column({ name: 'parameter_value', length: 255, nullable: true })
  parameterValue?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => FeedBatch, (feedBatch) => undefined, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: 'production_date', referencedColumnName: 'productionDate' },
    { name: 'feed_batch_id', referencedColumnName: 'feedBatchId' },
  ])
  feedBatch!: FeedBatch;
}

