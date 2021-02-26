### -------- Stage 1: Compile typescript ---------- ###

FROM node:12.16.1-alpine as build-back
WORKDIR /usr/src/app

# Dependencies
COPY package*.json ./
RUN npm install

# Compile Typescript
COPY ./src ./src
COPY index.ts tsconfig.json nodemon.json ./
RUN npm run ts-compile


### ------- Stage 2: Production environment ------- ###

FROM node:12.16.1-alpine
WORKDIR /usr/src/app

# Dependencies
ENV NODE_ENV production
COPY package*.json ./
RUN npm install --only=prod

# Copy files
COPY --from=build-back /usr/src/app/build ./

# Launch
CMD ["node", "index.js"]