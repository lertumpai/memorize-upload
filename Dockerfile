FROM node:lts

# set a directory for the app
WORKDIR /usr/src/memorize-upload

# copy all the files to the container
COPY package.json /usr/src/memorize-upload

RUN npm install

COPY . /usr/src/memorize-upload

# tell the port number the container should expose
EXPOSE 4000

# run the command
CMD ["npm", "run", "start"]
