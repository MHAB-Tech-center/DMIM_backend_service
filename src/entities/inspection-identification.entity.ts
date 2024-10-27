import { BaseEntity } from 'src/db/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Coordinate } from './coordinate.entity';

@Entity('inspection-identifications')
export class InspectionIdentification extends BaseEntity {
  @Column({ nullable: true })
  mineOwner: string;
  @Column({ nullable: true })
  mineOperator: string;
  @Column({ nullable: true })
  licenseNumber: string;
  @Column({ nullable: true })
  mainBuyers: string;
  @Column({ nullable: true })
  licenseCategory: string;
  @Column({ nullable: true })
  licenseIssueDate: Date;
  @Column({ nullable: true })
  licenseExpirationDate: Date;
  @Column({ nullable: true })
  province: string;
  @Column({ nullable: true })
  district: string;
  @Column({ nullable: true })
  sector: string;
  @Column({ nullable: true })
  cell: string;
  @Column({ nullable: true })
  responsiblePersonNames: string;
  @Column({ nullable: true })
  responsiblePersonTitle: string;
  @Column({ nullable: true })
  responsiblePersonContact: string;
  @ManyToOne(() => Coordinate, (coordinates) => coordinates.identifications, {
    eager: true,
  })
  coordinates: Coordinate;

  constructor(
    mineOwner: string,
    mineOperator: string,
    licenseNumber: string,
    mainBuyers: string,
    licenseCategory: string,
    licenseIssueDate: Date,
    licenseExpirationDate: Date,
    province: string,
    district: string,
    sector: string,
    cell: string,
    responsiblePersonNames: string,
    responsiblePersonTitle: string,
    responsiblePersonContact: string,
  ) {
    super();
    this.mineOwner = mineOwner;
    this.mineOperator = mineOperator;
    this.licenseNumber = licenseNumber;
    this.mainBuyers = mainBuyers;
    this.licenseCategory = licenseCategory;
    this.licenseIssueDate = licenseIssueDate;
    this.licenseExpirationDate = licenseExpirationDate;
    this.province = province;
    this.district = district;
    this.sector = sector;
    this.cell = cell;
    this.responsiblePersonNames = responsiblePersonNames;
    this.responsiblePersonTitle = responsiblePersonTitle;
    this.responsiblePersonContact = responsiblePersonContact;
  }
}
