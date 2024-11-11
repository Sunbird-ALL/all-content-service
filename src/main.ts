import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppClusterService } from './app-cluster.service';
import compression from '@fastify/compress';
import fastifyMultipart from 'fastify-multipart';
import { FastifyReply, FastifyRequest } from 'fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(compression, {
    global: true,
    zlibOptions: {
      level: 6,
    },
    threshold: 512,
    encodings: ['gzip', 'deflate'],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1');
  app.enableCors({
    origin: ['*'],
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: false,
  });

  const config = new DocumentBuilder()
    .setTitle('ALL Content Service')
    .setDescription(
      'All content service includes Storys , word, sentences texts to practice',
    )
    .setVersion('v1')
    .addServer(process.env.SERVER_URL, 'ALL Content Service Server APIs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Register fastify-multipart plugin
  app.register(fastifyMultipart);

  // Access the Fastify instance to define the health check endpoint
  const fastifyInstance = app.getHttpAdapter().getInstance();

  fastifyInstance.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({
      status: true,
      message: 'content ServiceApp is working',
    });
  });

  await app.listen(3008, '0.0.0.0');
}

AppClusterService.clusterize(bootstrap);
