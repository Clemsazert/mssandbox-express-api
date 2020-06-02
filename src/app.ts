import * as express from 'express';

const app = express();

app.get('/', (_, res) => res.send('Hello World!'));

export { app };
