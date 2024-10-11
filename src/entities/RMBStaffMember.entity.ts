import { Entity } from 'typeorm';
import { Person } from './person.entity';

@Entity('rmb_staff')
export class RMBStaffMember extends Person {
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    dob: Date,
    // gender: EGender,
    phoneNumber: string,
    nationalId: string,
  ) {
    super(firstName, lastName, email, dob, phoneNumber, nationalId);
  }
}
