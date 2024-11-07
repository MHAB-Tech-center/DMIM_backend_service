/*
 @auhor : © 2024 Valens Niyonsenga <valensniyonsenga2003@gmail.com>
*/

/**
 * @file
 * @brief services for auth queries
 */
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResetPasswordDTO } from 'src/common/dtos/reset-password.dto';
import { ERole } from 'src/common/Enum/ERole.enum';
import { Profile } from 'src/entities/profile.entity';
import { Role } from 'src/entities/role.entity';
import { UtilsService } from 'src/utils/utils.service';
import { InspectorsService } from '../inspectors/inspectors.service';
import { RMBStaffService } from '../rmb-staff/rmb-staff.service';
import { ProfileResponse } from './dtos/responses/profile-response.dto';
import { RMBStaffMember } from 'src/entities/RMBStaffMember.entity';

@Injectable()
export class AuthService {
  constructor(private utilsService: UtilsService, private inspectorService: InspectorsService, private rmbService: RMBStaffService) {}

  async getProfile(req: Request) {
      const user: Profile = await this.utilsService.getLoggedInProfile(req);
      let response : any = user;
      const profilePromises = user.roles.map(async (role: Role) => {
        if (role.role_name === ERole.INSPECTOR || role.role_name === ERole.SUPERVISOR || role.role_name === ERole.ENVIRONOMIST) {
          const profile = await this.inspectorService.getLoggedInInspector(req);
          return new ProfileResponse(profile.firstName, profile.email, user.roles, null, profile.province, profile.district, profile.phoneNumber, user.profile_pic);
        } else if (role.role_name === ERole.RMB) {
          const profile: RMBStaffMember = await this.rmbService.getLoggedInRMBStaff(req);
          return new ProfileResponse(profile.firstName + " " + profile.lastName, profile.email, user.roles, profile.rmbRole, profile.province, profile.district, profile.phoneNumber, user.profile_pic);
        }
        return user; 
      });
      
      const profiles = (await Promise.all(profilePromises)).filter(profile => profile !== null);
      response = profiles.length > 0 ? profiles[0] : null; // Adjust as needed
      
      return response;
      
  }

  async verifyProfile(req: Request) {
    const data: { code: number } = req.body;
  }

  async changePassword(doto: ResetPasswordDTO) {

  }
}
