import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInspectionDTO } from 'src/common/dtos/inspections/create-inspection.dto';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { InspectionPlan } from 'src/entities/InspectionPlan.entity';
import { Repository } from 'typeorm';
import { MinesiteService } from '../minesite/minesite.service';
import { UsersService } from '../users/users.service';
import { UtilsService } from 'src/utils/utils.service';
import { Request } from 'express';
import { Inspector } from 'src/entities/inspector.entity';
import { InspectorsService } from '../inspectors/inspectors.service';
import { Profile } from 'src/entities/profile.entity';
import { SectionsService } from '../sections/sections.service';
import { CreateRecordDTO } from 'src/common/dtos/inspections/create-record.dto';
import { Category } from 'src/entities/category.entity';
import { InspectionRecord } from 'src/entities/inspection-record.entity';
import { CreateInspectionPlanDTO } from 'src/common/dtos/inspections/create-inspection-plan.dto';

@Injectable()
export class InspectionsService {
  constructor(
    @InjectRepository(InspectionPlan)
    private readonly inspectionPlanRepository: Repository<InspectionPlan>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(InspectionRecord)
    private readonly recordRepository: Repository<InspectionRecord>,
    private minesiteService: MinesiteService,
    private utilService: UtilsService,
    private inspectorService: InspectorsService,
    private sectionService: SectionsService,
  ) {}

  async createInspectionPlan(request: Request, dto: CreateInspectionPlanDTO) {
    const mineSite = await this.minesiteService.getById(dto.minesiteId);
    const loggedInUser: Profile = await this.utilService.getLoggedInProfile(
      request,
    );
    const inspector: Inspector = await this.inspectorService.findByEmail(
      loggedInUser.email.toString(),
    );
    const inspectionPlanEntity = new InspectionPlan(
      dto.startDate,
      dto.endDate,
      inspector,
      mineSite,
    );
    const inspectionPlan = await this.inspectionPlanRepository.save(
      inspectionPlanEntity,
    );
    return new ApiResponse(
      true,
      'Inspection plan was created successfully',
      inspectionPlan,
    );
  }
  // Create a new inspection plan
  async create(dto: CreateInspectionDTO): Promise<ApiResponse> {
    const inspectionPlan = await this.inspectionPlanRepository.findOne({
      where: { id: dto.inspectionPlanId },
    });
    dto.records.forEach(async (record: CreateRecordDTO) => {
      const section = await this.sectionService.findSectionById(
        record.category.sectionId,
      );
      const categoryEntity = new Category(
        record.category.title,
        inspectionPlan,
        section,
      );
      const category = await this.categoryRepository.save(categoryEntity);
      const inspectionRecord = new InspectionRecord(
        record.title,
        record.boxValue,
        record.flagValue,
        category,
      );
      if (record.flagValue) {
        record.flagValue.toLowerCase() == 'red'
          ? (inspectionRecord.marks = 40)
          : record.flagValue.toLowerCase() == 'green'
          ? (inspectionRecord.marks = 85)
          : (inspectionRecord.marks = 60);
      }
      await this.recordRepository.save(inspectionRecord);
    });

    return new ApiResponse(
      true,
      'The inspection records were created successfully',
      inspectionPlan,
    );
  }

  // Retrieve all inspection plans
  async findAll(): Promise<InspectionPlan[]> {
    return this.inspectionPlanRepository.find({
      relations: ['minesiteInfo', 'inspectorInfo'],
    });
  }

  // Retrieve an inspection plan by ID
  async findOne(id: any): Promise<InspectionPlan> {
    const inspectionPlan = await this.inspectionPlanRepository.findOne({
      where: { id: id },
      relations: ['minesiteInfo', 'inspectorInfo'],
    });
    if (!inspectionPlan) {
      throw new NotFoundException(`Inspection plan with ID ${id} not found`);
    }
    return inspectionPlan;
  }

  // Update an existing inspection plan
  async update(
    id: number,
    updateInspectionPlanDto: CreateInspectionDTO,
  ): Promise<InspectionPlan> {
    const inspectionPlan = await this.findOne(id);
    Object.assign(inspectionPlan, updateInspectionPlanDto);
    return this.inspectionPlanRepository.save(inspectionPlan);
  }

  // Delete an inspection plan by ID
  async remove(id: number): Promise<void> {
    const inspectionPlan = await this.findOne(id);
    await this.inspectionPlanRepository.remove(inspectionPlan);
  }
}
