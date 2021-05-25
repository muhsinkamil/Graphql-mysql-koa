require('dotenv').config()
import Koa from 'koa'
import Router from 'koa-router'
import cors from '@koa/cors'
import { ApolloServer } from 'apollo-server-koa'
import { createConnection } from 'typeorm'
import bodyParser from 'koa-bodyparser'

const main = async () => {

  await createConnection({
    type: 'mysql',
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    port: 4000,
    logging: true,
    synchronize: false,
  })

  const app = new Koa()
  const router = new Router()

  // middlewares
  app.use(cors())
  app.use(bodyParser())

  //   const server = new ApolloServer({ schema, playground: {
  //     endpoint: '/api/graphql'
  //   }
  // })
  // server.applyMiddleware({ app, path: '/api/graphql' });

  // Routes
  // app.use(async ctx => (ctx.body = "Hello world"))

  router.get('/', (ctx) => (ctx.body = { message: 'Hello world' }))
  app.use(router.routes()).use(router.allowedMethods())

  app.listen(4000, () => console.log('Listening on 4000'))
}

main().catch((err) => {
  console.log(err)
})
