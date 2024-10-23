import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Public } from 'src/decorators/public.decorator';
import { UUID } from 'crypto';
import { ApiResponse } from 'src/common/payload/ApiResponse';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}
  @Get('/:categoryId')
  @Public()
  async getCategory(
    @Param('categoryId') categoryId: UUID,
  ): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      'The category was retrieved successfully',
      await this.categoryService.findById(categoryId),
    );
  }
}
