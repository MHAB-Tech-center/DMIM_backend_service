import { BaseEntity } from 'src/db/base-entity';
import { ManyToOne } from 'typeorm';

export class InspectionRecord extends BaseEntity {
  @ManyToOne(() => InspectionRecord)
  parent: InspectionRecord;
}
