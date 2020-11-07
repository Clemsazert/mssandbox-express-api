import { app } from './src/app';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log('Namespace:', process.env.NODE_ENV);
});
