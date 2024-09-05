FROM node:21.1.0-alpine as builder

WORKDIR /app

RUN npm install -g @angular/cli
RUN apk add --no-cache bash

COPY . .

EXPOSE 4200
