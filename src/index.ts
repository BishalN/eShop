import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express from 'express';
import { HelloResolver } from './resolvers/helloResolver';
import { UserResolver } from './resolvers/user';

const main = async () => {
  await createConnection();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
};

main().catch((err) => {
  console.log(err);
});
