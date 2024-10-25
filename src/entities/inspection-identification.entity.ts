import { BaseEntity } from 'src/db/base-entity';
import { Entity, ManyToOne } from 'typeorm';
import { Coordinate } from './coordinate.entity';

@Entity('inspection-identifications')
export class InspectionIdentification extends BaseEntity {
  mineOwner: string;
  mineOperator: string;
  licenseNumber: string;
  mainBuyers: string;
  licenseCategory: string;
  licenseIssueDate: Date;
  licenseExpirationDate: Date;
  province: string;
  district: string;
  sector: string;
  cell: string;
  responsiblePersonNames: string;
  responsiblePersonTitle: string;
  responsiblePersonContact: string;
  @ManyToOne(() => Coordinate)
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
