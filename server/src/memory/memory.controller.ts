import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UsePipes,
  Req,
} from '@nestjs/common';
import { MemoryService } from './memory.service';
import {
  CreateMemoryDto,
  CreateMemorySchema,
  CreateMemoryWithCoverUrlDto,
  CreateMemoryWithCoverUrlSchema,
} from './dto/create-memory.dto';
import { UpdateMemoryDto, UpdateMemorySchema } from './dto/update-memory.dto';
import { SchemaValidationPipe } from 'src/utils/schema.validation-pipe';
import { Authenticated } from 'src/auth/guards/jwt-auth.guard';
import { UseUploadInterceptor } from 'src/upload/upload-interceptor.decorator';
import { UploadedFilePipe } from 'src/upload/uploaded-pipe.decorator';
import { Request } from 'express';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('memories')
export class MemoryController {
  constructor(private readonly memoryService: MemoryService) {}

  @Post()
  @Authenticated()
  @UsePipes(new SchemaValidationPipe(CreateMemoryWithCoverUrlSchema))
  create(@Body() createMemoryDto: CreateMemoryWithCoverUrlDto) {
    return this.memoryService.create(createMemoryDto);
  }

  @Post('upload')
  @Authenticated()
  @UsePipes(new SchemaValidationPipe(CreateMemorySchema))
  @UseUploadInterceptor()
  createAndUpload(
    @Body() createMemoryDto: CreateMemoryDto,
    @UploadedFilePipe()
    file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const serverUrl = `${request.protocol}://${request.get('host')}`;
    const cover_url = new URL(
      `/uploads/${file.filename}`,
      serverUrl,
    ).toString();

    return this.memoryService.create({
      ...createMemoryDto,
      cover_url,
    });
  }

  @Get()
  @Authenticated()
  async findAll(@User('id') loggedUserId: string) {
    const memories = await this.memoryService.findAll();

    return memories.map(({ id, cover_url, content, created_at, user_id }) => {
      const excerpt =
        content.length <= 123
          ? content
          : `${content.slice(0, 120).trimEnd()}...`;

      return {
        id,
        cover_url,
        excerpt,
        created_at,
        is_mine: user_id === loggedUserId,
      };
    });
  }

  @Get(':id')
  @Authenticated()
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @User('id') loggedUserId: string,
  ) {
    const { user_id, ...memory } = await this.memoryService.findOne(id);

    return {
      ...memory,
      is_mine: user_id === loggedUserId,
    };
  }

  @Patch(':id')
  @Authenticated()
  @UsePipes(new SchemaValidationPipe({ body: UpdateMemorySchema }))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMemoryDto: UpdateMemoryDto,
  ) {
    await this.memoryService.isMyMemory(id);
    return this.memoryService.update(id, updateMemoryDto);
  }

  @Delete(':id')
  @Authenticated()
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.memoryService.isMyMemory(id);
    await this.memoryService.remove(id);
  }
}
