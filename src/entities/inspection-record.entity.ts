import { BaseEntity } from 'src/db/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from './category.entity';
import { Exclude } from 'class-transformer';

@Entity('inspection_records')
export class InspectionRecord extends BaseEntity {
  @Column({ nullable: true })
  title: string;
  @Column({ nullable: true })
  boxValue: string;
  @Column({ nullable: true })
  flagValue: string;
  @Column({ nullable: true })
  marks: number;

  @ManyToOne(() => Category)
  // @Exclude()
  @JoinColumn({ name: 'category_id' })
  category: Category;
  @Column({ nullable: true })
  pseudoName: string;

  constructor(
    title: string,
    boxValue: string,
    flagValue: string,
    category: Category,
  ) {
    super();
    this.title = title;
    this.boxValue = boxValue;
    this.flagValue = flagValue;
    this.category = category;
  }
}
