FROM node:slim

WORKDIR /usr/src/app

COPY . .

<<<<<<< HEAD
RUN npm install --quiet
=======
ENV NODE_ENV=development

RUN npm install
>>>>>>> bab7c57117a6d3b8e2288027e4bc518d5057e6ef
RUN npm run build

CMD npm start