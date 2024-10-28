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

  mineType: string;
  @Column({ nullable: true })
  province: string;
  @Column({ nullable: true })
  district: string;

  constructor(name: string, code: string, province: string, district: string) {
    super();
    this.name = name;
    this.code = code;
    this.province = province;
    this.district = district;
  }
}
