import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Mixed } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsObject,
} from 'class-validator';

@Schema({ collection: 'content' })
export class content {
  @Prop({ default: uuidv4, index: true })
  contentId: string;

  @Prop({ type: String, required: false, index: true })
  @IsOptional()
  @IsString()
  collectionId: string;

  @Prop({ type: String, required: true })
  @IsOptional()
  @IsString()
  name: string;

  @Prop({ type: String, required: true, index: true })
  @IsString()
  contentType: string;

  @Prop({ type: String, required: false })
  @IsOptional()
  @IsString()
  imagePath: string;

  @Prop({ required: true })
  contentSourceData: [Mixed];

  @Prop({ required: false, type: Array })
  @IsOptional()
  @IsArray()
  mechanics_data: [
    {
      mechanics_id: string;
      language: string;
      content_body?: string;
      jumbled_text?: string;
      text?: string;
      audio_url?: string;
      image_url?: string;
      options?: [
        {
          text: string;
          audio_url: string;
          image_url: string;
          isAns: boolean;
          side: string;
        },
      ];
      hints?: {
        text: string;
        audio_url: string;
        image_url: string;
      };
      time_limit?: number;
      correctness?: {
        '50%': [string];
      };
      syllable?: [
        {
          text: string,
          audio_url: string
        },
      ];
      words?: [string];
      imageAudioMap?: [{
        text: string,
        multilingual_id:string,
        audio_url: string,
        image_url: string,
      }];

    },
  ];
  @Prop({ type: Object, required: false })
  @IsOptional()
  @IsObject()
  multilingual?: {
    [langCode: string]: {
      text: string;
      audio_url: string;
    };
  };

  @Prop({ type: Object, required: false })
  @IsOptional()
  @IsObject()
  level_complexity: {
    level: string;
    level_competency: string;
    CEFR_level?: string;
  };

  @Prop({ type: String, required: false })
  @IsOptional()
  @IsString()
  flaggedBy: string;

  @Prop({ type: String, required: false })
  @IsOptional()
  @IsString()
  lastFlaggedOn: string;

  @Prop({ type: String, required: false })
  @IsOptional()
  @IsString()
  flagReasons: string;

  @Prop({ type: String, required: false })
  @IsOptional()
  @IsString()
  reviewer: string;

  @Prop({ type: String, required: false })
  @IsOptional()
  @IsString()
  reviewStatus: string;

  @Prop({ type: String, required: true })
  @IsString()
  status: string;

  @Prop({ type: String, required: false })
  @IsOptional()
  @IsString()
  publisher: string;

  @Prop({ type: String, required: true, index: true })
  @IsString()
  language: string;

  @Prop({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  contentIndex: number;

  @Prop({ required: true })
  tags: [string];

  @Prop({ default: now(), index: true })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export type contentDocument = content & Document;

export const contentSchema = SchemaFactory.createForClass(content);

contentSchema.index({
  contentType: 1,
  'contentSourceData.language': 1,
});

// Fast lookup for getContentWord/Sentence/Paragraph using top-level language field
contentSchema.index({ contentType: 1, language: 1 });

// Tag-based filtering used across search() and getContent
contentSchema.index({ tags: 1, contentType: 1, language: 1 });

// Competency and CEFR filtering used in getMechanicsContentData and search()
contentSchema.index({ 'level_complexity.level_competency': 1 });
contentSchema.index({ 'level_complexity.CEFR_level': 1 });
contentSchema.index({
  contentType: 1,
  language: 1,
  'level_complexity.level_competency': 1,
});

// Mechanics filtering — sparse because not all documents have mechanics_data
contentSchema.index({ 'mechanics_data.mechanics_id': 1 }, { sparse: true });
