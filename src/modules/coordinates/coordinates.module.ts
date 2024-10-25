import { Global, Module } from '@nestjs/common';
import { CoordinatesService } from './coordinates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coordinate } from 'src/entities/coordinate.entity';

@Global()
@Module({
  providers: [CoordinatesService],
  exports: [CoordinatesService],
  imports: [TypeOrmModule.forFeature([Coordinate])],
})
export class CoordinatesModule {}
