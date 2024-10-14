import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';
import { MineSite } from './minesite.entity';
import { EInspectorRole } from 'src/common/Enum/EInspectorRole.enum';

@Entity('inspectors')
export class Inspector extends Person {
  @ManyToOne(() => MineSite)
  @JoinColumn({ name: 'minesite_id' })
  minesite: MineSite;

  role: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    dob: Date,
    // gender: EGender,
    phoneNumber: string,
    nationalId: string,
    role: string,
    province: string,
    district: string,
  ) {
    super(firstName, lastName, email, dob, phoneNumber, nationalId);
    this.role = role;
    this.province = province;
    this.district = district;
  }
}
