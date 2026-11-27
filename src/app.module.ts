import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { content, contentSchema } from 'src/schemas/content.schema';
import { collection, collectionDbSchema } from './schemas/collection.schema';
import { multilingual, multilingualSchema } from './schemas/multilingual.schema';
import { contentService } from 'src/services/content.service';
import { contentController } from 'src/controllers/content.controller';
import { ConfigModule } from '@nestjs/config';
import { CollectionController } from './controllers/collection.controller';
import { CollectionService } from './services/collection.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URL,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // Connections per process. Total on MongoDB = POOL_SIZE x workers x pods.
        // Unset keeps the driver defaults (max 100, min 0).
        maxPoolSize: parseInt(process.env.POOL_SIZE, 10) || 100,
        minPoolSize: parseInt(process.env.MIN_POOL_SIZE, 10) || 0,
      }),
    }),

    MongooseModule.forFeature([
      { name: content.name, schema: contentSchema },
      { name: collection.name, schema: collectionDbSchema },
      { name: multilingual.name, schema: multilingualSchema },
    ]),
    AuthModule
  ],
  controllers: [AppController, contentController, CollectionController],
  providers: [AppService, contentService, CollectionService],
})
export class AppModule {}
