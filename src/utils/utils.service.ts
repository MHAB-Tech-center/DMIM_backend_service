import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { CreateInspectionDTO } from 'src/common/dtos/inspections/create-inspection.dto';
import { EGender } from 'src/common/Enum/EGender.enum';
import { EInspectionStatus } from 'src/common/Enum/EInspectionStatus.enum';
import { EInspectorRole } from 'src/common/Enum/EInspectorRole.enum';
import { ERole } from 'src/common/Enum/ERole.enum';
import { Category } from 'src/entities/category.entity';
import { InspectionIdentification } from 'src/entities/inspection-identification.entity';
import { InspectionRecord } from 'src/entities/inspection-record.entity';
import { Profile } from 'src/entities/profile.entity';
import { Role } from 'src/entities/role.entity';
import { SummaryReport } from 'src/entities/summary-report.entity';
import { RoleService } from 'src/modules/roles/roles.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class UtilsService {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private roleService: RoleService,
  ) {}

  async getTokens(
    user: Profile,
  ): Promise<{ accessToken: String; refreshToken: String }> {
    const accessToken: String = await this.jwt.signAsync(
      { roles: user.roles, id: user.id },
      {
        expiresIn: '3h',
        secret: this.config.get('SECRET_KEY'),
      },
    );
    const refreshToken: String = await this.jwt.signAsync(
      { roles: user.roles, id: user.id },
      {
        expiresIn: '1d',
        secret: this.config.get('SECRET_KEY'),
      },
    );

    return {
      accessToken: accessToken.toString(),
      refreshToken: refreshToken.toString(),
    };
  }
  async hashString(input) {
    try {
      if (typeof input !== 'string') {
        throw new Error('Input must be a string');
      }
      const hash = await bcrypt.hash(input, 10);
      return hash;
    } catch (error) {
      console.error('Error occurred while hashing:', error.message);
    }
  }

  async getLoggedInProfile(req: Request) {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.split(' ')[1];
      if (!authorization.toString().startsWith('Bearer '))
        throw new UnauthorizedException('The provided token is invalid');
      const { tokenVerified, error } = this.jwt.verify(token, {
        secret: this.config.get('SECRET_KEY'),
      });
      if (error)
        throw new BadRequestException(
          'Errow accured while getting the profile ' + error.message,
        );
      const details: any = await this.jwt.decode(token);
      return await this.userService.getUserById(details.id, 'User');
    } else {
      throw new UnauthorizedException(
        'Please you are not authorized to access resource',
      );
    }
  }
  async getRole(role: string): Promise<Role> {
    let availableRole: Role;
    switch (role.toLowerCase()) {
      case 'inspector':
        availableRole = await this.roleService.getRoleByName(
          ERole[ERole.INSPECTOR],
        );
        break;
      case 'rmb':
        availableRole = await this.roleService.getRoleByName(ERole[ERole.RMB]);
        break;
      case 'environomist':
        availableRole = await this.roleService.getRoleByName(
          ERole[ERole.ENVIRONOMIST],
        );
        break;
      case 'superviosr':
        availableRole = await this.roleService.getRoleByName(
          ERole[ERole.SUPERVISOR],
        );
        break;
      default:
        throw new BadRequestException('The provided role is invalid');
    }
    return availableRole;
  }

  getGender(gender: string): string {
    switch (gender.toLowerCase()) {
      case 'male':
        return EGender[EGender.MALE];
      case 'female':
        return EGender[EGender.FEMALE];
      default:
        throw new BadRequestException(
          'The provided gender is invalid, should male or female',
        );
    }
  }

  getInspectionStatus(inspectionStatus: string): string {
    switch (inspectionStatus.toLowerCase()) {
      case 'submitted':
        return EInspectionStatus[EInspectionStatus.SUBMITTED];
      case 'concluded':
        return EInspectionStatus[EInspectionStatus.CONCLUDED];
      case 'reviewed':
        return EInspectionStatus[EInspectionStatus.REVIEWED];
      default:
        throw new BadRequestException(
          'The provided inspection status is invalid, should be in  [ submitted, concluded, reviewed]',
        );
    }
  }
  getRecordRank(flag: string): number {
    switch (flag.toLowerCase()) {
      case 'red':
        return 40;
      case 'green':
        92;
      case 'yellow':
        return 0;
    }
  }
  getInspectorRole(role: string): string {
    switch (role.toLowerCase()) {
      case 'inspector':
        return EInspectorRole[EInspectorRole.INSPECTOR];
      case 'environmentalist':
        return EInspectorRole[EInspectorRole.ENVIRONMENTALIST];
      case 'supervisor':
        return EInspectorRole[EInspectorRole.INSPECTOR];
      default:
        throw new BadRequestException(
          'The provided role is invalid, should be in [ inspector, environmentalist, supervisor]',
        );
    }
  }

  getIdentificationIdentity(
    dto: CreateInspectionDTO,
  ): InspectionIdentification {
    return new InspectionIdentification(
      dto.identification.mineOwner,
      dto.identification.mineOperator,
      dto.identification.licenseNumber,
      dto.identification.mainBuyers,
      dto.identification.licenseCategory,
      dto.identification.licenseIssueDate,
      dto.identification.licenseExpirationDate,
      dto.identification.province,
      dto.identification.district,
      dto.identification.sector,
      dto.identification.cell,
      dto.identification.responsiblePersonNames,
      dto.identification.responsiblePersonTitle,
      dto.identification.responsiblePersonContact,
    );
  }
  getSummaryReportEntity(dto: CreateInspectionDTO) {
    return new SummaryReport(
      dto.summaryReport.mainProblems,
      dto.summaryReport.proposedRemedialActions,
      dto.summaryReport.certificationStatus,
    );
  }

  rankInspectionRecord(
    inspectionRecord: InspectionRecord,
    category: Category,
  ): InspectionRecord {
    if (
      inspectionRecord.boxValue == 'yes' &&
      category.section.flagStandard.toUpperCase() == 'RED'
    ) {
      inspectionRecord.flagValue = 'RED';
    } else if (
      inspectionRecord.boxValue == 'yes' &&
      category.section.flagStandard.toUpperCase() == 'YELLOW'
    ) {
      inspectionRecord.flagValue = 'YELLOW';
    } else {
      inspectionRecord.flagValue = 'NO';
    }
    return inspectionRecord;
  }
}
