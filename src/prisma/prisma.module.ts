import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Global()                              // ★ 全局模块：别处不用再 import 它
@Module({
  providers: [PrismaService],
  exports: [PrismaService],            // ★ 导出，别的模块才能注入
})
export class PrismaModule {}