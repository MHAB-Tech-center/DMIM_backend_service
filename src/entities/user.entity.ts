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
export class User extends InitiatorAudit {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  firstName: String;

  @Column()
  lastName: String;

  @Column()
  email: String;

  @Column()
  username: String;

  @Column()
  phonenumber: String;

  @Column({
    nullable: true,
    default: null,
  })
  last_login: Date;

  @Column({
    type: String,
    enum: EGender,
    default: EGender[EGender.MALE],
  })
  gender: EGender;
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

  @Column()
  national_id: String;

  constructor(
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    myGender: EGender,
    national_id: String,
    phonenumber: String,
    password: String,
    status: EAccountStatus,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.gender = myGender;
    // this.profile_pic=this.profile_pic
    this.national_id = national_id;
    this.phonenumber = phonenumber;
    this.password = password;
    this.status = EAccountStatus[status];
  }
}
