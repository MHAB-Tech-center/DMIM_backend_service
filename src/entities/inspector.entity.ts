import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Person } from './person.entity';

@Entity('inspectors')
export class Inspector extends Person {}
