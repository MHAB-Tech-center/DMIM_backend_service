import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inspector } from 'src/entities/inspector.entity';
import { Repository } from 'typeorm';
import { MailingService } from 'src/integrations/mailing/mailing.service';
import { UtilsService } from 'src/utils/utils.service';
import { RoleService } from '../roles/role.service';
import { UsersService } from '../users/users.service';
import { CreateInspectorDTO } from './dtos/createInspector.dto';
import { ERole } from 'src/common/Enum/ERole.enum';
import { EGender } from 'src/common/Enum/EGender.enum';
import { Profile } from 'src/entities/profile.entity';
import { EAccountStatus } from 'src/common/Enum/EAccountStatus.enum';
import { RMBStaffMember } from 'src/entities/RMBStaffMember.entity';
import { CreateRMBStaffDTO } from '../rmb/dtos/createRMBStaff.dto';
import { UUID } from 'crypto';

@Injectable()
export class InspectorsService {
  constructor(
    @InjectRepository(Inspector) public inspectorRepo: Repository<Inspector>,
    @Inject(forwardRef(() => UtilsService))
    private utilsService: UtilsService,
    private mailingService: MailingService,
    private roleService: RoleService,
    private userService: UsersService,
  ) {}
  async getAll() {
    const response = await this.inspectorRepo.find({});
    return response;
  }
  async getByEmail(email: any) {
    const user = await this.inspectorRepo.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async create(body: CreateInspectorDTO) {
    let {
      firstName,
      lastName,
      email,
      username,
      myGender,
      national_id,
      phonenumber,
    } = body;

    const userFetched = await this.inspectorRepo.findOne({
      where: {
        email: email,
      },
    });
    if (userFetched)
      return new UnauthorizedException('The RMB member already exists');
    let gender;
    const role = await this.roleService.getRoleByName(ERole[ERole.INSPECTOR]);
    switch (myGender.toLowerCase()) {
      case 'male':
        gender = EGender[EGender.MALE];
        break;
      case 'female':
        gender = EGender[EGender.FEMALE];
        break;
      default:
        throw new BadRequestException(
          'The provided gender is invalid, should male or female',
        );
    }

    try {
      const password = await this.utilsService.hashString('Default');
      const inspector: RMBStaffMember = new RMBStaffMember(
        firstName,
        lastName,
        email,
        new Date(),
        phonenumber,
        national_id,
      );
      const savedProfile = await this.userService.createProfile(
        email,
        username,
        password,
        role,
      );
      inspector.profile = savedProfile;
      await this.inspectorRepo.save(inspector);
      await this.mailingService.sendEmail('', false, savedProfile);
      return {
        success: true,
        message: `We have sent a verification code to the Inspector email for verification`,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: UUID, dto: CreateInspectorDTO) {
    try {
      const profile = await this.userService.getUserById(id, 'User');
      const inspector: Inspector = await this.inspectorRepo.findOne({
        where: {
          email: dto.email,
        },
      });
      if (!profile || !inspector) {
        throw new NotFoundException(
          'An inspector with the provided email not found',
        );
      }
      profile.email = dto.email;
      profile.username = dto.username;
      const updatedProfile: Profile =
        await this.userService.saveExistingProfile(profile);
      inspector.firstName = dto.firstName;
      inspector.lastName = dto.lastName;
      inspector.email = dto.email;
      inspector.phoneNumber = dto.phonenumber;
      inspector.nationalId = dto.national_id;
      inspector.profile = updatedProfile;
      return await this.inspectorRepo.save(inspector);
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id: UUID) {
    try {
      const rmbMember = await this.inspectorRepo.findOne({
        where: {
          id: id,
        },
      });
      if (!rmbMember)
        throw new NotFoundException(
          'The Inspector with the provided id is not found',
        );
      return rmbMember;
    } catch (error) {
      console.log(error);
    }
  }
  async delete(id: UUID) {
    const rmbMember = await this.getById(id);
    if (!rmbMember) {
      throw new NotFoundException('The inspector is not found');
    }
    this.inspectorRepo.remove(rmbMember);
  }
}
