import { Module } from '@nestjs/common'
// import { createObserveModule } from '@nestjs/observe'    // ← 注释掉
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CreatorsModule } from './creators/creators.module'
import { PrismaModule } from './prisma/prisma.module'

// export const { ObserveModule, ObserveInstrument } = createObserveModule()    // ← 注释掉

@Module({
  imports: [
    // ObserveModule.forRoot({ ... }),   // ← 注释掉
    PrismaModule,
    CreatorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}