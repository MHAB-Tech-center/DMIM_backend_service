import { BaseEntity } from 'src/db/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { InspectionIdentification } from './inspection-identification.entity';

@Entity('coordinates')
export class Coordinate extends BaseEntity {
  @Column()
  utm_east: string;
  @Column()
  dms_east: string;
  @Column()
  utm_south: string;
  @Column()
  dms_south: string;
  @OneToMany(
    () => InspectionIdentification,
    (identification) => identification.coordinates,
    { eager: false },
  )
  identifications: InspectionIdentification[];
  constructor(
    utm_east: string,
    dms_east: string,
    utm_south: string,
    dms_south: string,
  ) {
    super();
    this.utm_east = utm_east;
    this.dms_east = dms_east;
    this.utm_south = utm_south;
    this.dms_south = dms_south;
  }
}
