import { BaseEntity } from 'src/db/base-entity';
import { Column, Entity } from 'typeorm';

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
