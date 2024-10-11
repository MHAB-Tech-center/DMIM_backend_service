import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { RMBStaffMember } from 'src/entities/RMBStaffMember.entity';
import { MailingService } from 'src/integrations/mailing/mailing.service';
import { UtilsService } from 'src/utils/utils.service';
import { Repository } from 'typeorm';
import { CreateRMBStaffDTO } from './dtos/createRMBStaff.dto';
import { RoleService } from '../roles/role.service';
import { ERole } from 'src/common/Enum/ERole.enum';
import { EGender } from 'src/common/Enum/EGender.enum';
import { Profile } from 'src/entities/profile.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class RmbService {
  constructor(
    @InjectRepository(RMBStaffMember)
    public rmbRepo: Repository<RMBStaffMember>,
    @Inject(forwardRef(() => UtilsService))
    private utilsService: UtilsService,
    private mailingService: MailingService,
    private roleService: RoleService,
    private userService: UsersService,
  ) {}
  async getAll() {
    const response = await this.rmbRepo.find({});
    return response;
  }
  async getByEmail(email: any) {
    const user = await this.rmbRepo.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async create(body: CreateRMBStaffDTO) {
    let {
      firstName,
      lastName,
      email,
      username,
      myGender,
      national_id,
      phonenumber,
    } = body;

    const userFetched = await this.rmbRepo.findOne({
      where: {
        email: email,
      },
    });
    if (userFetched)
      return new UnauthorizedException('The RMB member already exists');
    let gender;
    const role = await this.roleService.getRoleByName(ERole[ERole.RMB]);
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
      const rmbMember: RMBStaffMember = new RMBStaffMember(
        firstName,
        lastName,
        email,
        new Date(),
        phonenumber,
        national_id,
      );
      const profile: Profile = await this.userService.createProfile(
        email,
        username,
        password,
        role,
      );
      profile.activationCode = this.userService.generateRandomFourDigitNumber();

      rmbMember.profile = profile;
      await this.rmbRepo.save(rmbMember);
      await this.mailingService.sendEmail('', false, profile);
      return {
        success: true,
        message: `We have sent a verification code to the created RMB member email for verification`,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: UUID, dto: CreateRMBStaffDTO) {
    try {
      const profile = await this.userService.getUserById(id, 'User');
      const savedMember: RMBStaffMember = await this.rmbRepo.findOne({
        where: {
          email: dto.email,
        },
      });
      if (!profile || !savedMember) {
        throw new NotFoundException(
          'The user with the provided email not found',
        );
      }
      profile.email = dto.email;
      profile.username = dto.username;
      const updatedProfile: Profile =
        await this.userService.saveExistingProfile(profile);
      savedMember.firstName = dto.firstName;
      savedMember.lastName = dto.lastName;
      savedMember.email = dto.email;
      savedMember.phoneNumber = dto.phonenumber;
      savedMember.nationalId = dto.national_id;
      savedMember.profile = updatedProfile;
      return await this.rmbRepo.save(savedMember);
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id: UUID) {
    try {
      const rmbMember = await this.rmbRepo.findOne({
        where: {
          id: id,
        },
      });
      if (!rmbMember)
        throw new NotFoundException(
          'The rmb Member with the provided id is not found',
        );
      return rmbMember;
    } catch (error) {
      console.log(error);
    }
  }
  async delete(id: UUID) {
    const rmbMember = await this.getById(id);
    if (!rmbMember) {
      throw new NotFoundException('User not found');
    }
    this.rmbRepo.remove(rmbMember);
  }
}
