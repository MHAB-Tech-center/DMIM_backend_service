import { Module } from '@nestjs/common';
import { RmbService } from './rmb.service';
import { RmbController } from './rmb.controller';

@Module({
  providers: [RmbService],
  controllers: [RmbController]
})
export class RmbModule {}
