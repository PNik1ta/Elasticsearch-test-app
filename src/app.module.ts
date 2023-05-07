import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { stdTimeFunctions } from 'pino';
import { ElasticsearchLoggerService } from './logger.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    LoggerModule.forRoot({
      pinoHttp: {
        timestamp: stdTimeFunctions.isoTime,
        level: process.env.NODE_ENV !== 'production' ? 'trace' : 'info',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ElasticsearchLoggerService,
    {
      provide: ElasticsearchLoggerService,
      useClass: ElasticsearchLoggerService,
    },
  ],
  exports: [ElasticsearchLoggerService],
})
export class AppModule { }
