import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async existsByTitleInspectionPlan(title: string, planId: UUID) {
    const exists = await this.categoryRepository.findOne({
      where: {
        title: title,
        inspectionPlan: { id: planId },
      },
    });
    return !!exists;
  }
  async findByTitleInspectionPlan(title: string, planId: UUID) {
    const category = await this.categoryRepository.findOne({
      where: {
        title: title,
        inspectionPlan: { id: planId },
      },
    });
    return category;
  }
  async findById(id: UUID): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
      relations: ['inspectionPlan'],
    });
    if (!category)
      throw new NotFoundException(
        'The category with the provided Id is not found',
      );
    return category;
  }
}
