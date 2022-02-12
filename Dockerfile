FROM node:14-alpine

USER node

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY [--chown=node:node] package*.json ./

RUN npm ci
RUN chown -R node:node /home/node/app/node_modules


