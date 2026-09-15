import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common'
import { PrismaClient } from '.prisma/client'          // ← 这里也要改成 .prisma/client

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    })
  }

  async onModuleInit() {
    await this.$connect()

    // @ts-expect-error Prisma 的 $on 事件类型定义不完整（已知问题），运行时正常
    this.$on('query', (e: { query: string; params: string; duration: number }) => {
      this.logger.debug(`SQL: ${e.query}  -- 参数: ${e.params}  (${e.duration}ms)`)
    })

    this.logger.log('✅ 已连接数据库')
  }

  async onModuleDestroy() {
    await this.$disconnect()
    this.logger.log('已断开数据库连接')
  }
}