import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import type { Creator } from '.prisma/client'

export interface FindAllParams {
  page: number
  size: number
  keyword?: string
  platform?: string
  sort?: string
}

@Injectable()
export class CreatorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data : { nickname: string; platform: string; followers?: number; status?: string; email?: string}){
    return this.prisma.creator.create({
      data,
    })
  }

  async update(id: number, data :{ nickname?: string; platform?: string;
     followers?: number; status?: string; email?: string}){
    try{
      return await this.prisma.creator.update({ where: {id}, data})
    } catch (e: any) {
      if(e.code === 'P2025') {
        throw new NotFoundException(`达人${id} 不存在`)
      }
      throw e
    }
  }

  async remove(id: number){
    try{
      return await this.prisma.creator.delete({
      where: { id },
    })
    } catch (e: any) {
      if(e.code === 'P2025' ){
        throw new NotFoundException(`达人${id}不存在`)
      }
      throw e
    }
  }

  async findAll(params : FindAllParams) {
    const {page, size, keyword, platform, sort} = params

    const where : any = {}
    if(keyword){
      where.OR = [
        { nickname : { contains : keyword} },
        { platform : { contains : keyword} },
      ]
    }

    if(platform) {
      where.platform = platform
    }

    let orderBy : any = [{ id: 'asc' }]
    if(sort === 'followers_desc') {
      orderBy = [{ followers: 'desc'}, { id : 'asc'}]
    }else if (sort ==  'followers_asc'){
      orderBy = [{ followers: 'asc'}, { id: 'asc' }]
    }

    const total = await this.prisma.creator.count({ where })

    const items = await this.prisma.creator.findMany({
        where,
        orderBy,
        skip : (page - 1) * size,
        take : size
    })

    return { items, total, page, size}
  }

  /*临时代码
  async testQuery() {
    const where = {
      followers: { gt: 10000 },
    }

    const total = await this.prisma.creator.count({ where })
    const items = await this.prisma.creator.findMany({
      where,
      orderBy: [
        { followers: 'desc' },      // ★ 拆成两个对象
        { id: 'asc' },              // ★
      ],
      skip: 0,
      take: 3,
    })

    return { total, items }
  }*/

  async findOne(id: number): Promise<Creator | null> {
    return this.prisma.creator.findUnique({
      where: { id },
    })
  }
}