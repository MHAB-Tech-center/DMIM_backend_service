import { BaseEntity } from 'src/db/base-entity';
import { MineSite } from './minesite.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Inspector } from './inspector.entity';
import { EInspectionStatus } from 'src/common/Enum/EInspectionStatus.enum';

@Entity('inspection_plans')
export class InspectionPlan extends BaseEntity {
  @ManyToOne(() => MineSite)
  minesiteInfo: MineSite;
  @ManyToOne(() => Inspector)
  @JoinColumn({ name: 'inspector_id' })
  inspectorInfo: Inspector;

  @Column({ nullable: true })
  startDate: Date;
  @Column({ nullable: true })
  endDate: Date;

  @Column({
    name: 'status',
    nullable: true,
    enumName: 'status',
    type: 'enum',
    enum: EInspectionStatus,
    default: EInspectionStatus.IN_PROGRESS,
  })
  status: EInspectionStatus;
  @Column({ nullable: true })
  reviewMessage: string;

  constructor(
    startDate: Date,
    endDate: Date,
    inspector: Inspector,
    minesite: MineSite,
  ) {
    super();
    this.startDate = startDate;
    this.endDate = endDate;
    this.inspectorInfo = inspector;
    this.minesiteInfo = minesite;
  }
}
