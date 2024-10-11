import { BaseEntity } from 'src/db/base-entity';
import { MineSite } from './minesite.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Inspector } from './inspector.entity';

@Entity('inspection_plans')
export class InspectionPlan extends BaseEntity {
  @ManyToOne(() => MineSite)
  minesite: MineSite;

  @ManyToOne(() => Inspector)
  @JoinColumn({ name: 'inspector_id' })
  inspector: Inspector;
}
