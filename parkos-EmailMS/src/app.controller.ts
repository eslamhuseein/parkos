import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('send_email')
  async handleSendEmail(data: Record<string, unknown>) {
    console.log('Data: ', data);
    
    console.log(`${data.name} has been paid , email sent to ${data.email}`);
  }
}
