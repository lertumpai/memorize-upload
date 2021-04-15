# ENV
```
TIME_OUT=300000
SERVER_URL=
BUCKET_NAME=
```

# CI variable
```
DOCKER_HUB_REGISTRY_PASSWORD
DOCKER_HUB_REGISTRY_USER
DEPLOYMENT_NAME
IMAGE_NAME
GCP_SA_KEY
GCP_PROJECT_ID
GCP_CLUSTER_ZONE
GCP_CLUSTER_NAME
```

# Docker
```
# build image
docker build --no-cache -t lertumpai/memorize-upload .

# run application
docker run -d --name memorize_upload -p 4000:4000 lertumpai/memorize-upload

# Push docker
docker commit memorize lertumpai/memorize-upload
docker push lertumpai/memorize-upload
docker tag memorize lertumpai/memorize-upload

# copy file from docker to outside
docker cp containerId:filepath .
-> For this project
docker cp containerId:/usr/src/memorize-upload/public/ .
```
