import {
  BadRequestException,
  ForbiddenException,
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
import { Profile } from 'src/entities/profile.entity';
import { UsersService } from '../users/users.service';
import { InviteUser } from 'src/common/dtos/invite-user.dto';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Role } from 'src/entities/role.entity';

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
    private cloudinary: CloudinaryService,
  ) {}

  async getAll() {
    const response = await this.rmbRepo.find({});
    return new ApiResponse(
      true,
      'All RMB staff members were retrieved successfully',
      response,
    );
  }
  async getByEmail(email: any) {
    const user = await this.rmbRepo.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }
  async create(body: CreateRMBStaffDTO, file: Express.Multer.File) {
    let { firstName, lastName, email, national_id, password, phonenumber } =
      body;

    const userFetched = await this.rmbRepo.findOne({
      where: {
        email: email,
      },
    });
    if (userFetched)
      return new UnauthorizedException('The RMB member already exists');
    const pictureUrl = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    const userPassword = await this.utilsService.hashString(password);
    // const userGender = this.utilsService.getGender(gender);
    try {
      if (!this.userService.existsByEmail(email))
        throw new NotFoundException(
          'The profile you are trying to set up is not found',
        );
      const rmbMember: RMBStaffMember = new RMBStaffMember(
        firstName,
        lastName,
        email,
        new Date(),
        phonenumber,
        national_id,
      );
      const profile: Profile = await this.userService.getOneByEmail(email);
      profile.profile_pic = pictureUrl.url;
      profile.password = userPassword;
      profile.activationCode = this.userService.generateRandomFourDigitNumber();
      rmbMember.profile = profile;
      await this.rmbRepo.save(rmbMember);
      await this.mailingService.sendEmail(
        '',
        'verify-email',
        lastName,
        profile,
      );
      return new ApiResponse(
        true,
        `We have sent a verification code to the created RMB member email for verification`,
        null,
      );
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
      const updatedProfile: Profile =
        await this.userService.saveExistingProfile(profile, profile.roles[0]);
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

  async inviteRMBStaffMember(dto: InviteUser): Promise<ApiResponse> {
    try {
      if (await this.userService.existsByEmail(dto.email)) {
        throw new ForbiddenException('The RMB member already exists');
      }
      const password = await this.userService.getDefaultPassword();
      let profile = new Profile(dto.email, password);
      const role: Role = await this.utilsService.getRole('rmb');
      await this.userService.saveExistingProfile(profile, role);
      await this.mailingService.sendEmail(
        '',
        'invite-rmb',
        profile.email.toString(),
        profile,
      );
      return new ApiResponse(
        true,
        'The RMB staff member was invited successfully',
        null,
      );
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id: UUID): Promise<ApiResponse> {
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
      return new ApiResponse(
        true,
        'The rmb staff member was deleted successfully',
        rmbMember,
      );
    } catch (error) {
      console.log(error);
    }
  }
  async findById(id: UUID): Promise<RMBStaffMember> {
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
  async delete(id: UUID): Promise<any> {
    const rmbMember = await this.findById(id);
    if (!rmbMember) {
      throw new NotFoundException('User not found');
    }
    this.rmbRepo.remove(rmbMember);
    return new ApiResponse(
      true,
      'The rmb staff member was deleted successfully',
      null,
    );
  }
}
