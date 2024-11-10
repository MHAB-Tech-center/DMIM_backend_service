import { Global, Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from 'src/entities/section.entity';

@Global()
@Module({
  providers: [SectionsService],
  imports: [TypeOrmModule.forFeature([Section])],
  controllers: [SectionsController],
  exports: [SectionsService],
})
export class SectionsModule {}
