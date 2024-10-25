import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coordinate } from 'src/entities/coordinate.entity';
import { Repository } from 'typeorm';
import { CreateCoordinateDTO } from './dtos/create-coordinate.dto';

@Injectable()
export class CoordinatesService {
  constructor(
    @InjectRepository(Coordinate)
    private readonly coordinateRepository: Repository<Coordinate>,
  ) {}

  async coordinateExists(coordinate: Coordinate) {
    const coordinateAvailable = await this.coordinateRepository.findOne({
      where: {
        utm_east: coordinate.utm_east,
        dms_east: coordinate.dms_east,
        utm_south: coordinate.utm_south,
        dms_south: coordinate.dms_south,
      },
    });
    return !!coordinateAvailable;
  }
  async getAvailableCoordinate(coordinate: Coordinate) {
    const coordinateAvailable = await this.coordinateRepository.findOne({
      where: {
        utm_east: coordinate.utm_east,
        dms_east: coordinate.dms_east,
        utm_south: coordinate.utm_south,
        dms_south: coordinate.dms_south,
      },
    });
    return coordinateAvailable;
  }
  async saveCoordinate(dto: CreateCoordinateDTO) {
    let coordinates: Coordinate;
    if (await this.coordinateExists(coordinates)) {
      coordinates = await this.getAvailableCoordinate(coordinates);
    } else {
      coordinates = new Coordinate(
        dto.utm_east,
        dto.dms_east,
        dto.utm_south,
        dto.dms_south,
      );
    }
    return await this.coordinateRepository.save(coordinates);
  }
}
