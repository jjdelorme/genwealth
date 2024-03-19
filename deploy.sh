###
### Deploys the genwealth app to Cloud Run
###
### NOTE: you need the latest version of gcloud (i.e. 468 or later) to deploy this
###

# 
# TODO:  Fill in the following variables:
#
PGHOST=x.x.x.x
PGPORT=5432
PGDATABASE=ragdemos
PGUSER=postgres
PGPASSWORD=xxxx
VPC_NETWORK=demo-vpc
VPC_SUBNET=$VPC_NETWORK # It’s the same name right now

#
# Step 1: Clone the repo
#
git clone http://github.com/jjdelorme/genwealth.git
cd genwealth

PROJECT_ID=$(gcloud config get-value project)
REGION=$(gcloud config get-value run/region)

if [ -z "$PROJECT_ID" ]; then
  echo "PROJECT_ID is not set."
  exit 1
fi

if [ -z "$REGION" ]; then
  echo "REGION is not set. Please set the gcloud run/region."
  exit 1
fi

TAG_NAME=$(git describe --abbrev=0 --tags)
IMAGE=$REGION-docker.pkg.dev/$PROJECT_ID/genwealth/genwealth:v$TAG_NAME

#
# Step 2: Build & push the container
#
docker build -t $IMAGE .
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
    --set-env-vars=PGHOST=$PGHOST,PGPORT=$PGPORT,PGDATABASE=$PGDATABASE,PGUSER=$PGUSER,PGPASSWORD=$PGPASSWORD

