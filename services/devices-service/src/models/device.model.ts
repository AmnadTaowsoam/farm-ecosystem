// src/models/device.model.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { DeviceType } from './deviceTypes.model';
import { DeviceGroup } from './deviceGroup.model';
import { DeviceStatusHistory } from './deviceStatusHistory.model';

@Entity({ schema: 'devices', name: 'devices' })
export class Device {
  @PrimaryGeneratedColumn()
  device_id!: number;

  // เก็บเฉพาะ id เท่านั้น house อยู่ service/database อื่น ไม่ต้อง relation
  @Column({ nullable: true })
  house_id?: number;

  // ลบความสัมพันธ์ house ออก

  @Column({ nullable: true })
  type_id?: number;

  @ManyToOne(() => DeviceType, (dt) => dt.devices, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'type_id' })
  type?: DeviceType;

  @Column({ nullable: true })
  group_id?: number;

  @ManyToOne(() => DeviceGroup, (dg) => dg.devices, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'group_id' })
  group?: DeviceGroup;

  @Column({ length: 100, nullable: true })
  model?: string;

  @Column({ length: 100, nullable: true })
  serial_number?: string;

  @Column({ type: 'date', nullable: true })
  install_date?: string;

  @Column({ type: 'date', nullable: true })
  calibration_date?: string;

  @Column({ type: 'date', nullable: true })
  last_maintenance?: string;

  @Column('text', { nullable: true })
  location_detail?: string;

  @Column({ length: 255, nullable: true })
  manufacturer?: string;

  @Column({ type: 'date', nullable: true })
  purchase_date?: string;

  @Column({ type: 'date', nullable: true })
  warranty_expiry?: string;

  @Column('jsonb', { nullable: true })
  specs?: any;

  @Column('numeric', { nullable: true })
  location_latitude?: number;

  @Column('numeric', { nullable: true })
  location_longitude?: number;

  @Column({ length: 50, nullable: true })
  firmware_version?: string;

  @Column({ length: 45, nullable: true })
  ip_address?: string;

  @Column({ length: 17, nullable: true })
  mac_address?: string;

  @Column({ type: 'timestamptz', nullable: true })
  last_seen?: Date;

  @Column('text', { array: true, default: () => "ARRAY[]::text[]" })
  tags!: string[];

  @Column('jsonb', { nullable: true })
  config?: any;

  @Column('jsonb', { nullable: true })
  credentials?: any;

  @Column('text', { nullable: true })
  build_code?: string;

  @Column({ type: 'timestamptz', nullable: true })
  build_date?: Date;

  @Column({ length: 50, default: 'active' })
  status!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;

  @OneToMany(() => DeviceStatusHistory, (sh) => sh.device)
  status_history?: DeviceStatusHistory[];

  // ลบความสัมพันธ์ sensor_data ออก
}

