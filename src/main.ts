import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ElasticsearchLoggerService } from './logger.service';
import { Request, Response } from 'express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerService = app.get(ElasticsearchLoggerService);

  app.use((req: Request, res: Response, next) => {
    express.json()(req, res, () => {
      loggerService.logHTTPRequest(req.method, req.url, JSON.stringify(req.body), res.statusCode);
      next();
    });
  });

  await app.listen(3000);
}
bootstrap();
