import { BaseEntity } from 'src/db/base-entity';
import { MineSite } from './minesite.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CheckList } from './checklist.entity';
import { Inspector } from './inspector.entity';

@Entity('inspection_plans')
export class InspectionPlan extends BaseEntity {
  @ManyToOne(() => MineSite)
  minesite: MineSite;

  @JoinColumn({ name: 'check_list_id' })
  @ManyToOne(() => CheckList)
  checkList: CheckList;

  @ManyToOne(() => Inspector)
  @JoinColumn({ name: 'inspector_id' })
  inspector: Inspector;
}
