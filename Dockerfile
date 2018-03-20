FROM node:slim
WORKDIR /usr/src/app
COPY . .
ENV NODE_ENV=development
RUN npm install
CMD npm run build
CMD npm run start