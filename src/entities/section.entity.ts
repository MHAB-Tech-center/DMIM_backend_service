import { BaseEntity } from 'src/db/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { RecordTitle } from './record_title.entity';

@Entity('sections')
export class Section extends BaseEntity {
  @Column({ name: 'title', unique: true })
  title: string;

  constructor(title: string) {
    super();
    this.title = title;
  }
}
