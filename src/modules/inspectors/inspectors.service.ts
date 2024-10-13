import {
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
  async existsByEmail(email: string): Promise<boolean> {
    const exists = await this.inspectorRepo.exist({ where: { email } });
    return exists;
  }

  async create(body: CreateInspectorDTO) {
    let { firstName, lastName, email, gender, national_id, phonenumber } = body;

    // const userGender = this.utilsService.getGender(gender);
    try {
      if (!this.userService.existsByEmail(email))
        throw new NotFoundException(
          'The profile you are trying to set up is not found',
        );
      const userFetched = await this.existsByEmail(email);
      if (userFetched)
        return new UnauthorizedException('The RMB member already exists');
      const inspector: RMBStaffMember = new RMBStaffMember(
        firstName,
        lastName,
        email,
        new Date(),
        phonenumber,
        national_id,
      );
      const userProfile = await this.userService.getOneByEmail(email);
      inspector.profile = userProfile;
      await this.inspectorRepo.save(inspector);
      await this.mailingService.sendEmail(
        '',
        'verify-email',
        lastName,
        userProfile,
      );
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

  async inviteInspector(dto: InviteUser): Promise<any> {
    try {
      if (await this.userService.existsByEmail(dto.email))
        throw new ForbiddenException('An inspector already exists');
      const password = await this.userService.getDefaultPassword();
      let profile = new Profile(dto.email, password);
      await this.userService.saveExistingProfile(profile);
      await this.mailingService.sendEmail(
        '',
        'invite-inspector',
        profile.email.toString(),
        profile,
      );
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
