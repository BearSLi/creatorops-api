import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'          // ← 不再 import ObserveInstrument
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {         // ← 去掉 instrument
    logger: ['log', 'error', 'warn', 'debug'],
  })

  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors()

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()