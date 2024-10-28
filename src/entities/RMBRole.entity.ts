import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';
import { SystemFeature } from './system-feature.entity';

@Entity({ name: 'rtb_roles' })
export class RMBRole extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'rtb_role_name', unique: true })
  rtbRoleName: string;

  rtbRoleStatus: string;

  @Column({ name: 'role_description', nullable: true })
  roleDescription: string;

  @ManyToMany(() => SystemFeature, { cascade: true, eager: true })
  @JoinTable({
    name: 'rtb_role_system_features',
    joinColumn: { name: 'rtb_role_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'system_feature_id',
      referencedColumnName: 'id',
    },
  })
  systemFeatures: SystemFeature[];

  constructor(rtbRoleName: string, roleDescription: string) {
    super();
    this.rtbRoleName = rtbRoleName;
    this.roleDescription = roleDescription;
  }
}
