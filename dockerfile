FROM node:21-alpine

WORKDIR /usr/app

COPY package*.json ./

COPY dist/ ./dist/

RUN npm install

EXPOSE 4000

CMD [ "npm", "start" ]
