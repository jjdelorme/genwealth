
import { Database } from './database';

export class Chatbot {
    constructor(private db: Database) { }

    async chat(prompt: string, userId?: number) {
        let query: string;

        userId ? 
            query = this.getPersonalizedQuery(prompt, userId) :
            query = this.getQuery(prompt);
        
        const rows = await this.db.query(query);
        // Chat should return only a single row
        return { llmResponse: rows[0]['llm_response'], llmPrompt: rows[0]['llm_prompt'], query: query };
    }

    private getQuery(prompt: string) {
        const query = `
            SELECT llm_prompt, llm_response 
            FROM llm(
                -- User input
                prompt => '${prompt}',
                
                -- Prompt enrichment
                llm_role => 'You are an experienced financial advisor named Penny',
                mission => 'Your mission is to help your clients maximize their return on investment and outperform the general market',
                output_instructions => 'Begin your response with a professional greeting. Greet me by name if you know it. End your response with a signature that includes your name and "GenWealth" company affiliation.'
            ); `;

        return query;
    }

    private getPersonalizedQuery(prompt: string, userId: number) {
        const query = `
            -- Tell the LLM what we know about the user
            WITH profile AS (
                SELECT *
                FROM user_profiles 
                WHERE id = ${userId}
            ) 
            SELECT llm_prompt, llm_response, bio
            FROM profile, llm(
                -- User input
                prompt => '${prompt}',
                
                -- Prompt enrichment
                llm_role => 'You are an experienced financial advisor named Penny.',
                mission => 'Your mission is to help your clients maximize their return on investment and outperform the general market.',
                output_instructions => 'Begin your response with a professional greeting. Greet me by name if you know it. End your response with a signature that includes your name and "GenWealth" company affiliation.',
                
                -- Add User Role and Bio context
                user_role => CONCAT('My name is ', first_name, ' ', last_name, '. I am ', age, ' years old, and I have a ', risk_profile, ' risk tolerance.'),
                additional_context => CONCAT(E'<BIO>', bio, E'<\BIO>')
            )                
        `;

        return query;
    }
}
