FROM node:slim

WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV=production

RUN npm install --quiet
RUN npm run build

CMD npm start