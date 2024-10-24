import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInspectionDTO } from 'src/common/dtos/inspections/create-inspection.dto';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { InspectionPlan } from 'src/entities/InspectionPlan.entity';
import { Repository } from 'typeorm';
import { MinesiteService } from '../minesite/minesite.service';
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
import { UUID } from 'crypto';
import { CategoriesService } from '../categories/categories.service';
import { EInspectionStatus } from 'src/common/Enum/EInspectionStatus.enum';
import { EditInspectionRecordDTO } from 'src/common/dtos/inspections/edit-inspection.dto';
import { EditManyInspectionRecordsDTO } from 'src/common/dtos/inspections/edit-many-inspections-records.dto';
import { ReviewInspectionPlanDTO } from 'src/common/dtos/inspections/review-inspection-plan.dto';
import { MailingService } from 'src/integrations/mailing/mailing.service';
import { InspectionReview } from 'src/entities/inspection-review.entity';
import { ReviewsService } from '../reviews/reviews.service';

@Injectable()
export class InspectionsService {
  constructor(
    @InjectRepository(InspectionPlan)
    private readonly inspectionPlanRepository: Repository<InspectionPlan>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(InspectionRecord)
    private readonly recordRepository: Repository<InspectionRecord>,
    private categoryService: CategoriesService,
    private minesiteService: MinesiteService,
    private utilService: UtilsService,
    private inspectorService: InspectorsService,
    private sectionService: SectionsService,
    private mailingService: MailingService,
    private reviewService: ReviewsService,
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

  async getRecordByCategoryAndPseudoName(
    category: Category,
    pseudoName: string,
  ) {
    const record = await this.recordRepository.findOne({
      where: { category: { id: category.id }, pseudoName: pseudoName },
    });
    return record;
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
      let category;
      if (
        !(await this.categoryService.existsByTitleInspectionPlan(
          record.category.title,
          dto.inspectionPlanId,
        ))
      ) {
        category = await this.categoryRepository.save(categoryEntity);
      } else {
        category = await this.categoryService.findByTitleInspectionPlan(
          record.category.title,
          dto.inspectionPlanId,
        );
      }
      let inspectionRecord = await this.getRecordByCategoryAndPseudoName(
        category,
        record.pseudoName,
      );
      // Check if the record exist
      if (!inspectionRecord) {
        // create new record
        inspectionRecord = new InspectionRecord(
          record.title,
          record.boxValue,
          record.flagValue,
          category,
        );
      } else {
        // Update the existing record
        inspectionRecord.boxValue = record.boxValue;
        inspectionRecord.flagValue = record.flagValue;
        inspectionRecord.title = record.title;
      }
      // Check the pseudoName

      inspectionRecord.pseudoName = record.pseudoName;
      if (record.flagValue) {
        record.flagValue.toLowerCase() == 'red'
          ? (inspectionRecord.marks = 40)
          : record.flagValue.toLowerCase() == 'green'
          ? (inspectionRecord.marks = 85)
          : (inspectionRecord.marks = 60);
      }
      await this.recordRepository.save(inspectionRecord);
    });
    // Change the status to submitted
    inspectionPlan.status = EInspectionStatus[EInspectionStatus.SUBMITTED];
    await this.inspectionPlanRepository.save(inspectionPlan);
    return new ApiResponse(
      true,
      'The inspection records were created successfully',
      inspectionPlan,
    );
  }
  async findRecordByCategoryAndPseudoName(
    category: Category,
    pseudoName: string,
  ) {
    const record = await this.recordRepository.findOne({
      where: {
        category: { id: category.id },
        pseudoName: pseudoName,
      },
    });
    if (!record)
      throw new NotFoundException(
        'The record with the provided pseudoName and category is not found',
      );
    return record;
  }

  async editInspectionRecord(dto: EditInspectionRecordDTO) {
    const category = await this.categoryService.findById(dto.categoryId);
    const recordEntity = await this.findRecordByCategoryAndPseudoName(
      category,
      dto.pseudoName,
    );
    recordEntity.boxValue = dto.data.boxValue;
    recordEntity.flagValue = dto.data.flagValue;
    recordEntity.title = dto.data.title;
    recordEntity.marks = this.utilService.getRecordRank(recordEntity.flagValue);
    return await this.recordRepository.save(recordEntity);
  }
  async editManyInspectionRecords(dto: EditManyInspectionRecordsDTO) {
    dto.data.forEach(async (recordDTO) => {
      const category = await this.categoryService.findById(
        recordDTO.categoryId,
      );
      const recordEntity = await this.findRecordByCategoryAndPseudoName(
        category,
        recordDTO.pseudoName,
      );
      recordEntity.boxValue = recordDTO.data.boxValue;
      recordEntity.flagValue = recordDTO.data.flagValue;
      recordEntity.title = recordDTO.data.title;
      recordEntity.marks = this.utilService.getRecordRank(
        recordEntity.flagValue,
      );
      await this.recordRepository.save(recordEntity);
    });
    return 'All records were updated successfully';
  }
  async reviewInspectionPlan(dto: ReviewInspectionPlanDTO) {
    const inspectionPlan: InspectionPlan = await this.getInspectionPlan(
      dto.planId,
    );
    if (inspectionPlan.status == EInspectionStatus[EInspectionStatus.REVIEWED])
      throw new BadRequestException('The inspection plan is alreay reviewed');
    inspectionPlan.status = EInspectionStatus[EInspectionStatus.REVIEWED];
    const reviews: InspectionReview[] = inspectionPlan.reviews;

    const review: InspectionReview = await this.reviewService.saveReview(
      dto.reviewMessage,
      inspectionPlan,
    );
    reviews.push(review);
    inspectionPlan.reviews = reviews;
    await this.inspectionPlanRepository.save(inspectionPlan);
    // sednd an email
    await this.mailingService.sendEmail(
      '',
      'review',
      inspectionPlan.inspectorInfo.lastName,
      inspectionPlan.inspectorInfo.profile,
      review.comment,
      inspectionPlan.inspectorInfo.email,
    );
  }
  async getInspectionPlanByStatus(status: string) {
    const inspectionStatus: string = await this.utilService.getInspectionStatus(
      status,
    );
    const inspectionPlans = await this.inspectionPlanRepository.find({
      where: { status: inspectionStatus },
    });
    return inspectionPlans;
  }
  async getInspectionPlan(planId: UUID) {
    const inspectionPlan = await this.inspectionPlanRepository.findOne({
      where: { id: planId },
      relations: ['minesiteInfo', 'inspectorInfo'],
    });
    if (!inspectionPlan)
      throw new NotFoundException(
        'The inspection plan witht the provided Id is not found',
      );
    return inspectionPlan;
  }
  async getCategoriesInspectionPlan(planId: UUID): Promise<Category[]> {
    const inspectionPlan: any = await this.getInspectionPlan(planId);
    const categoryList: Category[] = await this.categoryRepository.find({
      where: {
        inspectionPlan: { id: inspectionPlan.id },
      },
      relations: ['section', 'records'],
    });
    return categoryList;
  }
  async getRecordsByCategory(categoryId: UUID): Promise<ApiResponse> {
    const category: any = await this.categoryService.findById(categoryId);
    const records: InspectionRecord[] = await this.recordRepository.find({
      where: {
        category: { id: category.id },
      },
      relations: ['category'],
    });
    return new ApiResponse(
      true,
      'Records were retrieved successfully',
      records,
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
