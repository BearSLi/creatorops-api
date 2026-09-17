import { Controller, Get, Query, Param, Body, Post, 
  Patch, Delete, NotFoundException } from '@nestjs/common'
import { CreatorsService } from './creators.service'
import { create } from 'domain'

@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('size') size?: string,
    @Query('keyword') keyword ?: string,
    @Query('platform') platform ?: string,
    @Query('sort') sort?: string,
    ) {
    const pageNum = Math.max(1, Number(page) || 1)
    const sizeNum = Math.min(100, Math.max(1, Number(size) || 10))
    
    return this.creatorsService.findAll({
      page: pageNum,
      size: sizeNum,
      keyword,
      platform,
      sort,      
    }
    )
  }

  @Post()
  async create(@Body() body: { nickname: string; platform: string; followers?: number; status?: string; email?: string }) {
    return this.creatorsService.create(body)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { nickname?: string; platform?: string; followers?: number;
       status?: string; email?: string},
  ){
    return this.creatorsService.update(Number(id), body)
  }

  @Delete(':id')
  async remove(@Param('id') id: string){
    return this.creatorsService.remove(Number(id))
  }

  // ★ 临时测试路由
  /*@Get('test')
  async test() {
    return this.creatorsService.testQuery()
  }*/

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const creator = await this.creatorsService.findOne(Number(id))

    if (!creator) {
      throw new NotFoundException(`达人 ${id} 不存在`)
    }

    return creator
  }
}