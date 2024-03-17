# GenWealth Demo
This demo shows how SQL Developers can combine the data they already have and the skills they already know with the power of AlloyDB AI to build trustworthy Gen AI experiences. The demo highlights AlloyDB AI’s integration with Vertex AI LLMs for both embeddings and text completion models. Customers will learn how to query their relational databases with natural language using embeddings and vector similarity search, and they will build the backend for a Gen AI chatbot that is grounded in their application data 

## Requirements
- Node 20+
- Angular 17+
- **[TODO]** Deploy AlloyDB with schema & sample data

## Architecture

### Backend
The backend is hosted in GCP on AlloyDB which makes calls direct to VertexAI through the database engine. 

### Middle Tier
The middle tier is written in TypeScript and hosted with `express`: 

```javascript
import express from 'express';
...
const app: express.Application = express();
```

There are a simple set of REST apis hosted at `/api/*` that connect to AlloyDB via the `Database.ts` class.  

```javascript
// Routes for the backend
app.get('/api/investments/search', async (req: express.Request, res: express.Response) => {
  ...
}
```

### Frontend
 
The frontend application is Angular Material using TypeScript, which is built and statically served from the root `/` by express as well:

```javascript
// Serve the frontend
app.use(express.static(staticPath));

```

## Run the application
```bash
-- clone this repository

npm install

npm start
```

## Deploying the application

TBD: https://cloud.google.com/alloydb/docs/quickstart/integrate-cloud-run

