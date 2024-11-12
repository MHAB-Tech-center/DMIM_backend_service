import { Global, Module } from '@nestjs/common';
import { ReportingController } from './reporting.controller';
import { ReportService } from './report.service';

@Global()
@Module({
  providers: [ReportService],
  controllers: [ReportingController],
})
export class ReportingModule {}
