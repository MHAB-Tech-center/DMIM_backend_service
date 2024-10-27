import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RMBRole } from './RMBRole.entity';

@Entity({ name: 'system_features' })
export class SystemFeature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'feature_name' })
  name: string;

  @ManyToMany(() => RMBRole, (role) => role.systemFeatures, { eager: false })
  @JoinTable({
    name: 'rtb_role_system_features',
    joinColumn: { name: 'system_feature_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'rtb_role_id', referencedColumnName: 'id' },
  })
  roles: RMBRole[];

  constructor(featureName: string) {
    this.name = featureName;
  }
}
