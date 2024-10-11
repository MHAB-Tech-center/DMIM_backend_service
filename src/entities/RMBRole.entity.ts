import { BaseEntity } from 'src/db/base-entity';
import { Entity } from 'typeorm';

@Entity('rmb_roles')
export class RMBRole extends BaseEntity {
  //   rmbRoleStatus: ERMBRoleStatus;
  roleDescription: string;

  constructor(roleDescription: string) {
    super();
    this.roleDescription = roleDescription;
  }
}
