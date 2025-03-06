import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseInterceptors,
  Version
} from '@nestjs/common';
import { collection } from 'src/schemas/collection.schema';
import { CollectionService } from 'src/services/collection.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserIdInterceptor } from 'src/interceptors/user_id.interceptor';
import { VersionedAuthInterceptor } from 'src/interceptors/versioned-auth.interceptor';

@ApiTags('collection')
@Controller('collection')
@UseInterceptors(UserIdInterceptor)
export class CollectionController {
  constructor(private readonly CollectionService: CollectionService) { }


  @ApiBody({
    description: 'Request body for storing data to collection',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Teacher-Teacher' },
        description: { type: 'string', example: 'Teacher-Teacher' },
        category: { type: 'string', example: 'Word' },
        author: { type: 'string', example: 'Ekstep' },
        language: { type: 'string', example: 'kn' },
        status: { type: 'string', example: 'live' },
        tags: { type: 'array', items: { type: 'string' }, example: [] },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Success message when data is stored to the collection table',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        data: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Teacher-Teacher' },
            description: { type: 'string', example: 'Teacher-Teacher' },
            category: { type: 'string', example: 'Word' },
            author: { type: 'string', example: 'Ekstep' },
            language: { type: 'string', example: 'kn' },
            status: { type: 'string', example: 'live' },
            tags: { type: 'array', items: { type: 'string' }, example: [] },
            createdAt: { type: 'string', example: '2024-06-07T06:14:44.161Z' },
            updatedAt: { type: 'string', example: '2024-06-07T06:14:44.161Z' },
            _id: { type: 'string', example: '6662a5848946f51e15abb9fd' },
            collectionId: { type: 'string', example: '7b762891-8337-46a6-8eb0-abfcdc5c7f35' },
            __v: { type: 'number', example: 0 },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error while data is being stored to the collection',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        msg: { type: 'string', example: 'Server error - error message' },
      },
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({
    summary:
      'Store collection data for adding the content with the reference of the colletion id',
  })
  @Version(['1', '2'])
  @UseInterceptors(VersionedAuthInterceptor)
  @Post()
  async create(@Req() request: FastifyRequest, @Res() response: FastifyReply, @Body() collection: collection) {
    try {
      const newCollection = await this.CollectionService.create(collection);
      return response.status(HttpStatus.CREATED).send({
        apiVersion: request?.version,
        status: 'success',
        data: newCollection,
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        apiVersion: request?.version,
        status: 'error',
        message: 'Server error - ' + error,
      });
    }
  }


  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved items',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '665ef5896e1219eb3d1a9b21' },
              name: { type: 'string', example: 'Teacher-Teacher' },
              description: { type: 'string', example: 'Teacher-Teacher' },
              category: { type: 'string', example: 'Word' },
              author: { type: 'string', example: 'Ekstep' },
              language: { type: 'string', example: 'kn' },
              status: { type: 'string', example: 'live' },
              tags: { type: 'array', items: { type: 'string' }, example: [] },
              createdAt: { type: 'string', example: '2024-06-04T11:07:02.300Z' },
              updatedAt: { type: 'string', example: '2024-06-04T11:07:02.300Z' },
              collectionId: { type: 'string', example: '58009c39-fd86-45a5-bc32-9638a8198521' },
              __v: { type: 'number', example: 0 },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error while retrive the data from collection',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        msg: { type: 'string', example: 'Server error - error message' },
      },
    },
  })
  @ApiOperation({
    summary: 'Get all data from the collection'
  })
  @Version(['1', '2'])
  @UseInterceptors(VersionedAuthInterceptor)
  @Get()
  async fatchAll(@Req() request: FastifyRequest, @Res() response: FastifyReply) {
    try {
      const data = await this.CollectionService.readAll();
      return response.status(HttpStatus.OK).send({
        apiVersion: request?.version,
        status: 'success',
        data
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        apiVersion: request?.version,
        status: 'error',
        message: 'Server error - ' + error,
      });
    }
  }


  @ApiParam({
    name: 'language',
    example: 'tn',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the collection data for the selected language',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '665ef5896e1219eb3d1a9b21' },
              name: { type: 'string', example: 'Teacher-Teacher' },
              description: { type: 'string', example: 'Teacher-Teacher' },
              category: { type: 'string', example: 'Word' },
              author: { type: 'string', example: 'Ekstep' },
              language: { type: 'string', example: 'kn' },
              status: { type: 'string', example: 'live' },
              tags: { type: 'array', items: { type: 'string' }, example: [] },
              createdAt: { type: 'string', example: '2024-06-04T11:07:02.300Z' },
              updatedAt: { type: 'string', example: '2024-06-04T11:07:02.300Z' },
              collectionId: { type: 'string', example: '58009c39-fd86-45a5-bc32-9638a8198521' },
              __v: { type: 'number', example: 0 },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error while retrive the data from collection',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        msg: { type: 'string', example: 'Server error - error message' },
      },
    },
  })
  @ApiOperation({
    summary: 'Get all data from the collection with the specific language'
  })
  @Version(['1', '2'])
  @UseInterceptors(VersionedAuthInterceptor)
  @Get('/bylanguage/:language')
  async fatchByLanguage(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
    @Param('language') language,
  ) {
    try {
      const data = await this.CollectionService.readbyLanguage(language);
      return response.status(HttpStatus.OK).send({
        apiVersion: request?.version,
        status: 'success',
        data
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        apiVersion: request?.version,
        status: 'error',
        message: 'Server error - ' + error,
      });
    }
  }


  @ApiParam({
    name: 'id',
    example: '65717aea18da2cbda941cee2',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved collection data using collection id',
    schema: {
      type: 'object',
      properties: {
        collection: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6662a5848946f51e15abb9fd' },
            name: { type: 'string', example: 'Teacher-Teacher' },
            description: { type: 'string', example: 'Teacher-Teacher' },
            category: { type: 'string', example: 'Word' },
            author: { type: 'string', example: 'Ekstep' },
            language: { type: 'string', example: 'kn' },
            status: { type: 'string', example: 'live' },
            tags: { type: 'array', items: { type: 'string' }, example: ['ASR'] },
            createdAt: { type: 'string', example: '2024-06-07T06:14:44.161Z' },
            updatedAt: { type: 'string', example: '2024-06-07T06:14:44.161Z' },
            collectionId: { type: 'string', example: '7b762891-8337-46a6-8eb0-abfcdc5c7f35' },
            __v: { type: 'number', example: 0 },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error while retrive the data from collection',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        msg: { type: 'string', example: 'Server error - error message' },
      },
    },
  })
  @ApiOperation({
    summary: 'Get the collection data for collection id'
  })
  @Version(['1', '2'])
  @UseInterceptors(VersionedAuthInterceptor)
  @Get('/:id')
  async findById(@Req() request: FastifyRequest, @Res() response: FastifyReply, @Param('id') id) {
    const collection = await this.CollectionService.readById(id);
    return response.status(HttpStatus.OK).send({
      apiVersion: request?.version,
      collection,
    });
  }


  @ApiParam({
    name: 'id',
    example: '65717aea18da2cbda941cee2',
  })
  @ApiBody({
    description: 'Request body for creating a new item',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'எழுத்துக்கள்' },
        description: { type: 'string', example: 'ASAR Set எழுத்துக்கள்' },
        category: { type: 'string', example: 'Char' },
        author: { type: 'string', example: 'ASER' },
        language: { type: 'string', example: 'ta' },
        status: { type: 'string', example: 'live' },
        tags: { type: 'array', items: { type: 'string' }, example: ['ASER', 'set1', 'm1'] },
        createdAt: { type: 'string', example: '2023-12-18T10:53:49.787Z' },
        updatedAt: { type: 'string', example: '2023-12-18T10:53:49.788Z' },
        collectionId: { type: 'string', example: '94312c93-5bb8-4144-8822-9a61ad1cd5a8' },
        __v: { type: 'number', example: 0 },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully update the collection data using collection id',
    schema: {
      type: 'object',
      properties: {
        collection: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6662a5848946f51e15abb9fd' },
            name: { type: 'string', example: 'Teacher-Teacher' },
            description: { type: 'string', example: 'Teacher-Teacher' },
            category: { type: 'string', example: 'Word' },
            author: { type: 'string', example: 'Ekstep' },
            language: { type: 'string', example: 'kn' },
            status: { type: 'string', example: 'live' },
            tags: { type: 'array', items: { type: 'string' }, example: ['ASR'] },
            createdAt: { type: 'string', example: '2024-06-07T06:14:44.161Z' },
            updatedAt: { type: 'string', example: '2024-06-07T06:14:44.161Z' },
            collectionId: { type: 'string', example: '7b762891-8337-46a6-8eb0-abfcdc5c7f35' },
            __v: { type: 'number', example: 0 },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error while retrive the data from collection',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        msg: { type: 'string', example: 'Server error - error message' },
      },
    },
  })
  @ApiOperation({
    summary: 'update the collection data using collection id'
  })
  @Version(['1', '2'])
  @UseInterceptors(VersionedAuthInterceptor)
  @Put('/:id')
  async update(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
    @Param('id') id,
    @Body() collection: collection,
  ) {
    const updated = await this.CollectionService.update(id, collection);
    return response.status(HttpStatus.OK).send({
      apiVersion: request?.version,
      updated,
    });
  }


  @ApiParam({
    name: 'id',
    example: '65717aea18da2cbda941cee2',
  })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully deleted.',
    schema: {
      type: 'object',
      properties: {
        deleted: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6662a5848946f51e15abb9fd' },
            name: { type: 'string', example: 'எழுத்துக்கள்' },
            description: { type: 'string', example: 'ASAR Set எழுத்துக்கள்' },
            category: { type: 'string', example: 'Char' },
            author: { type: 'string', example: 'ASER' },
            language: { type: 'string', example: 'kn' },
            status: { type: 'string', example: 'live' },
            tags: { type: 'array', items: { type: 'string' }, example: ['ASER', 'set1', 'm1'] },
            createdAt: { type: 'string', example: '2023-12-18T10:53:49.787Z' },
            updatedAt: { type: 'string', example: '2023-12-18T10:53:49.788Z' },
            collectionId: { type: 'string', example: '94312c93-5bb8-4144-8822-9a61ad1cd5a8' },
            __v: { type: 'number', example: 0 },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error while deleting the data from collection',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        msg: { type: 'string', example: 'Server error - error message' },
      },
    },
  })
  @ApiOperation({
    summary: 'delete the collection data using collection id'
  })
  @Version(['1', '2'])
  @UseInterceptors(VersionedAuthInterceptor)
  @Delete('/:id')
  async delete(@Req() request: FastifyRequest, @Res() response: FastifyReply, @Param('id') id) {
    const deleted = await this.CollectionService.delete(id);
    return response.status(HttpStatus.OK).send({
      apiVersion: request?.version,
      deleted,
    });
  }
}
