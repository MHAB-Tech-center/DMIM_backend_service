import { BaseEntity } from 'src/db/base-entity';
import { Entity, OneToMany } from 'typeorm';
import { InspectionPlan } from './InspectionPlan.entity';

@Entity('checklists')
export class CheckList extends BaseEntity {}
