import { BaseEntity } from 'src/db/base-entity';
import { QuestionCategory } from './questionCategory.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questions')
export class Question extends BaseEntity {
  title: string;

  @JoinColumn({ name: 'company_id' })
  @ManyToOne(() => QuestionCategory, (category) => category.questions)
  category: QuestionCategory;
}
