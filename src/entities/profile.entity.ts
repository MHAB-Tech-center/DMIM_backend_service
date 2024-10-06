import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Person } from './person.entity';
import { BaseEntity } from 'src/db/base-entity';

@Entity('profiles')
export class Profile extends BaseEntity {
  email: string;
  password: string;
}
