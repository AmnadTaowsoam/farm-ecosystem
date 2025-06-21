// src/models/welfareIndicators.model.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'welfare_indicators' })
export class WelfareIndicator {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  animal_id!: number;

  @Column('boolean', { nullable: true })
  footpad_lesion?: boolean;

  @Column('numeric', { nullable: true })
  stress_hormone?: number;

  @Column({ type: 'date', nullable: true })
  recorded_date?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;
}
