import { InitiatorAudit } from 'src/audits/Initiator.audit';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UUID, randomUUID } from 'crypto';
import { Company } from './company.entity';

@Entity('minesites')
export class MineSite extends InitiatorAudit {
  @PrimaryColumn()
  id: UUID = randomUUID();

  @Column()
  code: string;

  @Column()
  name: string;

  //   @ManyToOne(() => Address, (address) => address.mineSites)
  //   @JoinColumn({ name: 'address_id' })
  //   address: Address;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  constructor(name: string, code: string) {
    super();
    this.name = name;
    this.code = code;
  }
}
