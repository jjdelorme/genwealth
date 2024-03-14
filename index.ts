import express from 'express';

const app: express.Application = express();

app.get('/', (req: express.Request, res: express.Response) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

const port: number = parseInt(process.env.PORT ?? '8080');

app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
