import { Controller, Get, Param, NotFoundException } from '@nestjs/common'
import { CreatorsService } from './creators.service'

@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Get()
  async findAll() {                          // ★ 加 async
    return this.creatorsService.findAll()    // ★ 直接返回 Promise，Nest 会自动 await
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {   // ★ 加 async
    const creator = await this.creatorsService.findOne(Number(id))   // ★ 加 await

    if (!creator) {
      throw new NotFoundException(`达人 ${id} 不存在`)
    }

    return creator
  }
}