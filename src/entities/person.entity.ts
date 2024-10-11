import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BaseExceptionFilter } from '@nestjs/core';
import { Profile } from './profile.entity';

@Entity()
export abstract class Person extends BaseExceptionFilter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column({ type: 'date', name: 'dob' })
  dob: Date;

  //   @Column({ type: 'enum', enum: EGender })
  //   gender: EGender;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'national_id' })
  nationalId: string;

  @OneToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  //   @Column({ type: 'enum', enum: EVisibility, default: EVisibility.VISIBLE })
  //   visibility: EVisibility;

  //   @Column({ type: 'enum', enum: ERecordStatus, default: ERecordStatus.ACTIVE })
  //   status: ERecordStatus;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    dob: Date,
    // gender: EGender,
    phoneNumber: string,
    nationalId: string,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dob = dob;
    // this.gender = gender;
    this.phoneNumber = phoneNumber;
    this.nationalId = nationalId;
  }
}
