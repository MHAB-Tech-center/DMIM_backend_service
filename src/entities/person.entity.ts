import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { BaseEntity } from 'src/db/base-entity';

@Entity()
export abstract class Person extends BaseEntity {
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

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'national_id' })
  nationalId: string;

  @OneToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
  @Column({ nullable: true })
  province: string;
  @Column({ nullable: true })
  district: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    dob: Date,
    phoneNumber: string,
    nationalId: string,
    province: string,
    district: string,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dob = dob;
    this.phoneNumber = phoneNumber;
    this.nationalId = nationalId;
    this.province = province;
    this.district = district;
  }
}
