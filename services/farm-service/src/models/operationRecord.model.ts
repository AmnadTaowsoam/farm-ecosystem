// src/models/operationRecord.model.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ schema: 'farms', name: 'operational_records' })
export class OperationRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  farm_id!: number;

  @Column({ length: 100, nullable: true })
  type?: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ type: 'date', nullable: true })
  record_date?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;
}
