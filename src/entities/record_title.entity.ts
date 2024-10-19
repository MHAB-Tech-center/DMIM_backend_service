import { BaseEntity, Column } from 'typeorm';

export class RecordTitle extends BaseEntity {
  @Column({ unique: true })
  title: string;
}
