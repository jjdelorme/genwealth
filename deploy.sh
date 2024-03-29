# Load env variables
source ./env.sh

REGION=$(gcloud config get-value run/region)
if [ -z "$REGION" ]; then
  echo "REGION is not set. Please set the gcloud run/region."
  exit 1
fi

# Get the latest tags.
git fetch

#
# Build & push the container
#
TAG_NAME=$(git describe --abbrev=0 --tags)
IMAGE=$REGION-docker.pkg.dev/$PROJECT_ID/genwealth/genwealth:$TAG_NAME

docker build --rm -t $IMAGE .
docker push $IMAGE

#
# Step 3: Deploy to Cloud Run
#
gcloud beta run deploy genwealth \
    --image=$IMAGE \
    --execution-environment=gen2 \
    --cpu-boost \
    --network=$VPC_NETWORK \
    --subnet=$VPC_SUBNET \
    --vpc-egress=private-ranges-only \
    --region=$REGION \
    --project=$PROJECT_ID \
    --allow-unauthenticated \
    --set-env-vars=PGHOST=$PGHOST,PGPORT=$PGPORT,PGDATABASE=$PGDATABASE,PGUSER=$PGUSER,PGPASSWORD=$PGPASSWORD,DATASTORE_ID=$DATASTORE_ID,PROSPECTUS_BUCKET=$PROSPECTUS_BUCKET,PROJECT_ID=$PROJECT_ID,REGION=$REGION

