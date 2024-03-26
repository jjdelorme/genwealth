import { Database } from "./database";
import { VertexAI } from "@google-cloud/vertexai";
import * as gcpMetadata from 'gcp-metadata';

/** Use retrieval augmented search of Prospectus using AlloyDb embeddings & Gemini Pro.
 */
export class ProspectusRag {

    constructor(private readonly db: Database) {}

    async search(userPrompt: string, ticker: string) {
        const context = await this.getContext(userPrompt, ticker);
        const response = await this.generateContent(userPrompt, context.join('\n'));
        return response;
    };

    private async getContext(prompt: string, ticker: string): Promise<string[]> {
        const query = `SELECT content,
                embedding <=> embedding('textembedding-gecko@003', '${prompt}') AS distance
            FROM  langchain_vector_store
            WHERE ticker='${ticker}'
            ORDER BY distance
            LIMIT 5`;

        try
        {
            const rows = await this.db.query(query);

            if (rows.length == 0)
                throw new Error(`No data for ticker: ${ticker}`);

            return rows.map((row) => row.content);
        }
        catch (error)
        {
            throw new Error(`getContext errored with query: ${query}.\nError: ${(error as Error)?.message}`);
        }
    }

    private async generateContent(userPrompt: string, context: string) {
        const aiRole = 'AI Role: You are a professional financial analyst who is tasked with answering questions about filings.  The context provided are excerpts from an SEC filing.';
        const prompt = `${aiRole}\n\nAnswer truthfully and only if you can find the answer for the following question in the context provided. \n\n<context>${context}\n</context>\n\nQuestion: ${userPrompt}`;

        const projectId = await this.getProjectId();
        const region = process.env['REGION'];
        
        if (!region) throw new Error('Missing REGION env variable.');

        // Initialize Vertex with your Cloud project and location       
        const vertex_ai = new VertexAI({project: projectId, location: region});
        const model = process.env['RAG_MODEL'] ?? 'gemini-1.0-pro-001';
    
        // Instantiate the models
        const generativeModel = vertex_ai.preview.getGenerativeModel({
            model: model,
            generation_config: {
                "max_output_tokens": 2048,
                "temperature": 0.5,
                "top_p": 1,
            },
        });
        
        const request = {
            contents: [ {role: 'user', parts: [{text: prompt}]} ]
        };

        const streamingResp = await generativeModel.generateContentStream(request);

        const text = (await streamingResp.response).candidates[0].content.parts[0].text;

        var response = {query: prompt, data: [text]};

        console.log('response', text);

        return response;
    };

    private async getProjectId(): Promise<string> {
        let projectId = process.env['PROJECT_ID'];

        if (!projectId && await gcpMetadata.isAvailable()) {
            const projectMetadata = await gcpMetadata.project();
            projectId = projectMetadata.projectId;
        }

        if (!projectId)
            throw new Error("Unable to load project id from PROJECT_ID env variable or GCP metadata");

        console.log('using projectid', projectId);

        return projectId;
    }
}
