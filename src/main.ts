import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { isNil } from 'lodash';
async function bootstrap() {
  if (isNil(process.env.NODE_ENV)) {
    process.env.NODE_ENV = 'production';
  }
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //set access url prefix
  app.setGlobalPrefix('api');
  //set global Response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());
  //set global httpException filter
  app.useGlobalFilters(new HttpExceptionFilter());
  //set validateion pipe
  app.useGlobalPipes(new ValidationPipe());
  //Helmet helps secure apps by setting various HTTP headers
  app.use(helmet());
  //enable CORS,
  app.enableCors();
  //set each IP to 100 requests per windowMs in 15 minutes
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );
  //set the forum api for swagger
  const config = new DocumentBuilder()
    .setTitle('Forum api')
    .setDescription('The form API for swagger')
    .setVersion('1.0')
    .addTag('Forum')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('forum-docs', app, document);
  const port = process.env.NODE_ENV === 'production' ? 3100 : 3000;
  await app.listen(port, () => console.log(`The server:${port} is running`));
}
bootstrap();
