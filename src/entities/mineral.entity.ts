import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('minerals')
export class Mineral extends BaseEntity {
  name: string;
  @Column({ unique: true })
  code: string;
}
