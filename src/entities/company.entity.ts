import { Column, Entity, OneToMany } from 'typeorm';
import { Notification } from './notification.entity';
import { BaseEntity } from 'src/db/base-entity';

@Entity('mining_companies')
export class Company extends BaseEntity {
  @Column()
  name: string;
  @Column()
  email: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  //   @ManyToOne(() => Address, (address) => address.company)
  //   @JoinColumn({ name: 'address_id' })
  //   address: Address;

  @OneToMany(() => Notification, (notification) => notification.miningCompany)
  notifications: Notification[];

  @Column({ nullable: true })
  productionCapacity: number;

  @Column({ default: 0 })
  numberOfEmployees: number;

  @Column()
  miniLicense: number;

  constructor(
    name: string,
    email: string,
    phoneNumber: string,
    numberOfEmployees: number,
    productionCapacity: number,
    miniLicense: number,
  ) {
    super();
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.numberOfEmployees = numberOfEmployees;
    this.productionCapacity = productionCapacity;
    this.miniLicense = miniLicense;
  }
}
