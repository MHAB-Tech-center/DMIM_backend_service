import { Entity, OneToMany } from 'typeorm';
import { Question } from './Question.entity';
import { BaseEntity } from 'src/db/base-entity';

@Entity('categories')
export class QuestionCategory extends BaseEntity {
  title: string;

  @OneToMany(() => Question, (question) => question.category)
  questions: Question[];
}
