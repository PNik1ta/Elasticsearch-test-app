import { Injectable, LoggerService, OnModuleInit } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ElasticsearchLoggerService } from './logger.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly loggerService: ElasticsearchLoggerService
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit() {
    this.loggerService.error('ERROR HERE!!!', 'trace');
    this.loggerService.log('LOG HERE!!!');
    this.loggerService.warn('WARN HERE!!!');
  }
}
