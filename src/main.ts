import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppClusterService } from './app-cluster.service';
import compression from '@fastify/compress';
import { UserIdInterceptor } from './interceptors/user_id.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(compression,{
    global: true,
    zlibOptions: {
      level: 6,
    },
    threshold: 512,
    encodings: ['gzip', 'deflate']
  });

   // Enable URI-based versioning
   app.enableVersioning({
    type: VersioningType.URI,
  });
  
  app.useGlobalPipes(new ValidationPipe());
  // app.setGlobalPrefix('v1');

  app.enableCors({
    origin: ['*'],
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: false,
  });

  // const config = new DocumentBuilder()
  //   .setTitle('ALL Content Service')
  //   .setDescription(
  //     'All content service includes Storys , word, sentences texts to practice',
  //   )
  //   .setVersion('v1')
  //   .addServer(process.env.SERVER_URL, 'ALL Content Service Server APIs')
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  // Swagger Documentation for v1
  const configV1 = new DocumentBuilder()
    .setTitle('ALL Content Service - v1')
    .setDescription(
      'All content service includes stories, words, and sentences for practice (Version 1).',
    )
    .setVersion('1.0')
    .addServer('/v1', 'Version 1 API')
    .build();

  const documentV1 = SwaggerModule.createDocument(app, configV1);
  SwaggerModule.setup('api/v1', app, documentV1);

  // Swagger Documentation for v2
  const configV2 = new DocumentBuilder()
    .setTitle('ALL Content Service - v2')
    .setDescription(
      'All content service includes improved versions of stories, words, and sentences (Version 2).',
    )
    .setVersion('2.0')
    .addServer('/v2', 'Version 2 API')
    .build();

  const documentV2 = SwaggerModule.createDocument(app, configV2);
  SwaggerModule.setup('api/v2', app, documentV2);

  await app.listen(3008, '0.0.0.0');
}
AppClusterService.clusterize(bootstrap);