import { Injectable } from '@nestjs/common';

export interface Creator {
    id: number
    nickname: string
    platform: string 
    followers: number
    status: string
}

const mockCreators: Creator[] = [
  { id: 1, nickname: '小猩', platform: '抖音', followers: 12000, status: '合作中' },
  { id: 2, nickname: '阿茶', platform: '小红书', followers: 3000, status: '洽谈中' },
  { id: 3, nickname: '老白', platform: '抖音', followers: 25000, status: '已签约' },
]

@Injectable()
export class CreatorsService {
    findAll(): Creator[] {
        return mockCreators
    }

    findOne(id: number): Creator | undefined {
        return mockCreators.find((c) => c.id === id)
    }
}
