import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Person } from './person.entity';
import { RMBRole } from './RMBRole.entity';

@Entity('rmb_staff')
export class RMBStaffMember extends Person {
  @Column()
  key: string = 'On_Work';

  @OneToOne(() => RMBRole, { eager: true })
  @JoinColumn({ name: 'role_id' })
  rmbRole: RMBRole;
  @Column()
  status: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    dob: Date,
    // gender: EGender,
    phoneNumber: string,
    nationalId: string,
    province: string,
    distict: string,
  ) {
    super(
      firstName,
      lastName,
      email,
      dob,
      phoneNumber,
      nationalId,
      province,
      distict,
    );
    this.status = 'PENDING';
  }
}
