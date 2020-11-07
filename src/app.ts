import * as express from 'express';
import * as cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import { arrayTest } from './utils/speedtests';

import { dotaRouter } from './router/dota';

import { typeDefs } from './graphql/typedefs';
import { resolvers } from './graphql/resolvers';

const app = express();

app.use(cors());

app.get('/healthcheck', (_, res) => {
  res.status(200).send({
    status: 'up',
    version: '0.0.1',
    environment: process.env.NODE_ENV
  });
});

app.get('/speedtest', (_, res) => {
  const array = arrayTest();
  res.status(200).send(array);
});

app.use('/dota', dotaRouter);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

export { app };
