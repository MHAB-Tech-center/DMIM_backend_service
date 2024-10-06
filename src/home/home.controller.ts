/* eslint-disable */
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('home')
@Controller('')
export class HomeController {
  @Get('/')
  getHello(): string {
    return 'Kabstore MIS APIs ARE ONLINE';
  }
}
