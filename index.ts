import { PrismaClient } from '@prisma/client';
import { createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { Query, CV } from './resolvers/Query';
import { Mutation } from './resolvers/Mutation';
import { Subscription } from './resolvers/Subscription';
import * as fs from 'fs';
import * as path from 'path';

interface Context {
  prisma: PrismaClient;
}

const prisma = new PrismaClient();

export const schema = createSchema ({
  typeDefs: fs.readFileSync(path.join(__dirname, "./schema/schema.graphql"), "utf-8"),
  resolvers: {
    Query,
    CV,
    Mutation,
    Subscription,
  },
});

function main() {
  const yoga = createYoga({
    schema,
    context: (): Context => ({
      prisma
    })
  });

  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();



/*import { PrismaClient } from '@prisma/client'

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
      const CV = await prisma.cv.findUnique({
        where: {
          id: 2,
        },
      })
      console.log(CV)
      const cv = await prisma.cv.update({
        where: { id: 2 },
        data: { name:'amen' },
      })
      console.log(cv)
      const deletedCv = await prisma.cv.delete({
        where: {
          id: 2,
        },
      })

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })*/