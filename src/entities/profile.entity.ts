/* eslint-disable */
/*
 @auhor : © 2024 Valens Niyonsenga <valensniyonsenga2003@gmail.com>
*/

/**
 * @file
 * @brief User entity
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  TableInheritance,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { EGender } from '../common/Enum/EGender.enum';
import { EAccountStatus } from '../common/Enum/EAccountStatus.enum';
import { Role } from 'src/entities/role.entity';
import { InitiatorAudit } from 'src/audits/Initiator.audit';
import { UUID } from 'crypto';

@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Profile extends InitiatorAudit {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  email: String;

  @Column()
  username: String;

  @Column({
    nullable: true,
    default: null,
  })
  last_login: Date;

  @JoinColumn({
    name: 'profile_picture',
  })
  profile_pic: string;

  @Column({
    nullable: true,
  })
  password: String;

  @Column({
    nullable: true,
  })
  activationCode: number;

  @Column()
  status: String;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
  constructor(email: String, username: String, password: string) {
    super();
    this.email = email;
    this.username = username;
    this.password = password;
    // this.profile_pic=this.profile_pic
    this.status = EAccountStatus[EAccountStatus.ACTIVE];
  }
}
