import { Controller, Get } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Controller()
export class AppController {
  constructor(private readonly logger: PinoLogger) {}

  @Get()
  getHello(): string {
    this.logger.info('Hello world!');
    return 'Hello world';
  }
}
