import { Database } from "./database";
import { VertexAI } from "@google-cloud/vertexai";

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
    
        // Initialize Vertex with your Cloud project and location
        const vertex_ai = new VertexAI({project: 'genwealth-demo-417213', location: 'us-central1'});
        const model = 'gemini-1.0-pro-001';
    
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

        var response = {prompt: prompt, results: JSON.stringify(await streamingResp.response)};

        return response;
    };
}
