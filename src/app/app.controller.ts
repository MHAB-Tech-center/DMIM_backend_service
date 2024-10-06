import {  Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('home')
  greeting() {
    return 'Hello user 😀! Welcome to kabstore-mis';
  }
}
