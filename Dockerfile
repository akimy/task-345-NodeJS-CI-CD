FROM node:9

WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV=production

RUN git clone ./repo https://github.com/facebook/react.git
RUN npm install --quiet
RUN npm run build

CMD npm start