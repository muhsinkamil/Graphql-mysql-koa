require("dotenv").config();
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { ApolloServer } from "apollo-server-koa";
import { createConnection } from "typeorm";
import { Users } from "./Entities/Users";
import { schema } from "./Schema";

const main = async () => {
  await createConnection({
    type: "mysql",
    database: "graphqlCrud",
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    logging: true,
    synchronize: false,
    entities: [Users],
  });

  const app = new Koa();
  const router = new Router();

  app.use(cors());
  app.use(bodyParser());

  const server = new ApolloServer({
    schema,
  });

  server.applyMiddleware({ app, path: "/api/graphql" });

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(4000, () => console.log("server started at 4000"));
};

main().catch((e) => console.log(e));
