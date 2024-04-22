FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./
COPY .env.staging .env
COPY . .

RUN apk update && \
    apk add -U tzdata

#remove original .env file
RUN rm -rf .env.staging
RUN rm -rf .env.example

RUN npm install
RUN npm run build

EXPOSE 1337
# RUN npm run start
CMD [ "node", "server.js" ]