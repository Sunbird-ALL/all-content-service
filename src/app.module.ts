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
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 5 * 60 * 1000, // 5 minutes in ms
      max: 1000,           // max 1000 entries in memory
    }),
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
        connectionFactory: (connection) => {
          connection.set('poolSize', process.env.POOL_SIZE);
          return connection;
        },
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
