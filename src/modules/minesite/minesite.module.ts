import { Module } from '@nestjs/common';
import { MinesiteService } from './minesite.service';
import { MinesiteController } from './minesite.controller';
import { MinesiteController } from './minesite.controller';

@Module({
  providers: [MinesiteService],
  controllers: [MinesiteController]
})
export class MinesiteModule {}
