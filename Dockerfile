FROM node:12.16.1-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY ./src ./src
COPY index.ts tsconfig.json nodemon.json ./
RUN npm run ts-compile