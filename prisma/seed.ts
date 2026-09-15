import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 造数据的素材
const nicknames = ['小猩', '阿茶', '老白', '糖糖', '大米', '小鹿', '阿泽', '布丁', '西瓜', '桃子']
const platforms = ['抖音', '小红书', 'B站', '快手']
const statuses = ['洽谈中', '合作中', '已签约', '已结算']

async function main() {
  // ① 先清空（避免重复跑时数据翻倍）
  await prisma.creator.deleteMany()
  console.log('已清空旧数据')

  // ② 生成 100 条
  const creators = Array.from({ length: 100 }, (_, i) => ({
    nickname: `${nicknames[i % 10]}_${String(i + 1).padStart(3, '0')}`,
    platform: platforms[i % platforms.length],
    followers: Math.floor(Math.random() * 50000) + 1000,
    status: statuses[i % statuses.length],
  }))

  // ③ 批量插入
  const result = await prisma.creator.createMany({ data: creators })
  console.log(`✅ 成功灌入 ${result.count} 条达人数据`)
}

main()
  .catch((e) => {
    console.error('❌ seed 失败：', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()      // 断开数据库连接
  })