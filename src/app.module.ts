/* eslint-disable */
/*
 @auhor : © 2024 Valens Niyonsenga <valensniyonsenga2003@gmail.com>
*/

/**
 * @file
 * @brief file App module
 */
import { Module, OnModuleInit } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { HomeController } from './home/home.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailingModule } from './integrations/mailing/mailing.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { FilesModule } from './integrations/files/files.module';
import { UtilsModule } from './utils/utils.module';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { RoleService } from './modules/roles/role.service';
import { RoleModule } from './modules/roles/role.module';
import { Inspector } from './entities/inspector.entity';
import { Company } from './entities/company.entity';
import { MineSite } from './entities/minesite.entity';
import { Notification } from './entities/notification.entity';
import { InspectionPlan } from './entities/InspectionPlan.entity';
import { Profile } from './entities/profile.entity';
import { InspectorsModule } from './modules/inspectors/inspectors.module';
import { RmbModule } from './modules/rmb/rmb.module';
import { RMBStaffMember } from './entities/RMBStaffMember.entity';
import { MinesiteModule } from './modules/minesite/minesite.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { InspectionsModule } from './modules/inspections/inspections.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SectionsModule } from './modules/sections/sections.module';
import { Section } from './entities/section.entity';
import { Category } from './entities/category.entity';
import { InspectionRecord } from './entities/inspection-record.entity';
import { ReportingModule } from './modules/reporting/reporting.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { InspectionIdentification } from './entities/inspection-identification.entity';
import { InspectionReview } from './entities/inspection-review.entity';
import { SummaryReport } from './entities/summary-report.entity';
import { CoordinatesModule } from './modules/coordinates/coordinates.module';
import { Coordinate } from './entities/coordinate.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule here
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          Profile,
          RMBStaffMember,
          Role,
          Inspector,
          Company,
          MineSite,
          Notification,
          InspectionPlan,
          Section,
          Category,
          InspectionRecord,
          InspectionIdentification,
          InspectionReview,
          Coordinate,
          SummaryReport,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    JwtModule,
    UsersModule,
    RoleModule,
    MailingModule,
    AuthModule,
    FilesModule,
    UtilsModule,
    RmbModule,
    CloudinaryModule,
    InspectorsModule,
    MinesiteModule,
    InspectionsModule,
    CategoriesModule,
    SectionsModule,
    ReportingModule,
    ReviewsModule,
    CoordinatesModule,
  ],
  controllers: [AuthController, HomeController],
  providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly roleService: RoleService) {}

  async onModuleInit() {
    let roles = await this.roleService.getAllRoles();
    if (!roles || roles.length == 0) {
      this.roleService.createRoles();
    }
  }
}
