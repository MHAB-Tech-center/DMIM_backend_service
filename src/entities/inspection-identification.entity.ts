import { BaseEntity } from 'src/db/base-entity';
import { Entity } from 'typeorm';

@Entity('inspection-identifications')
export class InspectionIdentification extends BaseEntity {
  mineOwner: string;
  mineOperator: string;
  perimeter: string;
  subsitesName: string;
  licenseNumber: string;
  mainBuyers: string;
  licenseCategory: string;
  licenseIssueDate: Date;
  licenseExpirationDate: Date;
  province: string;
  district: string;
  sector: string;
  cell: string;
  coordinates: string;
  responsiblePersonNames: string;
  responsiblePersonTitle: string;
  responsiblePersonContact: string;

  constructor(
    mineOwner: string,
    mineOperator: string,
    perimeter: string,
    subsitesName: string,
    licenseNumber: string,
    mainBuyers: string,
    licenseCategory: string,
    licenseIssueDate: Date,
    licenseExpirationDate: Date,
    province: string,
    district: string,
    sector: string,
    cell: string,
    coordinates: string,
    responsiblePersonNames: string,
    responsiblePersonTitle: string,
    responsiblePersonContact: string,
  ) {
    super();
    this.mineOwner = mineOwner;
    this.mineOperator = mineOperator;
    this.perimeter = perimeter;
    this.subsitesName = subsitesName;
    this.licenseNumber = licenseNumber;
    this.mainBuyers = mainBuyers;
    this.licenseCategory = licenseCategory;
    this.licenseIssueDate = licenseIssueDate;
    this.licenseExpirationDate = licenseExpirationDate;
    this.province = province;
    this.district = district;
    this.sector = sector;
    this.cell = cell;
    this.coordinates = coordinates;
    this.responsiblePersonNames = responsiblePersonNames;
    this.responsiblePersonTitle = responsiblePersonTitle;
    this.responsiblePersonContact = responsiblePersonContact;
  }
}
