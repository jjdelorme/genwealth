import { Storage } from '@google-cloud/storage';
import { SearchServiceClient } from '@google-cloud/discoveryengine';
import gcpMetadata  from 'gcp-metadata';
import { v4 as uuidv4 } from 'uuid';

/** 
 */
export class Prospectus {
    private readonly storageClient: Storage;
    private readonly searchClient: SearchServiceClient;

    constructor() {
        this.storageClient = new Storage();
        this.searchClient = new SearchServiceClient();
    }

    /** Upload a prospectus and generate the metadata for indexing in Vertex Search & Conversation.
     */
    async upload(buffer: Buffer, filename: string, ticker: string) {
        const bucketName = process.env['PROSPECTUS_BUCKET'];
        if (!bucketName)
            throw new Error("PROSPECTUS_BUCKET environment variable not set");
       
        ticker = ticker.toUpperCase();

        const prospectusBlob = this.storageClient.bucket(bucketName).file(filename);
        await prospectusBlob.save(buffer);

        const metadata = this.getMetadata(prospectusBlob.cloudStorageURI.href, ticker);
        const metadataBucketName = bucketName + "-metadata";
        const metadataBlob = this.storageClient.bucket(metadataBucketName).file(`${ticker}.jsonl`);
        await metadataBlob.save(JSON.stringify(metadata));

        console.log(`Uploaded ${filename} to ${bucketName}`);

        // TODO: Kick off the indexing

    }

    async search(query: string, ticker: string) {
        const projectId = process.env['PROJECT_ID'] ?? await gcpMetadata.project('project-id');
        if (!projectId) {
            throw new Error('PROJECT_ID environment variable not set');
        }

        const dataStoreId = process.env['DATASTORE_ID'];
        if (!dataStoreId) {
            throw new Error('DATASTORE_ID environment variable not set');
        }

        ticker = ticker.toUpperCase();

        const searchServingConfig = this.searchClient.projectLocationCollectionDataStoreServingConfigPath(
            projectId,
            "global",
            "default_collection",
            dataStoreId,
            "default_search"
        );

        const request = {
            pageSize: 5,
            query: query,
            contentSearchSpec: {
                summarySpec: {
                    summaryResultCount: 5,
                    ignoreAdversarialQuery: true,
                    includeCitations: true
                },
                snippetSpec: {
                    returnSnippet: true
                },
                extractiveContentSpec: {
                    maxExtractiveAnswerCount: 1
                }
            },
            filter: `ticker: ANY(\"${ticker}\")`,
            servingConfig: searchServingConfig,
        };
            
        // Perform search request
        const response = await this.searchClient.search(request, {
        autoPaginate: false,
        });
        const results = response;
    
        for (const result of results) {
        console.log(result);
        }        

    }

    private getMetadata(gcsPath: string, ticker: string) {
        return {
            id: uuidv4(),
            structData: { ticker: ticker },
            content: { mimeType: "application/pdf", uri: gcsPath }
        };
    }
}
