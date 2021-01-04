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
