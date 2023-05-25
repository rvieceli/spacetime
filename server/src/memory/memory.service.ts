import { Injectable } from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMemoryDto: CreateMemoryDto & { user_id: string }) {
    return this.prisma.memory.create({ data: createMemoryDto });
  }

  findAll() {
    return this.prisma.memory.findMany({
      orderBy: { created_at: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.memory.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, updateMemoryDto: UpdateMemoryDto) {
    return this.prisma.memory.update({ where: { id }, data: updateMemoryDto });
  }

  remove(id: string) {
    return this.prisma.memory.delete({ where: { id } });
  }
}
