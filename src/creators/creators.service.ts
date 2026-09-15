import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import type { Creator } from '.prisma/client'     // ★ 类型也从 Prisma 来

@Injectable()
export class CreatorsService {
  constructor(private readonly prisma: PrismaService) {}   // ★ 注入

  // ★ 全部改成 async（因为数据库操作是异步的）
  async findAll(): Promise<Creator[]> {
    return this.prisma.creator.findMany({
      orderBy: { id: 'asc' },        // 按 id 升序（让结果稳定）
    })
  }

  async findOne(id: number): Promise<Creator | null> {
    return this.prisma.creator.findUnique({
      where: { id },
    })
  }
}