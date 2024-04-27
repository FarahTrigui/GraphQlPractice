import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.cv.create({
        data: {
          name: 'trigui',
          firstname :'farah',
          age : 22,
          cin :11164600,
          job: 'batata',
          path:'somepath',
        },
      }) 
    
      const allCvs = await prisma.cv.findMany()
      console.dir(allCvs, { depth: null })
      const cv = await prisma.cv.update({
        where: { id: 2 },
        data: { name:'amen' },
      })
      console.log(cv)

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })