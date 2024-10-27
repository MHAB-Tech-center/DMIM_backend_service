import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { RMBRole } from 'src/entities/RMBRole.entity';
import { RMBStaffMember } from 'src/entities/RMBStaffMember.entity';
import { UsersService } from '../users/users.service';
import { RoleService } from '../roles/roles.service';
import { MailingService } from 'src/integrations/mailing/mailing.service';
import { SystemFeature } from 'src/entities/system-feature.entity';
import { EUserStatus } from 'src/common/Enum/EUserStatus.enum';
import { EAccountStatus } from 'src/common/Enum/EAccountStatus.enum';
import { InviteUser } from 'src/common/dtos/invite-user.dto';
import { ERole } from 'src/common/Enum/ERole.enum';
import { Profile } from 'src/entities/profile.entity';
import { UtilsService } from 'src/utils/utils.service';
import { CreateRMBStaffDTO } from '../rmb/dtos/createRMBStaff.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class RMBStaffService {
  constructor(
    @InjectRepository(RMBStaffMember)
    private rmbStaffRepository: Repository<RMBStaffMember>,
    @InjectRepository(RMBRole)
    private rmbRoleRepository: Repository<RMBRole>,
    @InjectRepository(SystemFeature)
    private systemFeatureRepository: Repository<SystemFeature>,
    private userService: UsersService,
    private roleService: RoleService,
    private mailingService: MailingService,
    private utilsService: UtilsService,
    private cloudinary: CloudinaryService,
  ) {}

  async getAll(): Promise<RMBStaffMember[]> {
    return await this.rmbStaffRepository.find({});
  }

  async getAllPending() {
    return this.rmbStaffRepository.findAndCount({
      where: { status: EUserStatus[EUserStatus.PENDING] },
    });
  }

  async getAllActive() {
    return this.rmbStaffRepository.findAndCount({
      where: { status: EAccountStatus[EUserStatus.ACTIVE] },
    });
  }

  async findById(id: UUID): Promise<RMBStaffMember> {
    return this.rmbStaffRepository
      .findOne({ where: { id: id } })
      .then((member) => {
        if (!member) throw new NotFoundException(`RTB Staff Member not found`);
        return member;
      });
  }

  async findByUser(userId: UUID): Promise<RMBStaffMember> {
    return this.findById(userId);
  }

  async save(member: RMBStaffMember): Promise<RMBStaffMember> {
    return await this.rmbStaffRepository.save(member);
  }
  async create(body: CreateRMBStaffDTO, file: Express.Multer.File) {
    let {
      firstName,
      lastName,
      email,
      national_id,
      phonenumber,
      password,
      province,
      district,
    } = body;

    // const userGender = this.utilsService.getGender(gender);
    password = await this.utilsService.hashString(password);
    if (!(await this.userService.existsByEmail(email)))
      throw new NotFoundException(
        'The profile you are trying to set up is not found',
      );

    let member: RMBStaffMember = new RMBStaffMember(
      firstName,
      lastName,
      email,
      new Date(),
      phonenumber,
      national_id,
      province,
      district,
    );
    const userProfile = await this.userService.getOneByEmail(email);
    member.profile = userProfile;
    userProfile.activationCode = null;
    userProfile.password = password;
    if (file) {
      const pictureUrl = await this.cloudinary.uploadImage(file).catch(() => {
        throw new BadRequestException('Invalid file type.');
      });
      userProfile.profile_pic = pictureUrl.url;
    }

    userProfile.status = EAccountStatus[EAccountStatus.ACTIVE];
    await this.userService.saveExistingProfile(
      userProfile,
      userProfile.roles[0],
    );
    await this.rmbStaffRepository.save(member);
  }

  async inviteRMBStaffMember(dto: InviteUser): Promise<any> {
    if (await this.userService.existsByEmail(dto.email))
      throw new ForbiddenException('RMB staff member already exists');
    const role = await this.roleService.getRoleByName(ERole[ERole.RMB]);
    let profile = new Profile(dto.email, null);
    profile.activationCode = this.userService.generateRandomFourDigitNumber();
    profile = await this.userService.saveExistingProfile(profile, role);
    await this.mailingService.sendEmail(
      `rmb-dmim://signup?email=${profile.email.toString()}`,
      'invite-rmb',
      profile.email.toString(),
      profile,
    );
  }

  async delete(id: UUID): Promise<boolean> {
    const member = await this.findById(id);
    await await this.rmbStaffRepository.remove(member);
    return true;
  }

  async addRMBRole(
    roleName: string,
    roleDescription: string,
    featureIds: string[],
  ): Promise<RMBRole> {
    const systemFeatures = await this.systemFeatureRepository.findByIds(
      featureIds,
    );
    const rtbRole = this.rmbRoleRepository.create({
      rtbRoleName: roleName,
      roleDescription,
      systemFeatures,
    });
    return this.rmbRoleRepository.save(rtbRole);
  }

  async getAllRMBRoles(): Promise<RMBRole[]> {
    return await this.rmbRoleRepository.find({});
  }

  async updateRMBRole(
    id: UUID,
    roleName: string,
    roleDescription: string,
    featureIds: string[],
  ): Promise<RMBRole> {
    const rtbRole = await this.rmbRoleRepository.findOne({ where: { id: id } });
    if (!rtbRole) throw new NotFoundException('RTB Role not found');

    rtbRole.rtbRoleName = roleName;
    rtbRole.roleDescription = roleDescription;
    rtbRole.systemFeatures = await this.systemFeatureRepository.findByIds(
      featureIds,
    );
    return this.rmbRoleRepository.save(rtbRole);
  }

  async deleteRMBRole(id: UUID): Promise<string> {
    const rmbRole = await this.rmbRoleRepository.findOne({ where: { id: id } });
    if (!rmbRole) throw new NotFoundException('RTB Role not found');
    await this.rmbRoleRepository.remove(rmbRole);
    return 'RTB Role Deleted Successfully';
  }

  async assignRMBRole(
    rtbRoleId: string,
    rmbStaffId: string,
  ): Promise<RMBStaffMember> {
    const [rtbRole, rtbStaffMember] = await Promise.all([
      this.rmbRoleRepository.findOne({ where: { id: rtbRoleId } }),
      this.rmbStaffRepository.findOne({ where: { id: rmbStaffId } }),
    ]);
    if (!rtbRole || !rtbStaffMember)
      throw new NotFoundException('Role or Staff not found');

    rtbStaffMember.rmbRole = rtbRole;
    return this.rmbStaffRepository.save(rtbStaffMember);
  }

  async updateRMBStaffRole(
    rtbRoleId: string,
    rtbStaffId: string,
  ): Promise<RMBStaffMember> {
    return this.assignRMBRole(rtbRoleId, rtbStaffId);
  }

  async dissociateRMBRole(rmbStaffId: string): Promise<RMBStaffMember> {
    const rtbStaffMember = await this.rmbStaffRepository.findOne({
      where: { id: rmbStaffId },
    });
    if (!rtbStaffMember)
      throw new NotFoundException('RTB Staff Member not found');

    rtbStaffMember.rmbRole = null;
    return this.rmbStaffRepository.save(rtbStaffMember);
  }

  async findByStatus(status: string) {
    return this.rmbStaffRepository.findOne({
      where: { status: status },
    });
  }
}
