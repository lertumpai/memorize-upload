FROM node:lts

# set a directory for the app
WORKDIR /memorize-upload

# copy all the files to the container
COPY package.json /memorize-upload

RUN npm install

RUN mkdir public
RUN mkdir ./public/profiles
RUN mkdir ./public/articles
COPY . /memorize-upload

# tell the port number the container should expose
EXPOSE 4000

# run the command
CMD ["npm", "run", "start"]
