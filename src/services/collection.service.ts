import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { collection, collectionDocument } from 'src/schemas/collection.schema';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(collection.name)
    private collectionModel: Model<collectionDocument>,
  ) {}

  async create(collection: collection): Promise<collection> {
    try {
      const newcollection = new this.collectionModel(collection);
      const savedData = newcollection.save();
      return savedData;
    } catch (error) {
      return error;
    }
  }

  async readAll(): Promise<collection[]> {
    return await this.collectionModel.find().exec();
  }

  async readbyLanguage(language): Promise<collection[]> {
    return await this.collectionModel.find({ language: language }).exec();
  }


  async readById(id: any): Promise<collection> {
    return await this.collectionModel.findOne({ collectionId: id }).exec();
  }

  async update(id, collection: collection): Promise<collection> {
    return await this.collectionModel.findByIdAndUpdate(id, collection, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.collectionModel.findByIdAndRemove(id);
  }

  async getAssessment(tags, language) {
    const data = await this.collectionModel.aggregate([
      {
        $match: {
          tags: { $all: tags },
          language: language,
        },
      },
      { $sample: { size: 1 } },
      {
        $project: {
          _id: 1,
          name: 1,
          category: 1,
          collectionId:1
        }
      }
    ]);
    return {
      data: data,
      status: 200,
    };
  }


  async getCompetencyCollections(level_competency = [], language = "en", contentType): Promise<any> {
    let collectionIds = await this.collectionModel.aggregate([
      {
        $match: {
          "level_complexity.level_competency": { $in: level_competency },
          "language": language,
          "category": contentType
        }
      },
      {
        $sample: { size: 1 }
      },
      {
        $project: { collectionId: 1, _id: 0 }
      }
    ])
  }

  async getTypeOfLearner(type_of_learner: string, language = 'en', category = 'story'): Promise<any> {
    let collectionIds = await this.collectionModel.aggregate([
      {
        $match: {
          type_of_learner: type_of_learner,
          language: language,
          category: category,
        },
      },
      {
        $sample: { size: 1 },
      },
      {
        $project: { collectionId: 1, _id: 0 },
      },
    ]);

    return collectionIds[0]?.collectionId;
  }
}
