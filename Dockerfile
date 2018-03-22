FROM node:9

ADD ./ /app
WORKDIR /app

COPY . .

ENV NODE_ENV=production
RUN git clone https://github.com/facebook/react.git repository
RUN git fetch
RUN npm install
RUN npm run build

CMD npm start