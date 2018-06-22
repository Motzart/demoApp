FROM node:8.11.1-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json /app

COPY . /app

EXPOSE 3030