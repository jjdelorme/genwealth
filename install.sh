###
### Deploys the genwealth app to Cloud Run
###
### NOTE: you need the latest version of gcloud (i.e. 468 or later) to deploy this
###

# Load env variables
source ./env.sh

PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
  echo "PROJECT_ID is not set."
  exit 1
fi

REGION=$(gcloud config get-value run/region)
if [ -z "$REGION" ]; then
  echo "REGION is not set. Please set the gcloud run/region."
  exit 1
fi

#
# Enable required APIs
#
gcloud services enable run.googleapis.com --project ${PROJECT_ID}
gcloud services enable artifactregistry.googleapis.com --project ${PROJECT_ID}
gcloud services enable cloudbuild.googleapis.com --project ${PROJECT_ID}

#
# Create the Artifact Registry repository:
#
gcloud artifacts repositories create genwealth \
--repository-format=docker \
--location=$REGION \
--project=$PROJECT_ID 

#
# Build & push the container
#
source ./deploy.sh
