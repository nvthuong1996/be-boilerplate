import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('abcd')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('abcd')
  getHello(): string {
    return this.appService.getHello();
  }
}
