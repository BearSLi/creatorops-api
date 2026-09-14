import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { CreatorsService } from './creators.service';

@Controller('creators')

export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Get()                                   
  findAll() {
    return this.creatorsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const creator = this.creatorsService.findOne(Number(id))

    if(!creator) {
        throw new NotFoundException(`达人${id}不存在`)
    }

    return creator
  }
}
