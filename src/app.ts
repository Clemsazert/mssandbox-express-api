import * as express from 'express';
import * as cors from 'cors';

const app = express();

app.use(cors());

app.get('/healthcheck', (_, res) => {
  res.status(200).send({
    status: 'up',
    version: '0.0.1',
    environment: process.env.NODE_ENV
  });
});

export { app };
