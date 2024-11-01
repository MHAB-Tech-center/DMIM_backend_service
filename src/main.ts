/* eslint-disable */
/*
 @auhor : © 2024 Valens Niyonsenga <valensniyonsenga2003@gmail.com>
*/

/**
 * @file
 * @brief file for Main App
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import { CustomExceptionFilter } from './exceptions/CustomExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: '*',
    }),
  );
  app.useGlobalFilters(new CustomExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('DIGITAL MINE INSPECTION MANUAL APIs')
    .setDescription(
      'This is the digital inspection manual, By MHAB Tech Center',
    )
    .setVersion('1.0')
    .addTag('DMIM')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

  // insert the roles in the database at the application starting
}
bootstrap();
