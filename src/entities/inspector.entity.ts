import { Entity } from 'typeorm';
import { Person } from './person.entity';

@Entity('inspectors')
export class Inspector extends Person {}
