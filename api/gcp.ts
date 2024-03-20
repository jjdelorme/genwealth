import { Storage } from '@google-cloud/storage';

/** Helper class for working with GCP APIs */
export class GoogleCloud {
    private readonly projectId: string;

    constructor() {
        this.projectId = process.env['PROJECT_ID'];
        if (!this.projectId) {
            throw new Error('PROJECT_ID environment variable not set');
        }
    }

    async uploadFile(buffer: Buffer, filename: string) {
        const bucketName = process.env['PROSPECTUS_BUCKET'];
        if (!bucketName)
            throw new Error("PROSPECTUS_BUCKET environment variable not set");

        const storage = new Storage({projectId: this.projectId});
        const blob = storage.bucket(bucketName).file(filename);

        await blob.save(buffer);
    }
}
