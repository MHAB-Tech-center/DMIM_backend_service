import { Global, Module } from '@nestjs/common';
import { MinesiteService } from './minesite.service';
import { MinesiteController } from './minesite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MineSite } from 'src/entities/minesite.entity';
import { InspectorsModule } from '../inspectors/inspectors.module';

@Global()
@Module({
  providers: [MinesiteService],
  imports: [TypeOrmModule.forFeature([MineSite])],
  controllers: [MinesiteController],
  exports: [MinesiteService],
})
export class MinesiteModule {}
