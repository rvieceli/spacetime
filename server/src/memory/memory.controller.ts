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
} from '@nestjs/common';
import { MemoryService } from './memory.service';
import { CreateMemoryDto, CreateMemorySchema } from './dto/create-memory.dto';
import { UpdateMemoryDto, UpdateMemorySchema } from './dto/update-memory.dto';
import { SchemaValidationPipe } from 'src/utils/schema.validation-pipe';
import { Authenticated } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('memories')
export class MemoryController {
  constructor(private readonly memoryService: MemoryService) {}

  @Post()
  @Authenticated()
  @UsePipes(new SchemaValidationPipe(CreateMemorySchema))
  create(@Body() createMemoryDto: CreateMemoryDto) {
    return this.memoryService.create(createMemoryDto);
  }

  @Get()
  @Authenticated()
  async findAll() {
    const memories = await this.memoryService.findAll();

    return memories.map(({ id, cover_url, content }) => {
      const excerpt =
        content.length <= 103
          ? content
          : `${content.slice(0, 100).trimEnd()}...`;

      return {
        id,
        cover_url,
        excerpt,
      };
    });
  }

  @Get(':id')
  @Authenticated()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.memoryService.findOne(id);
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
