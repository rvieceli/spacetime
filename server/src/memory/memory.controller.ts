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

@Controller('memories')
export class MemoryController {
  constructor(private readonly memoryService: MemoryService) {}

  @Post()
  @UsePipes(new SchemaValidationPipe(CreateMemorySchema))
  create(@Body() createMemoryDto: CreateMemoryDto) {
    return this.memoryService.create({
      ...createMemoryDto,
      user_id: '2716676c-fd5e-446e-8396-a2a49a1b739c',
    });
  }

  @Get()
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
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.memoryService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new SchemaValidationPipe({ body: UpdateMemorySchema }))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMemoryDto: UpdateMemoryDto,
  ) {
    return this.memoryService.update(id, updateMemoryDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.memoryService.remove(id);
  }
}
