import express from 'express';
import { Database } from './database';
import { Investments } from './investments';

const app: express.Application = express();
const db: Database = new Database();
const investments = new Investments(db);

// Routes

app.get('/', (req: express.Request, res: express.Response) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

/** Find investments by search terms, 
 *  i.e. /investments/search?terms=technology,high%20risk  */
app.get('/investments/search', async (req: express.Request, res: express.Response) => {
  const terms: string[] = req.query.terms as string[];

  const data = await investments.search(terms);
  res.json(data);
});

/** Find investments with naturual language prompts 
 *  i.e. /investments/semanticSearch?prompt=hedge against high inflation */
app.get('/investments/semanticSearch', async (req: express.Request, res: express.Response) => {
  const prompt: string = req.query.prompt as string;

  const data = await investments.semanticSearch(prompt);
  res.json(data);
});

//app.get('/prospects')

// Start the server.')

const port: number = parseInt(process.env.PORT ?? '8080');

app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
