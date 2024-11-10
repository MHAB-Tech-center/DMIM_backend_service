import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSystemFeatureDTO } from './dtos/create-feature.dto';
import { UUID } from 'crypto';
import { SystemFeature } from 'src/entities/system-feature.entity';
import { CreateMultipleFeaturesDTO } from './dtos/ceratee-features.dto';

@Injectable()
export class SystemFeatureService {
  constructor(
    @InjectRepository(SystemFeature)
    private readonly systemFeatureRepository: Repository<SystemFeature>,
  ) {}

  async createMultipleSystemFeatures(
    dto: CreateMultipleFeaturesDTO,
  ): Promise<SystemFeature[]> {
    const savedSystemFeatures: SystemFeature[] = [];

    for (const featureName of dto.features) {
      const systemFeature = new SystemFeature(featureName.name);
      savedSystemFeatures.push(
        await this.systemFeatureRepository.save(systemFeature),
      );
    }
    return savedSystemFeatures;
  }

  async createSystemFeature(
    dto: CreateSystemFeatureDTO,
  ): Promise<SystemFeature> {
    const systemFeature = this.systemFeatureRepository.create({
      name: dto.name,
    });
    return await this.systemFeatureRepository.save(systemFeature);
  }

  async updateSystemFeature(
    systemFeatureId: UUID,
    updateSystemFeatureDto: CreateSystemFeatureDTO,
  ): Promise<SystemFeature> {
    const systemFeature = await this.systemFeatureRepository.findOne({
      where: { id: systemFeatureId },
    });

    if (!systemFeature) {
      throw new NotFoundException(
        `System feature with ID "${systemFeatureId}" not found`,
      );
    }

    Object.assign(systemFeature, updateSystemFeatureDto);
    return await this.systemFeatureRepository.save(systemFeature);
  }

  async deleteSystemFeature(systemFeatureId: UUID): Promise<string> {
    const deleteResult = await this.systemFeatureRepository.delete(
      systemFeatureId,
    );

    if (deleteResult.affected === 0) {
      throw new NotFoundException(
        `System feature with ID "${systemFeatureId}" not found`,
      );
    }

    return 'System feature deleted successfully';
  }
  async findFeatureById(id: UUID) {
    const feature = await this.systemFeatureRepository.findOne({
      where: { id: id },
    });
    if (!feature)
      throw new NotFoundException(
        'The system feature with the provided id is not found',
      );
    return feature;
  }
  async getSystemFeatures(): Promise<SystemFeature[]> {
    return await this.systemFeatureRepository.find({});
  }
}
