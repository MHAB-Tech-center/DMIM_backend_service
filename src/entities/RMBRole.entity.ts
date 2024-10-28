import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'rmb_roles' })
export class RMBRole extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'rtb_role_name', unique: true })
  rtbRoleName: string;

  rtbRoleStatus: string;

  @Column({ name: 'role_description', nullable: true })
  roleDescription: string;
  @Column()
  systemFeatures: string;

  constructor(rtbRoleName: string, roleDescription: string) {
    super();
    this.rtbRoleName = rtbRoleName;
    this.roleDescription = roleDescription;
  }
}
