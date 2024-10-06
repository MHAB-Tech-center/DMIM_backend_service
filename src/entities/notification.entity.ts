import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UUID, randomUUID } from 'crypto';
import { Company } from './company.entity';
import { BaseExceptionFilter } from '@nestjs/core';
import { BaseEntity } from 'src/db/base-entity';

@Entity('notifications')
export class Notification extends BaseEntity {
  //   @Column({ nullable: true })
  //   type: ENotificationType;

  //   @Column({ default: ENotificationStatus['UNREAD'] })
  //   status: ENotificationStatus;

  @Column()
  message: string;

  //   @ManyToOne(() => MainUser, (user) => user.notifications)
  //   @JoinColumn({ name: 'user_id' })
  //   user: Profile;

  @ManyToOne(() => Company, (company) => company.notifications)
  @JoinColumn({ name: 'company_id' })
  miningCompany: Company;

  //   constructor(message: string, type: ENotificationType) {
  //     this.message = message;
  //     this.type = type;
  //   }
}
