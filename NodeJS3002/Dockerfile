FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3002

CMD npm start