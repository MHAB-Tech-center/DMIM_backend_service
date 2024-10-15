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
import { Inspector } from 'src/entities/inspector.entity';
import { Repository } from 'typeorm';
import { MailingService } from 'src/integrations/mailing/mailing.service';
import { UtilsService } from 'src/utils/utils.service';
import { RoleService } from '../roles/role.service';
import { UsersService } from '../users/users.service';
import { CreateInspectorDTO } from './dtos/createInspector.dto';
import { ERole } from 'src/common/Enum/ERole.enum';
import { Profile } from 'src/entities/profile.entity';
import { RMBStaffMember } from 'src/entities/RMBStaffMember.entity';
import { UUID } from 'crypto';
import { InviteUser } from 'src/common/dtos/invite-user.dto';
import { ApiResponse } from 'src/common/payload/ApiResponse';
import { MinesiteService } from '../minesite/minesite.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class InspectorsService {
  constructor(
    @InjectRepository(Inspector) public inspectorRepo: Repository<Inspector>,
    @Inject(forwardRef(() => UtilsService))
    private utilsService: UtilsService,
    private mailingService: MailingService,
    private roleService: RoleService,
    private userService: UsersService,
    private mineSiteService: MinesiteService,
    private cloudinary: CloudinaryService,
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
  async existsByEmail(email: string): Promise<boolean> {
    const exists = await this.inspectorRepo.exist({ where: { email } });
    return exists;
  }

  async create(body: CreateInspectorDTO, file: Express.Multer.File) {
    let {
      firstName,
      lastName,
      email,
      national_id,
      phonenumber,
      minesiteId,
      password,
      inspectorRole,
      province,
      district,
    } = body;

    const minesite = await this.mineSiteService.findById(minesiteId);
    const pictureUrl = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    // const userGender = this.utilsService.getGender(gender);
    password = await this.utilsService.hashString(password);
    if (!(await this.userService.existsByEmail(email)))
      throw new NotFoundException(
        'The profile you are trying to set up is not found',
      );

    let role: string = this.utilsService.getInspectorRole(inspectorRole);
    const inspector: Inspector = new Inspector(
      firstName,
      lastName,
      email,
      new Date(),
      phonenumber,
      national_id,
      role,
      province,
      district,
    );
    const userProfile = await this.userService.getOneByEmail(email);
    inspector.profile = userProfile;
    inspector.minesite = minesite;
    userProfile.activationCode = null;
    userProfile.password = password;
    userProfile.profile_pic = pictureUrl.url;
    await this.userService.saveExistingProfile(userProfile);
    await this.inspectorRepo.save(inspector);
    return new ApiResponse(
      true,
      `Thank you for setting up your profile, go and login`,
      null,
    );
  }

  async update(id: UUID, dto: CreateInspectorDTO) {
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
    const updatedProfile: Profile = await this.userService.saveExistingProfile(
      profile,
    );
    inspector.firstName = dto.firstName;
    inspector.lastName = dto.lastName;
    inspector.email = dto.email;
    inspector.phoneNumber = dto.phonenumber;
    inspector.nationalId = dto.national_id;
    inspector.profile = updatedProfile;
    return await this.inspectorRepo.save(inspector);
  }

  async inviteInspector(dto: InviteUser): Promise<any> {
    if (await this.userService.existsByEmail(dto.email))
      throw new ForbiddenException('An inspector already exists');
    const password = await this.userService.getDefaultPassword();
    let profile = new Profile(dto.email, password);
    profile.activationCode = this.userService.generateRandomFourDigitNumber();
    await this.userService.saveExistingProfile(profile);
    await this.mailingService.sendEmail(
      '',
      'invite-inspector',
      profile.email.toString(),
      profile,
    );
  }

  async getById(id: UUID) {
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
  }
  async delete(id: UUID) {
    const rmbMember = await this.getById(id);
    if (!rmbMember) {
      throw new NotFoundException('The inspector is not found');
    }
    this.inspectorRepo.remove(rmbMember);
  }
}
