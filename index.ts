import express from 'express';
import cors from 'cors';
import path from 'path';
import { Database } from './api/database';
import { Investments } from './api/investments';
import { Prospects } from './api/prospects';
import { Chatbot } from './api/chatbot';

//
// Create the express app
//
const app: express.Application = express();
const db: Database = new Database();
const investments = new Investments(db);
const prospects = new Prospects(db);
const chatbot = new Chatbot(db);

//
// Use middleware
//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'ui/dist/genwealth-advisor-ui/browser/')))

//
// Setup routes
//

/** Find investments by search terms, 
 *  i.e. /investments/search?terms=technology,high%20risk  */
app.get('/api/investments/search', async (req: express.Request, res: express.Response) => {
  const terms: string[] = req.query.terms as string[];

  const data = await investments.search(terms);
  res.json(data);
});

/** Find investments with naturual language prompts 
 *  i.e. /investments/semantic_search?prompt=hedge%20against%20%high%20inflation */
app.get('/api/investments/semantic-search', async (req: express.Request, res: express.Response) => {
  const prompt: string = req.query.prompt as string;

  const data = await investments.semanticSearch(prompt);
  res.json(data);
});

/** Find prospects with naturual language prompt and optional filters
 *  i.e. /prospects/search?prompt=young%20aggressive%20investor&risk_profile=low&min_age=25&max_age=40 */ 
 app.get('/api/prospects/search', async (req: express.Request, res: express.Response) => {
  const prompt: string = req.query.prompt as string;
  const riskProfile: string | undefined = req.query.risk_profile as string;
  const minAge: number | undefined = req.query.min_age as number | undefined;  
  const maxAge: number | undefined = req.query.max_age as number | undefined;

  const data = await prospects.semanticSearch(prompt, riskProfile, minAge, maxAge);
  res.json(data);
});

/** Chat with a financial advisor, 
 * i.e. /chat?prompt=I'm%20interested%20in%20investing%20in%20real%20estate&user_id=90 */
app.get('/api/chat', async (req: express.Request, res: express.Response) => {
  const prompt: string = req.query.prompt as string;
  const userId: number | undefined = req.query.user_id as number | undefined;

  const data = await chatbot.chat(prompt, userId);
  res.json(data);
});

//
// Start the server
//
const port: number = parseInt(process.env.PORT ?? '8080');

app.listen(port, () => {
  console.log(`GenWealth Advisor API: listening on port ${port}`);
});
