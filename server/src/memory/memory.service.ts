import {
  Inject,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Memory } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class MemoryService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  private get user_id() {
    const user = this.request.user;

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    return user.id;
  }

  create(createMemoryDto: CreateMemoryDto) {
    return this.prisma.memory.create({
      data: { ...createMemoryDto, user_id: this.user_id },
    });
  }

  findAll() {
    return this.prisma.memory.findMany({
      where: { user_id: this.user_id },
      orderBy: { created_at: 'asc' },
    });
  }

  async findOne(id: string) {
    const memory = await this.prisma.memory.findUniqueOrThrow({
      where: { id },
    });

    if (!memory.is_public && memory.user_id !== this.user_id) {
      throw new NotFoundException('No Memory found');
    }

    return memory;
  }

  async update(id: string, updateMemoryDto: UpdateMemoryDto) {
    return this.prisma.memory.update({ where: { id }, data: updateMemoryDto });
  }

  async remove(id: string) {
    await this.prisma.memory.delete({
      where: { id },
    });
  }

  async isMyMemory(memory: Memory): Promise<void>;
  async isMyMemory(id: string): Promise<void>;
  async isMyMemory(memoryOrId: Memory | string): Promise<void> {
    const memory =
      typeof memoryOrId === 'string'
        ? await this.prisma.memory.findUniqueOrThrow({
            where: { id: memoryOrId },
            select: { user_id: true, is_public: true },
          })
        : memoryOrId;

    if (memory?.user_id !== this.user_id) {
      if (!memory.is_public) {
        throw new NotFoundException('No Memory found');
      }

      throw new UnauthorizedException('Not your memory');
    }
  }
}
