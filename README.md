# Docker
```
# build image
docker build --no-cache -t lertumpai/memorize-upload .

# run application
docker run --name memorize_upload -p 5000:5000 lertumpai/memorize-upload

# Push docker
docker commit memorize lertumpai/memorize-upload
docker push lertumpai/memorize-upload
docker tag memorize lertumpai/memorize-upload

# copy file from docker to outside
docker cp containerId:filepath .
```
