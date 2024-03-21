import { Storage } from '@google-cloud/storage';
import { SearchServiceClient } from '@google-cloud/discoveryengine';

/** 
 */
export class Prospectus {
    private readonly projectId: string;
    private readonly dataStoreId: string;

    constructor() {
        this.projectId = process.env['PROJECT_ID'];
        if (!this.projectId) {
            throw new Error('PROJECT_ID environment variable not set');
        }
        this.dataStoreId = process.env['STORE_ID'];
    }

    async upload(buffer: Buffer, filename: string, ticker?: string) {
        const bucketName = process.env['PROSPECTUS_BUCKET'];
        if (!bucketName)
            throw new Error("PROSPECTUS_BUCKET environment variable not set");

        const storage = new Storage({projectId: this.projectId});
        const blob = storage.bucket(bucketName).file(filename);

        await blob.save(buffer);
    }

    async search(query: string, ticker?: string) {
        const client = new SearchServiceClient();

        const name = client.projectLocationCollectionDataStoreServingConfigPath(
            this.projectId,
            "global",
            "default_collection",
            this.dataStoreId,
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
            servingConfig: name,
          };
               
          // Perform search request
          const response = await client.search(request, {
            autoPaginate: false,
          });
          const results = response;
        
          for (const result of results) {
            console.log(result);
          }        

    }
}
