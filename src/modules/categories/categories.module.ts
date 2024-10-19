import { Global, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';

@Global()
@Module({
  providers: [CategoriesService],
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}
