FROM node:slim
WORKDIR /usr/src/app
COPY . .
ENV NODE_ENV=production
RUN npm install
RUN npm build
CMD npm start